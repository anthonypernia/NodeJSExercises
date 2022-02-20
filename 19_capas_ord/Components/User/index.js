const { Router } = require('express');
const path = require('path');
const redis = require('../../persistence/db/RedisDB');
const userController = require('./Controller')
const router = Router();
let { loggerInfo } = require("../../utils/logger");
let keyUsername = 'username';
let default_session_expire = 10;

module.exports = ( app ) => {
    app.use( '/user', router );

    router.post( '/login', ( req, res, next ) => {
        userController.loginUser( req, res, next );
    });

    router.post( '/register', ( req, res, next ) => {
        userController.addUser( req, res, next );
    });

    router.get( '/get', ( req, res, next ) => {
        userController.getUser( req, res, next );
    });

    router.post( '/update', ( req, res, next ) => {
        userController.updateUser( req, res, next );
    });
    
    router.get( '/logout', ( req, res, next ) => {
        loggerInfo.info( 'logout' );
        userController.logoutUser( req, res, next );
    }
    );
};