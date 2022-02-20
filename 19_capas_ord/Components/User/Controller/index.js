const path = require('path');
const userService = require('../Service');
let keyUsername = 'username';
let default_session_expire = 60;
let { loggerWarn, loggerErr, loggerInfo } = require("../../../utils/logger");


class UserController {
    
    async  getUser(req, res, next) {
        let token = req.session.token_user;
        let email = req.session.email;
        if(!token || !email){
            loggerErr.error('token or email missing');
            res.status(401).send('Unauthorized');
        }else{
            let result = await userService.getUserFromToken(token);
            if (result) {
                console.log(result,'------------------------');
                res.status(200).send(result);
            } else {
                res.status(401).send('Unauthorized');
            }
        }

    }

    async addUser(req, res, next) {
        let { username, password, email, address, age, phone  } = req.body;
        if(!username || !password || !email || !address || !age || !phone){
            res.status(400).send('data missing');
        }else{
            let user = {
                username,
                password,
                email,
                address,
                age,
                phone
                };
            let result = await userService.addUser(user);
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({
                    message: 'User registration failed'
                });
            }
        }
    }

    async updateUser(req, res, next) {
        let user = req.body;
        let result = await userService.updateUser(user);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({
                message: 'User update failed'
            });
        }
    }

    async loginUser(req, res, next) {
    let { password, email } = req.body;
    if(!password || !email){
        res.status(400).send('data missing');
    }
    let user = {
        password,
        email,
        };
    let result = await userService.loginUser(user);
    if (result) {
        req.session.token_user = result.token;
        req.session.email = result.email;
        res.json(result);
    } else {
        res.status(404).json({
            message: 'User login failed'
        });
    }
    }

    async deleteUser(req, res, next) {

    }

    async logoutUser(req, res, next) {
        req.session.destroy();
        res.status(200).send('logout success');
    }

}

module.exports = new UserController();

