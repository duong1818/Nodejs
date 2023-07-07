
import db from "../models/index";
import {CommonUtils, ROLE, DATE_FORMAT, PATIENT_STATUS} from "../utils/";
require('dotenv').config();
import _ from "lodash";
import moment from "moment";
import emailService from "./emailService";
import {v4 as uuidv4} from "uuid";

let buildUrlConfirm = (doctorId,token) => {
    return `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
}

let createPatientBooking = (patientInfo) => {
    return new Promise(async (resolve, reject) => {
        try{

            console.log('patientInfo: ',patientInfo);

            let sendData = {};
            sendData.toEmail = patientInfo.email;
            sendData.firstName = patientInfo.firstName;
            sendData.lastName = patientInfo.lastName;
            sendData.fullName = patientInfo.fullName;
            sendData.timeBooking = patientInfo.timeBooking
            sendData.doctorName = patientInfo.doctorName;
            
            let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
            sendData.confirmLink = buildUrlConfirm(patientInfo.doctorId,token);
            sendData.language = patientInfo.language;

            emailService.sendSimpleEmail(sendData);


            const [patient, isPatientCreated] = await db.User.findOrCreate({
                where: {email: patientInfo.email},
                defaults:{
                    firstName: patientInfo.firstName,
                    lastName: patientInfo.lastName,
                    address: patientInfo.address,
                    phoneNumber: patientInfo.phoneNumber,
                    gender: patientInfo.gender,
                    role: ROLE.PATIENT,
                },
                raw: false,
            });
            if(patient && !isPatientCreated){
                patient.firstName = patientInfo.firstName,
                patient.lastName = patientInfo.lastName,
                patient.address = patientInfo.address, 
                patient.phoneNumber = patientInfo.phoneNumber,
                patient.gender = patientInfo.gender,
                patient.role = ROLE.PATIENT,
                await patient.save();
            }


            if(patient && patient.id){
                const [booking, isBookCreated] = await db.Booking.findOrCreate({
                    where: {
                        doctorId: patientInfo.doctorId,
                        patientId: patient.id,
                        date: patientInfo.date,
                    },
                    defaults:{
                        doctorId: patientInfo.doctorId,
                        statusId: patientInfo.statusId,
                        patientId: patient.id,
                        date: patientInfo.date,
                        timeKey: patientInfo.timeKey,
                        token: token,
                    },
                    raw: false,
                });
                
                //console.log("booking: ", booking);
                if(booking && !isBookCreated){
                    booking.timeKey = patientInfo.timeKey,
                    booking.token = token,
                    await booking.save();
                }
            }else{
                resolve({
                    errCode: 2,
                    errMessage: "patient not created!",
                })                
            }

            resolve({
                errCode: 0,
                errMessage: 'Create infor patient booking succeed!'
            })


        }catch(e){
            console.log(e);
            reject(e);
        }
    })
}

let verifyBooking = (token, doctorId) => {
    return new Promise( async (resolve, reject) => {
        try{
            if(!token || !doctorId){
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!!!"
                })
            }

            let booking = await db.Booking.findOne({
                where: {
                    doctorId: doctorId,
                    token: token,
                    statusId: PATIENT_STATUS.NEW
                },
                raw: false
            });

            if(booking) {
                booking.statusId = PATIENT_STATUS.CONFIRM;
                await booking.save();
            }else{
                resolve({
                    errCode: 2,
                    errMessage: "Appointment has been actived or does not exist!"
                })
            }

            resolve({
                errCode: 0,
                errMessage: "patient booking is successfully updated!"
            });
    
        }catch(e){
            reject(e);

        }
    });
}


module.exports = {
    createPatientBooking,
    verifyBooking
    
}