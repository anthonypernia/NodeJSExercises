let { Router } = require('express');
let router = Router();
let ProductController = require('./controller/productsController')



module.exports = (app) => {

    app.use('/', router);
    //router.get('/', ProductController.getAllProducts);
    //router.get('/:id', ProductController.getProductsById);
    //router.post('/', ProductController.insertProducts);
    //router.put('/:id', ProductController.updateProduct);
    //router.delete('/:id', ProductController.deleteProduct);





}