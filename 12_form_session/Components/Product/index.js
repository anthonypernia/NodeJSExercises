const { Router } = require('express');
const router = Router();
const ProductsController = require('./Controller/');

module.exports = ( app ) => {

    app.use( '/api/products', router );

    router.get( '/:id?', ( req, res, next ) => {
        ProductsController.getProducts( req, res, next );
    });
    router.post( '/', ( req, res, next ) => {
        // ProductsController.insertProducts( req, res, next );
    });

    router.put( '/:id', ( req, res, next ) => {        
        // ProductsController.updateProduct( req, res, next );
    });

    router.delete( '/:id', ( req, res, next ) => {
        // ProductsController.deleteProduct( req, res, next );
    });

    router.post('/create', (req, res, next) => {
        // ProductsController.createSchemas(req, res, next);
    });
};