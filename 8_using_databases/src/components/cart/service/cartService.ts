
import { Cart } from "../model/Cart"
import { ProductsService } from "../../products/service/productsService"
import { Product } from "../../products/model/Product"
import { Database } from '../../../../config/db'
import fs from "fs"
class CartService {

    private static mariaDB =  Database.getMariaDB()

    private static async getProductsCartFromDB(id){
        let products = await this.mariaDB('carts_products').where('cart_id', id).select('product_id');
        let productIds = products.map(product => product.product_id);
        return await ProductsService.getProductsByIdList(productIds);
    }

    private static async createCartToDb(){
        return await this.mariaDB('carts').insert({
            timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        });
    }

    private static async deleteCartFromDB(id){
        return await this.mariaDB('carts').where('id', id).del();
    }
    private static async addProductToCartDB(id, productId){
        return await this.mariaDB('carts_products').insert({
            cart_id: id,
            product_id: productId,
        });
    }

    private static async removeProductFromCartDB(id, productId){
        return await this.mariaDB('carts_products').where('cart_id', id).where('product_id', productId).del();
    }

    private static async createTable(){
        let existsCart = await this.mariaDB.schema.hasTable('carts')
        if (!existsCart) {
                    await this.mariaDB.schema.createTable('carts', function (table) {
                        table.increments('id').primary();
                        table.string('timestamp');
                    });
        }

        let existsCartProducts = await this.mariaDB.schema.hasTable('carts_products')
        if (!existsCartProducts) {
                     await this.mariaDB.schema.createTable('carts_products', function (table) {
                        table.increments('id').primary();
                        table.integer('cart_id').unsigned().references('id').inTable('carts');
                        table.integer('product_id').unsigned().references('id').inTable('products');
                    });
        }
    }

    static async createSchema(){
        return await this.createTable();
    }


    static async createCart() {
        return this.createCartToDb();
    }

    static async deleteCart(id: number) {
        return await this.deleteCartFromDB(id); 
    }

    static async  getCartProducts(id: number) {
       
        let cart = await CartService.mariaDB('carts').where('id', id).first();
        if (cart) {
            return await this.getProductsCartFromDB(id);
        }
            return null;
 

    }

    static async addProductToCart(id: number, productId: number) {

        let cart = await CartService.mariaDB('carts').where('id', id).first();
        if (cart) {
            return await this.addProductToCartDB(id, productId);
        }
        return false; 
    }

    static async removeProductFromCart(id: number, productId: number) {
        return await this.removeProductFromCartDB(id, productId);
    }

    static async saveCartFile(id: number) {
        try{
            let products = await CartService.getCartProducts(id);
            let cartFile = {
                id: id,
                products: products
            }
            let datefile = new Date(Date.now()).toISOString().slice(0, 10).replace('T', ' ');
            fs.writeFileSync(`./cart_${id}_${datefile}.json`, JSON.stringify(cartFile));
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    
}

export { CartService };