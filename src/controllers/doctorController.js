import doctorService from "../services/doctorService";

const LIMIT_GET_DOCTORS_DEFAULT = 10;

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = LIMIT_GET_DOCTORS_DEFAULT;
    console.log('limit : ', limit);
    try{
        let response = await doctorService.getTopDoctorHome(+limit);

        console.log("response: ", response);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            doctors: response.doctors
        });

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })
    }
}

let getAllDoctors = async (req, res) => {

    try{

        let response = await doctorService.getAllDoctors();
        console.log("response: ", response);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            doctors: response.doctors 
        })


    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })
    }

}

let createInforDoctor = async (req, res) => {

    
    try{
        let doctorInfo = req.body;

        if(!doctorInfo || !doctorInfo.doctorId || !doctorInfo.contentHTML || !doctorInfo.contentMarkdown){

            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input doctor infor data!'
            })
        }

        let response = await doctorService.createInforDoctor(doctorInfo);

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

let editInforDoctor = async (req, res) => {

    try{
        let doctor = req.body;

        if(!doctor || !doctor.doctorId || !doctor.contentHTML || !doctor.contentMarkdown){

            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing input doctor information!"
            })
        }
        let response = await doctorService.editInforDoctor(doctor);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage
        })

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from Server..."
        })

    }

}

let getInforDoctor = async (req, res) => {

    try{

        let doctorId = req.query.id;

        let response = await doctorService.getInforDoctor(doctorId);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            inforDoctor: response.inforDoctor
        })

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })
    }
}


module.exports = {
    getTopDoctorHome : getTopDoctorHome,
    getAllDoctors : getAllDoctors,
    createInforDoctor : createInforDoctor,
    getInforDoctor: getInforDoctor,
    editInforDoctor: editInforDoctor,
}