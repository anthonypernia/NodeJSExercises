import { CartController } from "./controller/cartController";
import { Router } from "express";
let router = Router();


export default ( app ) => {
    app.use( '/cart', router );

    router.post( '/', ( req, res, next) => {
        CartController.createCart( req, res, next );
    });

    router.delete( '/:id', ( req, res, next) => {
        CartController.deleteCart( req, res, next );
    });

    router.get( '/:id/products', ( req, res, next) => {
        CartController.getCartProducts( req, res, next );
    });

    router.post( '/:id/products', ( req, res, next) => {
        CartController.addProductToCart( req, res, next );
    })

    router.delete( '/:id/products/:id_prod', ( req, res, next) => {
        CartController.removeProductFromCart( req, res, next );
    });

    router.get( '/:id/save', ( req, res, next) => {
        CartController.saveCartFile( req, res, next );
    });
}