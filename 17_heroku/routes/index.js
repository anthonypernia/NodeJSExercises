const { Router } = require('express');
const router = Router();
const ProductsComponent = require('../Components/Product/index');
const CartComponent = require('../Components/Cart/index');
const ChatComponent = require('../Components/Chat/index');
const UserComponent = require('../Components/User/index');
const { validateSecurity, logInfRoutes , inexistentRoute} = require('../utils/index');
const {loggerWarn, loggerErr, loggerInfo} = require('../utils/logger');

module.exports = (app) => {
    app.use('/', router);
    router.use( validateSecurity );
    router.use(logInfRoutes);
    UserComponent(router);
    ProductsComponent(router);
    CartComponent(router);
    ChatComponent(router);
    router.use(inexistentRoute);
}

