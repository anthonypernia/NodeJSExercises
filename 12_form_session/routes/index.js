const { Router } = require('express');
const router = Router();
const ProductsComponent = require('../Components/Product/index');
const CartComponent = require('../Components/Cart/index');
const ChatComponent = require('../Components/Chat/index');

module.exports = (app) => {
    app.use('/', router);
    ProductsComponent(router);
    CartComponent(router);
    ChatComponent(router);
    app.use((req, res, next) => {
        res.status(404).json({
                            error: -2,
                            description: `Method ${req.method} not implemented to endpoint ${req.url}`
                            });
    }
    );
}

