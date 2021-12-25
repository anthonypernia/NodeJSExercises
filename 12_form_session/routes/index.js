const { Router } = require('express');
const router = Router();
const ProductsComponent = require('../Components/Product/index');
const CartComponent = require('../Components/Cart/index');
const ChatComponent = require('../Components/Chat/index');
const UserComponent = require('../Components/User/index');
const { validateSecurity } = require('../utils/index');

module.exports = (app) => {
    app.use('/', router);
    router.use( validateSecurity );
    UserComponent(router);
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

