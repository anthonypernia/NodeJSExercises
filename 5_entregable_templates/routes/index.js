const { Router } = require('express');
const router = Router();
const  path  = require('path');
const handlebars = require('express-handlebars');
const express = require('express');

let products = [
    {
        id: 1,
        title: "product 1",
        price: 100,
        thumbnail: ""
    },
    {
        id: 2,
        title: "product 2",
        price: 200,
        thumbnail: ""
    },
    {
        id: 3,
        title: "product 3",
        price: 300,
        thumbnail: ""
    }
];

function serverRouter(app){
    app.use('/api', router);
    app.use('/api', router);

    router.get('/', (req, res) => {
        console.log("main");
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    router.get('/products', (req, res) => {
        res.send(products);
    });
    router.get('/products/:id', (req, res) => {
        console.log("Route products ---> Get (ID)");
        let id = req.params.id;
        let product = products.find(product => product.id == id);
        if (product) {
            res.send(product);
        }else{
            res.send({
                error: "product no encontrado"
            })
        }
    });


    router.post('/products', (req, res) => {
        console.log("Route products ---> Post");
        let product = req.body;
        let incrementarId = products.length + 1;
        product.id = incrementarId;
        products.push(product);
        res.send(product);
    });

    router.put('/products/:id', (req, res) => {
        console.log("Route products ---> Update");
        console.log(products);
        let id = req.params.id;
        let inputProduct = req.body;
        let updatedProduct = products.find(product => product.id == id);
        updatedProduct.title = inputProduct.title;
        updatedProduct.price = inputProduct.price;
        updatedProduct.thumbnail = inputProduct.thumbnail;
        res.send(updatedProduct);
    })

    router.delete('/products/:id', (req, res) => {
        console.log("Route products ----> Delete");
        let id = req.params.id;
        let deletedProduct = products.find(product => product.id == id);
        let index = products.indexOf(deletedProduct);
        products.splice(index, 1);
        res.send(deletedProduct);
    });

    router.post('/form', (req, res) => {
        console.log("Route form ---> Post");
        let product = req.body;
        if (product.title && product.price && product.thumbnail) {
            console.log("Todo OK");
            let incrementarId = products.length + 1;
            product.id = incrementarId;
            products.push(product);
            res.send(product);
    }
    });

////HANDLEBARS
    app.engine('hbs',handlebars({
        extname: 'hbs',
        defaultLayout: 'index',
        layoutsDir: path.join(__dirname, '../views/handlebars')
    }));

    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.static(path.join(__dirname, '../public')));

    router.get('/handlebars', (req, res) => {
        res.render('handlebars/index', {
            title: "Handlebars",
            products: products
        });
    });
    router.post('/handlebars', (req, res) => {
        console.log("Route handlebars ---> Post");
        let product = req.body;
        if (product.title && product.price && product.thumbnail) {
            console.log("Todo OK");
            let incrementarId = products.length + 1;
            product.id = incrementarId;
            products.push(product);
            res.render('handlebars/index', {
                title: "Handlebars",
                products: products
            });
        
        }
    });

}

module.exports = serverRouter;