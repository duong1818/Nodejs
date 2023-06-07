
import db from "../models/index";
import {CommonUtils, ROLE} from "../utils/";

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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    createInforDoctor: createInforDoctor,
    getInforDoctor: getInforDoctor,
    editInforDoctor: editInforDoctor,
}