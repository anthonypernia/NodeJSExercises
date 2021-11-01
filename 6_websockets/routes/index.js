const { Router } = require('express');
const router = Router();

const handlebars = require('express-handlebars');
const productComponent = require('../components/products')
let products = require('../productsData')



function serverRouter(app){
    //productComponent(app)
    app.use('/', router);
    router.get('/', (req, res) => {
        res.render('index.hbs');
    });

}

module.exports = serverRouter;