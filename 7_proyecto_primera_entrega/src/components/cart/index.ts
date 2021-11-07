import { Router } from "express";
let router = Router();




export default ( app ) => {
    app.use( '/cart', router );

    router.post( '/', ( req, res, next) => {
        res.send( 'cart create' );
    });

    router.delete( '/', ( req, res, next) => {
        res.send( 'cart delete all' );
    });

    router.get( '/:id/products', ( req, res, next) => {
        res.send( 'cart get by id_car' );
    });

    router.post( '/:id/products', ( req, res, next) => {
        res.send( 'cart post by id' );
    })

    router.delete( '/:id/products/:id_prod', ( req, res, next) => {
        res.send( 'cart delete by id_prod' );
    });
}