import specialtyService from "../services/specialtyService";

const LIMIT_GET_DOCTORS_DEFAULT = 10;


let createSpecialty= async (req, res) => {

    
    try{
        let specialtyInfo = req.body;

        let response = await specialtyService.createSpecialty(specialtyInfo);

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


module.exports = {
    createSpecialty,

}