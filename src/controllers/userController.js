import userService from "../services/userService";

let handleLogin = async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(400).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email,password);

    // check email exist
    // compare password
    // return userinfor
    // access token JWT json wen token


    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    // let id = req.body.id;  // ALL, id -> Single
    let id = req.query.id;

    if(!id){
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })


}

let handleCreateNewUser = async (req, res) => {
    let user = req.body;
    //console.log('user: ', user);

    if(!user){
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing user input data!'
        })
    }

    let message = await userService.createNewUser(user);

    console.log('duong check message: ', message);

    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleEditUser = async (req, res) =>{
    let user = req.body;

    console.log('duong check input user: ', user);

    if(!user){
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing user input data!'
        })
    }

    let message = await userService.editUser(user);

    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleDeleteUser = async (req, res) => {
    let id = req.body.id;
    console.log('duong check id: ', id);
    if(!id){
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing id parameter!'
        })
    }

    let message = await userService.deleteUser(id);

    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleGetAllCode = async (req, res) =>{
    try{
        let type = req.query.type;
        let data = await userService.getAllCodeService(type);

        return res.status(200).json(data);


    }catch(e){
        console.log('get allcode error: ',e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        })
    }
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    handleGetAllCode: handleGetAllCode
}