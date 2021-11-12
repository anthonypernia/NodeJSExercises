import { CartService } from '../service/cartService';
import { ProductsService } from '../../products/service/productsService'

class CartController {

    static createCart( req, res, next ){
        let id:number = CartService.createCart();
        res.status(200).json(id);
    }

    static  deleteCart(req, res, next){
        let cartId = parseInt(req.params.id);
        let response = CartService.deleteCart(cartId);
        if (response) {
            res.status(200).json({result:"Complete"});
        }else{
            res.status(404).json({error: "Cart not found"});
        }
    }

    static  getCartProducts(req, res, next ){
        let cartId = parseInt(req.params.id);
        let refProductsId =  CartService.getCartProducts(cartId)
        if (refProductsId[0] !== -1) {
            let productsToReturn =  ProductsService.getProductsByIdList(refProductsId);
            res.status(200).json(productsToReturn);
        }else{
            res.status(404).json({error: "Cart not found"});
        }


    }

    static  addProductToCart(req, res, next){
        let cartId = parseInt(req.params.id);
        let productId = parseInt(req.body.id);
        let response =  CartService.addProductToCart(cartId, productId);
        if (response) {
            res.status(200).json({result:"Complete"});
        }else{
            res.status(404).json({error: "Cart not found"});
        }
    }

    static  removeProductFromCart(req, res, next ){
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
    }

    static saveCartFile(req, res, next ) {
        let cartId = parseInt(req.params.id);
        let response = CartService.saveCartFile(cartId);
        if (response) {
            res.status(200).json({result:"Complete"});
        }else{
            res.status(404).json({error: "Cart not found"});
        }

    }

}

export { CartController };