import { ProductsService } from '../service/productsService';
import { validateSecurity } from '../../../utils/utils'
class ProductsController {
    
    static async  getProducts(req, res, next) {
        try {
            if (req.params.id) {
                let products =  await ProductsService.getProductsById(req.params.id);
                if (products) {
                    res.status(200).json(products);
                }else{
                    res.status(404).json({message: 'Product not found'});
                }
            } else {
                let products =  await ProductsService.getAllProducts();
                if (products) {
                    res.status(200).json(products);
                }else{
                    res.status(404).json({ message: 'No products found' });
                }
                
            }
        } catch (err) {
            req.status(500).json(err);
        }
    }

    static async insertProducts(req, res, next) {
        try {
            if (validateSecurity(req)) {
                let product =  await ProductsService.insertProducts(req.body);
                res.status(200).json(product);
            }else{
                res.status(401).json({message: 'Unauthorized method error'});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async updateProduct(req, res, next) {
        try {
            if(validateSecurity(req)){
                let product =  await ProductsService.updateProduct(req.params.id, req.body);
                if (product) {
                    res.status(200).json(product);
                }else{
                    res.status(404).json({message: 'Product not found'});
                }
                res.status(200).json(product);
            }else{
                res.status(401).json({message: 'Unauthorized method error'});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            if (validateSecurity(req)) {
                let result =  await ProductsService.deleteProduct(req.params.id);
                if (result) {
                    res.status(200).json(result);
                }else{
                    res.status(404).json({message: 'Product not found'});
                }
            }else{
                res.status(401).json({message: 'Unauthorized method error'});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

}

export { ProductsController };