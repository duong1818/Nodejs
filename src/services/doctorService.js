
import db from "../models/index";
import {CommonUtils, ROLE, DATE_FORMAT} from "../utils/";
require('dotenv').config();
import _ from "lodash";
import moment from "moment";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limit) => {
    return new Promise( async (resolve, reject) => {
        try{
            let doctors = await db.User.findAll({
                limit: limit,
                attributes: { 
                    exclude: ['password'],
                },
                where: {
                    role: ROLE.DOCTOR
                },
                order: [
                    ["createdAt", "DESC"]
                ],
                include: [
                    { model: db.AllCode, as: 'positionData', attributes: ['valueEn','valueVi']},
                    { model: db.AllCode, as: 'genderData', attributes: ['valueEn','valueVi']}
                ],
                raw: true,
                nest: true
            });

            resolve({
                errCode: 0,
                errMessage: "get doctor home successfully!",
                doctors: doctors
            })

        }catch(e){
            reject(e);
        } 
    })
}

let getAllDoctors = () => {
    return new Promise( async (resolve, reject) => {
        try{

            let doctors = await db.User.findAll({
                attributes: { 
                    //include: ['firstName', 'lastName'],
                    exclude: ['password','image','email','address','phoneNumber','gender','role','position','createdAt','updatedAt'],
                },
                where:{
                    role: ROLE.DOCTOR,
                },
                include: [
                    { model: db.Markdown, as: 'doctorInformation', attributes: ['doctorId','contentHTML','contentMarkdown','description']},
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                errMessage: "get doctor home successfully!",
                doctors: doctors
            })


        }catch(e) {
            reject(e);
        }
    })
}


let createInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try{

            console.log('data: ',data, db.Markdown);
            await db.Markdown.create({
                doctorId: data.doctorId,
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
                description: data.description
            })

            resolve({
                errCode: 0,
                errMessage: 'Create infor doctor succeed!'
            })


        }catch(e){
            reject(e);
        }
    })
}

let editInforDoctor = (doctor) => {
    return new Promise(async (resolve, reject) => {
        try {

            console.log('doctorId : ', doctor.doctorId);

            let oldDoctor = await db.Markdown.findOne({
                where: {doctorId: doctor.doctorId},
                raw: false
            })

            if(!oldDoctor) {
                resolve({
                    errCode: 2,
                    errMessage: 'doctor not found!'
                })
            }

            if(oldDoctor){
                oldDoctor.contentHTML = doctor.contentHTML;
                oldDoctor.contentMarkdown = doctor.contentMarkdown; 
                oldDoctor.description = doctor.description;
            }
            await oldDoctor.save();

            resolve({
                errCode: 0,
                errMessage: 'edit information of doctor is OK!'
            })

        }catch(e){
            reject(e);
        }
    })
}

let getInforDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {

        try{

            if(!doctorId){
                resolve({
                    errCode: -2,
                    errMessage: 'Invalid input parameter!',
                })
            }
            console.log('doctorId: ',doctorId);

            let inforDoctor = await db.User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where:{
                    id: doctorId
                },
                include: [
                    { model: db.Markdown, as: 'doctorInformation', attributes: ['contentHTML','contentMarkdown','description']},
                    { model: db.AllCode, as: 'positionData', attributes: ['valueEn','valueVi']}
                ],
                raw: true,
                nest: true
            })

            if( inforDoctor && inforDoctor.image ) {
                inforDoctor.image = CommonUtils.getUrlFromBase64(inforDoctor.image);
            }

            resolve({
                errCode: 0,
                errMessage: 'get InforDoctor scceeded',
                inforDoctor: inforDoctor? inforDoctor : {}
            })
        }catch(e) {
            reject(e);
        }
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise( async (resolve, reject) => {
        try{
            //console.log('check data:' , typeof data ,data);

            if(!data || _.isEmpty(data)){
                resolve({
                    errCode: 1,
                    errMessage: "Missing input data!"
                })
            }else{
                if(data && data.length > 0){
                    let schedules = data.map( item => {
                        item.maxNumber = +MAX_NUMBER_SCHEDULE;
                        item.doctorId = item.doctorId;
                        item.date = item.date;
                        item.timeKey = item.timeKey;
                        return item;
                    })

                    let existingSchedule = await db.Schedule.findAll({
                        attributes: ['doctorId', 'date', 'timeKey', 'maxNumber'],
                        where: {
                            doctorId: schedules[0].doctorId,
                            date: schedules[0].date
                        }
                    });

                    // if(existingSchedule && existingSchedule.length > 0){
                    //     existingSchedule = existingSchedule.map(item => {
                    //         item.date = item.date.getTime();
                    //         return item;
                    //     });
                    // }

                    // console.log('existingSchedule : ', existingSchedule);
                    // console.log('schedules : ', schedules);

                    let toCreate = _.differenceWith(schedules, existingSchedule, (a,b) => {
                        return a.timeKey === b.timeKey && a.date === b.date.getTime();
                    });

                    // console.log('toCrete : ',toCreate);

                    if(toCreate && toCreate.length > 0) {
                        await db.Schedule.bulkCreate(toCreate);                    
                    }

                }
            }

            resolve({
                errCode: 0,
                errMessage: "Create bulk schedule is OK!"
            });
            
        }catch(e){
            reject(e);
        }
    })
}

let getScheduleDoctorByDate = (doctorId, date) =>{
    return new Promise(async (resolve, reject) =>{

        try{

            // console.log("date : " + date);
            // let _date = moment.unix(date).format(DATE_FORMAT.SEND_TO_DB);
            // console.log("date : " + _date);

            let schedules = await db.Schedule.findAll({
                
                attributes:['doctorId','date','timeKey'],
                where:{
                    doctorId: doctorId,
                    date: moment.unix(date).format(DATE_FORMAT.SEND_TO_DB)
                },
                include: [
                    { model: db.AllCode, as: 'timeData', attributes: ['valueEn','valueVi']}
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                errMessage: 'get schedule OK!',
                schedules
            })


        }catch(e){
           reject(e); 
        }
    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    createInforDoctor: createInforDoctor,
    getInforDoctor: getInforDoctor,
    editInforDoctor: editInforDoctor,
    bulkCreateSchedule,
    getScheduleDoctorByDate
}