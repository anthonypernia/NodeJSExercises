const { Router } = require('express');
const router = Router();
const productsController = require('./Controller/');

module.exports = ( app ) => {

    app.use( '/api/products', router );

    router.get( '/:id?', ( req, res, next ) => {
        productsController.getProducts( req, res, next );
    });
    router.post( '/', ( req, res, next ) => {
        productsController.insertProducts( req, res, next );
    });

    router.put( '/:id', ( req, res, next ) => {        
        productsController.updateProduct( req, res, next );
    });

    router.delete( '/:id', ( req, res, next ) => {
        productsController.deleteProduct( req, res, next );
    });
};