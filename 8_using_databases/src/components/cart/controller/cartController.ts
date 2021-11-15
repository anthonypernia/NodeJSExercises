import { CartService } from '../service/cartService';
import { ProductsService } from '../../products/service/productsService'

class CartController {

    static createCart( req, res, next ){
        try{
            let id:number = CartService.createCart();
            res.status(200).json({id});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  deleteCart(req, res, next){
        try{
            let cartId = parseInt(req.params.id);
            let response = CartService.deleteCart(cartId);
            if (response) {
                res.status(200).json({result:"Complete"});
            }else{
                res.status(404).json({error: "Cart not found"});
            }
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  getCartProducts(req, res, next ){
        try{
            let cartId = parseInt(req.params.id);
            let refProductsId =  CartService.getCartProducts(cartId)
            if (refProductsId[0] !== -1) {
                let productsToReturn =  ProductsService.getProductsByIdList(refProductsId);
                res.status(200).json(productsToReturn);
            }else{
                res.status(404).json({error: "Cart not found"});
            }
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  addProductToCart(req, res, next){
        try{
            let cartId = parseInt(req.params.id);
            let productId = parseInt(req.body.id);
            let response =  CartService.addProductToCart(cartId, productId);
            if (response) {
                res.status(200).json({result:"Complete"});
            }else{
                res.status(404).json({error: "Cart not found"});
            }
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  removeProductFromCart(req, res, next ){
        try{
            let cartId = parseInt(req.params.id);
            let productId = parseInt(req.params.id_prod);
            let response =  CartService.removeProductFromCart(cartId, productId);
            if (response==1) {
                res.status(200).json({result:"Complete"});
            }else if(response==-1){
                res.status(404).json({error: "Product not found"});
            }else{
                res.status(404).json({error: "Cart not found"});
            }
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static saveCartFile(req, res, next ) {
        try{
            let cartId = parseInt(req.params.id);
            let response = CartService.saveCartFile(cartId);
            if (response) {
                res.status(200).json({result:"Complete"});
            }else{
                res.status(404).json({error: "Cart not found"});
            }
        }catch(err){
            res.status(500).json({error: err});
        }
    }

}

export { CartController };