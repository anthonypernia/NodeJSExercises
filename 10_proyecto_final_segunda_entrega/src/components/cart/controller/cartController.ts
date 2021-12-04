import { CartService } from '../service/cartService';
import { ProductsService } from '../../products/service/productsService'

class CartController {

    static  async createCart( req, res, next ){
        try{
            let id = await CartService.createCart();
            res.status(200).json({id});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  async  deleteCart(req, res, next){
        try{
            let cartId = req.params.id;
            let response = await CartService.deleteCart(cartId);
            if (response) {
                res.status(200).json({result:"Complete"});
                return;
            }
            res.status(404).json({error: "Cart not found"});
            
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  async  getCartProducts(req, res, next ){
        try{
            let cartId = req.params.id;
            let products =  await CartService.getCartProducts(cartId)
            if (products) {
                res.status(200).json({products});
                return;
            }
            res.status(404).json({error: "Cart not found"});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  async  addProductToCart(req, res, next){
        try{
            let cartId = req.params.id;
            let product = req.body;
            let response =  await CartService.addProductToCart(cartId, product);
            if (response) {
                res.status(200).json({result:"Complete"});
                return;
            }
            res.status(404).json({error: "Cart not found"});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  async  removeProductFromCart(req, res, next ){
        try{
            let cartId = req.params.id;
            let productId = req.params.id_prod;
            let response =  await CartService.removeProductFromCart(cartId, productId);
            if (response) {
                res.status(200).json({result:"Complete"});
                return;
            }
            res.status(404).json({error: "Cart or Product not found"});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  async saveCartFile(req, res, next ) {
        try{
            let cartId = req.params.id;
            let response = await CartService.saveCartFile(cartId);
            if (response) {
                res.status(200).json({result:"Complete"});
                return;
            }
            res.status(500).json({error: "Error while saving file"});
            
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static async createSchema(req, res, next){
        try{
            let response = await CartService.createSchema();
            res.status(200).json({result:"Complete"});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

}

export { CartController };