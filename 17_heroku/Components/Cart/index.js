const { Router } = require('express');
const cartController = require('./Controller/');
const router = Router();


module.exports = ( app ) => {
    app.use( '/api/cart', router );

    router.post( '/', ( req, res, next) => {
        cartController.createCart( req, res, next );
    });

    router.delete( '/:id', ( req, res, next) => {
        cartController.deleteCart( req, res, next );
    });

    router.get( '/:id/products', ( req, res, next) => {
        cartController.getCartProducts( req, res, next );
    });

    router.post( '/:id/products', ( req, res, next) => {
        cartController.addProductToCart( req, res, next );
    })

    router.delete( '/:id/products/:id_prod', ( req, res, next) => {
        cartController.removeProductFromCart( req, res, next );
    });

};