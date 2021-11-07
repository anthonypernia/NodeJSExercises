import productComponent from '../components/products'
import cartComponent from '../components/cart'
import { Router } from 'express';
let router = Router();

function serverRouter(app) {
    app.use('/api', router);
    productComponent(router);
    cartComponent(router);
}

export { serverRouter }