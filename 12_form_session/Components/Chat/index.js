const { Router } = require('express');
const router = Router();
const chatController = require('../Chat/Controller')

module.exports = ( app ) => {

    app.use( '/api/chat', router );

    router.get( '/', ( req, res, next ) => {
        chatController.getChats( req, res, next );
    });
    router.post( '/', ( req, res, next ) => {
        chatController.insertMessage( req, res, next );
    });

    router.delete( '/:id', ( req, res, next ) => {
        chatController.deleteById( req, res, next );
    });
};