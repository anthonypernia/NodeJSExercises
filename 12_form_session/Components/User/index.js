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
        if ( req.body.exp ){
            redis.setexp( keyUsername, req.body.username, default_session_expire ).then( ( result ) => {
                res.json( {
                    error: 0,
                    description: 'Login successful'
                } );
            });
        } else {
            redis.set( keyUsername, req.body.username ).then( ( result ) => {
                res.json( {
                    error: 0,
                    description: 'Login successful'
                } );
            });
        }
    });

    router.get( '/username', ( req, res, next ) => {
        redis.get( keyUsername ).then( ( data ) => {
            if (data){
                res.json( { username: data } );
                redis.setexp( keyUsername, data, default_session_expire );
            }else{
                res.json( { username: null } );
            }
        });
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