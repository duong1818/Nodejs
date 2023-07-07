import doctorService from "../services/doctorService";

const LIMIT_GET_DOCTORS_DEFAULT = 10;

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = LIMIT_GET_DOCTORS_DEFAULT;
    console.log('limit : ', limit);
    try{
        let response = await doctorService.getTopDoctorHome(+limit);

        //console.log("response: ", response);

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
        //console.log("response: ", response);

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
        let doctorInfo = req.body;

        if(!doctorInfo || !doctorInfo.doctorId || !doctorInfo.contentHTML || !doctorInfo.contentMarkdown){

            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing input doctor information!"
            })
        }
        let response = await doctorService.editInforDoctor(doctorInfo);

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

        let doctorId = req.query.doctorId;

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

let getInforDoctorExtra = async (req, res) => {

    try{

        let doctorId = req.query.doctorId;

        let response = await doctorService.getInforDoctorExtra(doctorId);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            inforDoctorExtra: response.inforDoctorExtra
        })

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })
    }
}

let bulkCreateSchedule = async (req, res) => {

    try{
        let response = await doctorService.bulkCreateSchedule(req.body);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage
        })


    }catch(e){
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })

    }
}

let getScheduleDoctorByDate = async (req, res) => {

    try {
        if(!req.query.date || !req.query.doctorId){
            res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameter!"
            });
        }

        let response = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            schedules: response.schedules
        });
    }catch(e){
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        });
    }
}

let getInforDoctorForBooking = async (req, res) => {
    try {

        if(!req.query.doctorId){
            res.status(200).json({
                errCode: 1,
                errMessage: "Missing doctorId parameter!"
            });
        }

        let response = await doctorService.getInforDoctorForBooking(req.query.doctorId);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            dataBooking: response.dataBooking
        });


    }catch (e) {
        console.log(e);
        res.status(200).json({
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
    bulkCreateSchedule,
    getScheduleDoctorByDate,
    getInforDoctorExtra,
    getInforDoctorForBooking
}