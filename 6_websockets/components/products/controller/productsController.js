
let ProductsService = require('../service/productsService');
class ProductsController {

    async getAllProducts(req, res, next) {
        try {
            let products = await ProductsService.getAllProducts();
            res.render('index.hbs', {products});
        } catch (err) {
            next(err);
        }
    }

    async getProductsById(req, res, next) {
        try {
            let product = await ProductsService.getProductsById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

    async insertProducts(req, res, next) {
        try {
            let product = await ProductsService.insertProducts(req.body);
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

    async updateProduct(req, res, next) {
        try {
            let product = await ProductsService.updateProduct(req.params.id, req.body);
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            let product = await ProductsService.deleteProduct(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

}
module.exports = new ProductsController();