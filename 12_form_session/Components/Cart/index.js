const { Router } = require('express');
const router = Router();

module.exports = ( app ) => {

    app.use( '/api/cart', router );

    router.get( '/:id?', ( req, res, next ) => {
        console.log( 'GET the CART' );
        res.json( {"message": "Hello from CART"} );
        
    });
    router.post( '/', ( req, res, next ) => {

    });

    router.put( '/:id', ( req, res, next ) => {        
        
    });

    router.delete( '/:id', ( req, res, next ) => {
   
    });

    router.post('/create', (req, res, next) => {

    });
};