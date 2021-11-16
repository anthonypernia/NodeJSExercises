
import { Cart } from "../model/Cart"
import { ProductsService } from "../../products/service/productsService"
import { Product } from "../../products/model/Product"
import { Database } from '../../../../config/db'
import fs from "fs"
class CartService {

    private static mariaDB =  Database.getMariaDB()

    private static cartList:Cart[] = [
        new Cart(1, Date.now(),[
            1,2
        ]),
        new Cart(2, Date.now(),[
            3,4
        ]),
    ];


    static async createSchema(){

        try{
            await CartService.mariaDB.schema.hasTable('carts').then( async function(exists) {
                if (!exists) {
                     await CartService.mariaDB.schema.createTable('carts', function (table) {
                        table.increments('id').primary();
                        table.string('timestamp');
                    }).then(function () {
                        console.log('Created Table');
                    }).catch(function (err) {
                        console.error('Unable to create table', err);
                    });
                }
            });
        }catch(err){
            return err;
        }

        try{
            await CartService.mariaDB.schema.hasTable('carts_products').then( async function(exists) {
                if (!exists) {
                     await CartService.mariaDB.schema.createTable('carts_products', function (table) {
                        table.increments('id').primary();
                        table.integer('cart_id').unsigned().references('id').inTable('carts');
                        table.integer('product_id').unsigned().references('id').inTable('products');
                    }).then(function () {
                        console.log('Created Table');
                    }).catch(function (err) {
                        console.error('Unable to create table', err);
                    });
                }
            });
        }catch(err){
            return err;
        }
    }


    static async createCart() {
        await CartService.createSchema();
        let res = await CartService.mariaDB('carts').insert({
            timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        });
        return res;
    }

    static async deleteCart(id: number) {
        let res = await CartService.mariaDB('carts').where('id', id).del();
        return res;
    }

    static async  getCartProducts(id: number) {
        // let cart = this.cartList.find(cart => cart.getId() == id);
        // if (cart) {
        //     return cart.getProducts();
        // }else{
        //     return [-1];
        // }
        let cart = await CartService.mariaDB('carts').where('id', id).first();
        if (cart) {
            let products = await CartService.mariaDB('carts_products').where('cart_id', id).select('product_id');
            let productIds = products.map(product => product.product_id);
            let productsList = await ProductsService.getProductsByIdList(productIds);
            return productsList;
        }else{
            return [];
        }
        
    }

    static async addProductToCart(id: number, productId: number) {
        let cart = await CartService.mariaDB('carts').where('id', id).first();
        if (cart) {
            let res = await CartService.mariaDB('carts_products').insert({
                cart_id: id,
                product_id: productId,
            });
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