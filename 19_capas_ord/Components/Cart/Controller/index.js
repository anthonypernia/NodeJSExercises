const cartService = require('../Service/');

class CartController {

    async createCart( req, res, next ){
        try{
            let id = await cartService.createCart();
            res.status(200).json({id});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    async  deleteCart(req, res, next){
        try{
            let cartId = req.params.id;
            let response = await cartService.deleteCart(cartId);
            if (response) {
                res.status(200).json({result:"Complete"});
                return;
            }
            res.status(404).json({error: "Cart not found"});
            
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    async  getCartProducts(req, res, next ){
        try{
            let cartId = req.params.id;
            let products =  await cartService.getCartProducts(cartId)
            if (products) {
                res.status(200).json({products});
                return;
            }
            res.status(404).json({error: "Cart not found"});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    async  addProductToCart(req, res, next){
        try{
            let cartId = req.params.id;
            let product = req.body.id;
            let response =  await cartService.addProductToCart(cartId, product);
            if (response) {
                res.status(200).json({result:"Complete"});
                return;
            }
            res.status(404).json({error: "Cart not found"});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    async  removeProductFromCart(req, res, next ){
        try{
            let cartId = req.params.id;
            let productId = req.params.id_prod;
            let response =  await cartService.removeProductFromCart(cartId, productId);
            if (response) {
                res.status(200).json({result:"Complete"});
                return;
            }
            res.status(404).json({error: "Cart or Product not found"});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    async buyCart(req, res, next ){
        let idBuy = await cartService.buyCart(req.body.cart_info);
        if (idBuy) {
            res.status(200).json({idBuy});
            return;
        }
        res.status(400).json({error: "Error in buy"});
        
    }

}

module.exports = new CartController();