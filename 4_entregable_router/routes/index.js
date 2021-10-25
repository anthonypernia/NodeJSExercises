const { Router } = require('express');
const router = Router();
const  path  = require('path');

let products = [
    {
        id: 1,
        title: 'Product 1',
        price: 100,
        thumbnail: 'LINK'
    },
    {
        id: 2,
        title: 'Product 2',
        price: 200,
        thumbnail: 'LINK'
    },
    {
        id: 3,
        title: 'Product 3',
        price: 300,
        thumbnail: 'LINK'
    }
]


function serverRouter(app){
    app.use('/api', router);
    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    router.get('/products', (req, res) => {
        res.send(products);
    });
    router.get('/products/:id', (req, res) => {
        let id = req.params.id;
        let product = products.find(product => product.id == id);
        if (product) {
            res.send(product);
        }else{
            res.status(404).send({message: 'Product not found'});
        }
    });

    router.post('/products', (req, res) => {
        let product = req.body;
        let incrementarId = products[products.length - 1].id + 1;
        product.id = incrementarId;
        products.push(product);
        res.send(product);
    });

    router.put('/products/:id', (req, res) => {
        let id = req.params.id;
        let inputProduct = req.body;
        let updatedProduct = products.find(product => product.id == id);
        updatedProduct.title = inputProduct.title;
        updatedProduct.price = inputProduct.price;
        updatedProduct.thumbnail = inputProduct.thumbnail;
        res.send(updatedProduct);
    })

    router.delete('/products/:id', (req, res) => {
        let id = req.params.id;
        let deletedProduct = products.find(product => product.id == id);
        products = products.filter(product => product.id != id);
        res.send(deletedProduct);
    });

    router.post('/form', (req, res) => {
        let product = req.body;
        if (product.title && product.price && product.thumbnail) {
            let incrementarId = products[products.length - 1].id + 1;
            product.id = incrementarId;
            products.push(product);
            res.send(product);
    }
    });
}

module.exports = serverRouter;