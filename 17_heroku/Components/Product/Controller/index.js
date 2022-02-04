
const productsService = require('../Service/');
class ProductsController {
    
    async  getProducts(req, res, next) {
        try {
            if (req.params.id) {
                let products =  await productsService.getProductsById(req.params.id);
                if (products) {
                    res.status(200).json(products);
                    return;
                }
                res.status(404).json({message: 'Product not found'});
            } else {
                
                let products =  await productsService.getAllProducts();
                
                if (products) {
                    
                    res.status(200).json(products);
                    return;
                }
                res.status(404).json({ message: 'No products found' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async insertProducts(req, res, next) {
        try {
            let product =  await productsService.insertProducts(req.body);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async updateProduct(req, res, next) {
        try {
            let product =  await productsService.updateProduct(req.params.id, req.body);
            if (product) {
                res.status(200).json(product);
                return;
            }
            res.status(404).json({message: 'Product not found'});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            let result =  await productsService.deleteProduct(req.params.id);
            if (result) {
                res.status(200).json(result);
                return;
            }
            res.status(404).json({message: 'Product not found'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new ProductsController();

