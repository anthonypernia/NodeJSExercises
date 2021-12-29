const { Router } = require('express');
const path = require('path');
const redis = require('../../config/db/RedisDB');
const userController = require('./Controller')
const router = Router();
let keyUsername = 'username';
let default_session_expire = 10;

module.exports = ( app ) => {
    app.use( '/user', router );

    router.post( '/', ( req, res, next ) => {
        userController.addUser( req, res, next );
    });

    router.get( '/username', ( req, res, next ) => {
        userController.getUser( req, res, next );
    });

    router.get( '/logout', ( req, res, next ) => {
        redis.del( keyUsername ).then( ( result ) => {
            res.json( {
                error: 0,
                description: 'Logout successful'
            } );
        });
    });
};