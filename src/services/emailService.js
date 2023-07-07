
require('dotenv').config();
const nodemailer = require("nodemailer");
const { LANGUAGES } = require('../utils');
const { result } = require('lodash');

const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;
const EMAIL_APP = process.env.EMAIL_APP;

let sendSimpleEmail = async(sendData) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465 , false for other ports
        auth: {
            user: EMAIL_APP,
            pass: EMAIL_APP_PASSWORD
        }
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"yoaoki" <duong1818@gmail.com>', // sender address
        to: sendData.toEmail, // list of receivers
        subject: getSubject(sendData.language), // Subject line
        //text: "Hello world?", // plain text body
        html: getBodyMail(sendData) 
        });

    console.log("Message sent: %s", info && info.messageId ? info.messageId : "unknown");
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

let getSubject = (language) => {
    let result = "";

    if(language === LANGUAGES.VI){
        result = "Thông tin đặt lịch khám bệnh";
    }else {
        result = "Information to book a medical appointment"; 
    }
    return result;
}
let getBodyMail = (sendData) => {
    let result = "";
    if(sendData.language === LANGUAGES.VI){
        result = `
            <h3>Xin chào ${sendData.fullName} ! </h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên ... </p>
            <p>Thông tin đặt lệnh khám bệnh:</p>
            <div><b>Thời gian: ${sendData.timeBooking}</b></div>
            <div><b>${sendData.doctorName}</b></div>

            <p>Nếu các thông tin trên là đúng sự thật, vui lòng click đường link dưới để 
                xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
            </p>
            <div>
                <a href=${sendData.confirmLink} target="_blank">Nhấn vào đây</a>
            </div>

            <div>Xin chân thành cảm ơn</div>
        `
    }else {
        result = `
            <h3>Dear ${sendData.fullName} ! </h3>
            <p>You received this email because you booked an online medical appointment on ... </p>
            <p>Information to order medical examination:</p>
            <div><b>Time: ${sendData.timeBooking}</b></div>
            <div><b>${sendData.doctorName}</b></div>

            <p>If the above information is true, please click the link below to confirm and 
                complete the procedure to book an appointment.
            </p>
            <div>
                <a href=${sendData.confirmLink} target="_blank">Click here</a>
            </div>

            <div>Sincerely thank!</div>
        `
    }

    return result;
}


module.exports = {
    sendSimpleEmail
}