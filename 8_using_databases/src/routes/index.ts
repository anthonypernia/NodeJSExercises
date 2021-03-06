import productComponent from '../components/products'
import cartComponent from '../components/cart'
import chatComponent from '../components/chat'
import { Router } from 'express';
import { validateSecurity } from '../utils/utils';
let router = Router();




function serverRouter(app) {
    app.use('/api', router);
    router.use( validateSecurity );
    productComponent(router);
    cartComponent(router);
    chatComponent(router);
    app.use((req, res, next) => {
        res.status(404).json({
                            error: -2,
                            description: `Method ${req.method} not implemented to endpoint ${req.url}`
                            });
    }
    );
}

export { serverRouter }