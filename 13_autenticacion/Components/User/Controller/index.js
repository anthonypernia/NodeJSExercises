const path = require('path');
const userService = require('../Service');
let keyUsername = 'username';
let default_session_expire = 60;


class UserController {
    
    async  getUser(req, res, next) {
        // let result = await userService.getUser( keyUsername )
        if ( req.session.username ){
        
            req.session.expires = Date.now() + (default_session_expire * 1000);
          
            res.json(req.session.username);
        }else{
            res.status(404).json({
                message: 'User not found'
            });
        }
    }

    async addUser(req, res, next) {
        req.session.username = req.body.username;
        res.json(req.session.username);
        // if ( req.body.exp ){
        //     res.json( await userService.addUserWithExpiration( keyUsername, req.body.username, default_session_expire ) );
          
        // } else {
        //     res.json(await userService.addUser( keyUsername, req.body.username ));
        // }
    }

    async updateUser(req, res, next) {

    }

    async deleteUser(req, res, next) {

    }
}

module.exports = new UserController();

