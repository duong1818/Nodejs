import db from "../models/index";
import bcrypt from 'bcryptjs';

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
                raw: true
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

module.exports = {
    handleUserLogin: handleUserLogin
}