
import db from "../models/index";
import {CommonUtils, ROLE, DATE_FORMAT, PATIENT_STATUS} from "../utils";
require('dotenv').config();
import _ from "lodash";

let createSpecialty = (specialtyInfo) => {
    return new Promise(async (resolve, reject) => {
        try{

            console.log('specialtyInfo: ',specialtyInfo);

            if(!specialtyInfo || !specialtyInfo.name || !specialtyInfo.imageBase64 || !specialtyInfo.descriptionHTML || 
                !specialtyInfo.descriptionMarkdown){
    
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input specialty input data!'
                }) 
            }else{
                await db.Specialty.create({
                    name: specialtyInfo.name,
                    image: specialtyInfo.imageBase64,
                    descriptionHTML: specialtyInfo.descriptionHTML,
                    descriptionMarkdown: specialtyInfo.descriptionMarkdown
                })
            }

            resolve({
                errCode: 0,
                errMessage: 'Create specialty infor succeed!'
            })


        }catch(e){
            console.log(e);
            reject(e);
        }
    })
}



module.exports = {
    createSpecialty,
}