import { Router } from "express";
let router = Router();
import { ChatController } from "../chat/controller/chatController"


export default ( app ) => {
    app.use( '/api/chat', router );

    router.post( '/create', ( req, res, next) => {
        ChatController.createChat( req, res, next );
    });

    router.get( '/', ( req, res, next) => {
        ChatController.getChats( req, res, next );
    });

    router.post( '/', ( req, res, next) => {
        ChatController.insertMessage( req, res, next );
    });

}