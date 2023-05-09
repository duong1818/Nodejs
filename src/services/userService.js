import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);


let handleUserLogin = (email,password) => {
    return new Promise(async (resolve, reject) =>{
        try{
            let userData = {};
            let user = await checkUserEmail(email);
            if(user){
                let isPasswordExactly = await bcrypt.compareSync(password, user.password);
                if(isPasswordExactly){

                    userData.errCode = 0;
                    userData.message = 'your email & password is OK!';
                    delete user.password;   
                    delete user.createdAt;
                    userData.user = user; 

                }else{
                    userData.errCode = 2;
                    userData.message = 'your password is not exactly, Plz try again!';
                }
            }else{
                userData.errCode = 1;
                userData.message = 'your email is not exist in system, Plz try other email!';
            }
            resolve(userData);
        }catch(e){
            reject(e);
        }
    })

}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                // attributes: { 
                //     //include: ['email','roleId'],
                //     exclude: ['password'],
                // },
                where: {email: userEmail},
            })
            if(user){
                resolve(user);
            }else{
                resolve();
            }

        }catch(e){
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let users = '';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude: ['password'],
                    },
                })
            }
            if (userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    attributes:{
                        exclude: ['password'],
                    },
                    where: {id: userId},
                })
            }
            //console.log('users : ',users);
            resolve(users)

        }catch(e){
            reject(e);
        }
    })
}
let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try{
            //check email is exist?
            let isExistEmail = await checkUserEmail(user.email);
            if(isExistEmail){
                resolve({
                    errCode: 2,
                    errMessage: 'Email already exists! please try another email!'    
                })
            }else{
                let hashPasswordFromBcrypt = await hashUserPassword(user.password);
                await db.User.create({
                    email: user.email,
                    password: hashPasswordFromBcrypt,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender === '1' ? true : false,
                    roleId: user.roleId,
                })
    
                // let users = await db.User.findAll({
                //     attributes:{
                //         exclude: ['password'],
                //     },
                // });
                //console.log('users : ',users);
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
    
    
            }


        }catch(e){
            reject(e);
        }
    })
}

let hashUserPassword = (password) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve,reject) => {
        try{
            //check email is exist?
            // let isExistEmail = await checkUserEmail(data.email);
            // if(isExistEmail){
            //     resolve({
            //         errCode: 2,
            //         errMessage: 'Email already exists! please try another email!'    
            //     })
            // }
            //let hashPasswordFromBcrypt = await hashUserPassword(user.password);

            let user = await db.User.findOne({
                where: {id: data.id} 
            });

            if(!user){
                resolve({
                    errCode: 3,
                    errMessage: 'edit user not found'    
                })                
            }

            if(user){
                await db.User.update(
                    { 
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phoneNumber: data.phoneNumber,
                        address: data.address,
                        gender: data.gender === '1' ? true : false,
                        roleId: data.roleId
                    },
                    {where: {id: data.id}}
                );

                resolve({
                    errCode: 0,
                    errMessage: 'edit OK'
                });

            }

        }catch(e){
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise ( async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId}
            })
    
            if(!user){
                resolve({
                    errCode: 2,
                    errMessage: 'User not found!'
                })
            }

            await db.User.destroy({
                where:{id: userId}
            })

            resolve({
                errCode: 0,
                errMessage: 'Delete user OK!'
            })
    
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    editUser: editUser,
    deleteUser: deleteUser
}