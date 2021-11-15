
import { Cart } from "../model/Cart"
import { ProductsService } from "../../products/service/productsService"
import { Product } from "../../products/model/Product"
import fs from "fs"
class CartService {

    private static cartList:Cart[] = [
        new Cart(1, Date.now(),[
            1,2
        ]),
        new Cart(2, Date.now(),[
            3,4
        ]),
    ];

    static createCart() {
        let incrementarId = this.cartList[this.cartList.length - 1].getId() + 1;
        let cart = new Cart(incrementarId, Date.now(), []);
        this.cartList.push(cart);
        return cart.getId();
    }

    static deleteCart(id: number) {
        let cartIndex = this.cartList.findIndex(cart => cart.getId() == id);
        if (cartIndex != -1) {
            this.cartList.splice(cartIndex, 1);
            return true;
        }else{
            return false;
        }
    }

    static getCartProducts(id: number) {
        let cart = this.cartList.find(cart => cart.getId() == id);
        if (cart) {
            return cart.getProducts();
        }else{
            return [-1];
        }
        
    }

    static addProductToCart(id: number, productId: number) {
        let cart = this.cartList.find(cart => cart.getId() == id);
        if (cart) {
            cart.insertProduct(productId);
            return true;
        }else{
            return false;
        }
        
    }

    static removeProductFromCart(id: number, productId: number) {
        let cart = this.cartList.find(cart => cart.getId() == id);
        if (cart) {
            let result = cart.deleteProductById(productId);
            return result
        }else{
            return -2;
        }
    }

    static saveCartFile(id: number) {
        let cart = this.cartList.find(cart => cart.getId() == id);
        if (cart) {
            let json = JSON.stringify(cart);
            fs.writeFileSync(`cart${id}.txt`, json);
            return true;
        }else{
            return false;
        }
    }

    
}

export { CartService };