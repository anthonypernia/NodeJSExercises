import { ProductsService } from '../service/productsService';

class ProductsController {

    static  getProducts(req, res, next) {
        try {
            if (req.params.id) {
                let products =  ProductsService.getProductsById(req.params.id);
                if (products) {
                    res.status(200).json(products);
                }else{
                    res.status(404).json({message: 'Product not found'});
                }
            } else {
                let products =  ProductsService.getAllProducts();
                if (products.length === 0) {
                    res.status(404).json({ message: 'No products found' });
                }else{
                    res.status(200).json(products);
                }
                
            }
        } catch (err) {
            req.status(500).json(err);
        }
    }

    static  insertProducts(req, res, next) {
        try {
            let product =  ProductsService.insertProducts(req.body);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static  updateProduct(req, res, next) {
        try {
            let product =  ProductsService.updateProduct(req.params.id, req.body);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static  deleteProduct(req, res, next) {
        try {
            let product =  ProductsService.deleteProduct(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}

export { ProductsController };