import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud',homeController.displayGetCRUD);
    router.get('/get-edit',homeController.getEditCRUD);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/delete-crud',homeController.deleteCRUD);
    router.post('/api/login',userController.handleLogin);
    router.get('/api/get-all-users',userController.handleGetAllUsers);
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.put('/api/edit-user',userController.handleEditUser);
    router.delete('/api/delete-user',userController.handleDeleteUser);

    router.get('/api/allcode',userController.handleGetAllCode);
    router.get('/api/top-doctor-home',doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors',doctorController.getAllDoctors);
    router.post('/api/create-infor-doctor',doctorController.createInforDoctor);
    router.put('/api/edit-infor-doctor',doctorController.editInforDoctor);
    router.get('/api/get-infor-doctor',doctorController.getInforDoctor);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate);
    router.get('/api/get-infor-doctor-extra',doctorController.getInforDoctorExtra);
    router.get('/api/get-infor-doctor-for-booking',doctorController.getInforDoctorForBooking);

    router.post('/api/create-patient-booking',patientController.createPatientBooking);
    router.post('/api/verify-booking',patientController.verifyBooking);
    router.post('/api/create-specialty',specialtyController.createSpecialty);
    
    return app.use("/",router);


}

module.exports = initWebRoutes;