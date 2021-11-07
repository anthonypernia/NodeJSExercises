import { ProductsService } from '../service/productsService';

class ProductsController {

    static async getProducts(req, res, next) {
        try {
            if (req.params.id) {
                let products = await ProductsService.getProductsById(req.params.id);
                res.status(200).json(products);
            } else {
                let products = await ProductsService.getAllProducts();
                res.status(200).json(products);
            }
        } catch (err) {
            next(err);
        }
    }

    static async insertProducts(req, res, next) {
        try {
            let product = await ProductsService.insertProducts(req.body);
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

    static async updateProduct(req, res, next) {
        try {
            let product = await ProductsService.updateProduct(req.params.id, req.body);
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            let product = await ProductsService.deleteProduct(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

}

export { ProductsController };