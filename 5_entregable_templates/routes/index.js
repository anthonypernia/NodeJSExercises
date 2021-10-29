const { Router } = require('express');
const router = Router();
const  path  = require('path');
const handlebars = require('express-handlebars');

let products = [
    {
        id: 1,
        title: 'House',
        price: 100,
        thumbnail: 'https://cdn1.iconfinder.com/data/icons/bokbokstars-121-classic-stock-icons-1/512/Home-icon.png'
    },
    {
        id: 2,
        title: 'Car',
        price: 200,
        thumbnail: 'https://cdn0.iconfinder.com/data/icons/isometric-city-basic-transport/48/car-front-01-512.png'
    },
    {
        id: 3,
        title: 'Laptop',
        price: 300,
        thumbnail: 'https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/laptop-with-code-512.png'
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


    // ////HANDLEBARS
    // app.engine('hbs',handlebars({
    //     extname: 'hbs',
    //     defaultLayout: 'index',
    //     layoutsDir: path.join(__dirname, '../views/handlebars'),
    //     partialsDir: path.join(__dirname, '../views/handlebars/partials')
    // }));
    
    // app.set('view engine', 'hbs');

    
    // app.get('/handlebars', (req, res) => {
    //         res.render('handlebars/index', {
    //             products: products, isFormActive: true
    //         });
    // });

    // app.get('/handlebars_results', (req, res) => {
    //     res.render('handlebars/index', {
    //         products: products, isFormActive: false
    //     });
    // });
    
    // app.post('/handlebars', (req, res) => {
    //     console.log("Route handlebars ---> Post");
    //     let product = req.body;
    //     if (product.title && product.price && product.thumbnail) {
    //         console.log("Todo OK");
    //         let incrementarId = products[products.length - 1].id + 1;
    //         product.id = incrementarId;
    //         products.push(product);
    //         res.render('handlebars/index', {
    //         products: products, isFormActive: true
    //     });
    //     }
    // });

    // //PUG

    // app.set('views', './views');
    // app.set('view engine', 'pug');

    // app.get('/pug', (req, res) => {
    //      res.render('pug/index', {
    //          products: products, isFormActive: true
    //      });
    //  });

    //  app.post('/pug', (req, res) => {
    //     console.log("Route pug ---> Post");
    //     let product = req.body;
    //     if (product.title && product.price && product.thumbnail) {
    //         console.log("Todo OK");
    //         let incrementarId = products[products.length - 1].id + 1;
    //         product.id = incrementarId;
    //         products.push(product);
    //         res.render('pug/index', {
    //         products: products, isFormActive: true
    //     });
    //     }
    //     });

    //  app.get('/pug_results', (req, res) => {
    //     res.render('pug/index', {
    //         products: products, isFormActive: false
    //     });
    // });

    ///EJS
    app.set('views', './views');
    app.set('view engine', 'ejs');

    app.get('/ejs', (req, res) => {
        res.render('ejs/index', {
            products: products, isFormActive: true
        });
    }
    );
    app.post('/ejs', (req, res) => {
        let product = req.body;
        if (product.title && product.price && product.thumbnail) {
            console.log("Todo OK");
            let incrementarId = products[products.length - 1].id + 1;
            product.id = incrementarId;
            products.push(product);
            res.render('ejs/index', {
                products: products, isFormActive: true
            });
        }
    });

    app.get('/ejs_results', (req, res) => {
        res.render('ejs/index', {
            products: products, isFormActive: false
        });
    }
    );

}

module.exports = serverRouter;