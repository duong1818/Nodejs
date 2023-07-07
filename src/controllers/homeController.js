import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req,res) => {
    try{
        let data = await db.User.findAll();
        console.log('--------------------------');
        console.log(data);
        console.log('--------------------------');
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    
    }catch(e){
        console.log(e);
    }
}

let getAboutPage = (req,res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req,res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req,res) => {
    let allUser = await CRUDService.createNewUser(req.body);

    console.log('--------------------');
    console.log(allUser);
    console.log('--------------------');
    return res.render('displayCRUD.ejs',{
        dataTable: allUser,
    });
}
let displayGetCRUD = async (req,res) => {
    let data = await CRUDService.getAllUser();
    // console.log('--------------------');
    // console.log(data);
    // console.log('--------------------');
    return res.render('displayCRUD.ejs',{
        dataTable: data,
    });
}
let getEditCRUD = async (req,res) =>{
    let userId = req.query.id;
    console.log(userId);
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        console.log("------------------------");
        console.log(userData);
        console.log("------------------------");
        return res.render('editCRUD.ejs', {
            userData: userData});
    }else{
        return res.send('user not found!');
    }
}
let putCRUD = async (req,res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);
    console.log('--------------------');
    console.log(allUser);
    console.log('--------------------');
    return res.render('displayCRUD.ejs',{
        dataTable: allUser,
    });
}
let deleteCRUD = async (req,res) => {

    let userId = req.query.id;
    let allUser = await CRUDService.deleteUser(userId);
    console.log('--------------------');
    console.log(allUser);
    console.log('--------------------');
    return res.render('displayCRUD.ejs',{
        dataTable: allUser,
    });
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}