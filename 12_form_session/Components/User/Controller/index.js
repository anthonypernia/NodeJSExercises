const path = require('path');
const userService = require('../Service');
let keyUsername = 'username';
let default_session_expire = '10';


class UserController {
    
    async  getUser(req, res, next) {
        let result = await userService.getUser( keyUsername )
        res.json(result);
    }

    async addUser(req, res, next) {
        if ( req.body.exp ){
            res.json( await userService.addUserWithExpiration( keyUsername, req.body.username, default_session_expire ) );
          
        } else {
            res.json(await userService.addUser( keyUsername, req.body.username ));
        }
    }

    async updateUser(req, res, next) {

    }

    async deleteUser(req, res, next) {

    }
}

module.exports = new UserController();

