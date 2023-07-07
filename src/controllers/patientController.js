import patientService from "../services/patientService";

const LIMIT_GET_DOCTORS_DEFAULT = 10;


let createPatientBooking = async (req, res) => {

    
    try{
        let patientInfo = req.body;

        if(!patientInfo || !patientInfo.email || !patientInfo.firstName || !patientInfo.lastName || 
            !patientInfo.address || !patientInfo.phoneNumber || !patientInfo.doctorId || !patientInfo.date || !patientInfo.timeKey){

            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input patient infor data!'
            })
        }

        let response = await patientService.createPatientBooking(patientInfo);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage
        })

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })

    }
}

let verifyBooking = async(req, res) => {

    try {

        let token = req.query.token;
        let doctorId = req.query.doctorId;

        let response = await patientService.verifyBooking(token, doctorId);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage

        })

    }catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        });

    }
}



module.exports = {
    createPatientBooking,
    verifyBooking

}