
import { Cart } from "../model/Cart"
import { ProductsService } from "../../products/service/productsService"
import { Product } from "../../products/model/Product"
import { Database } from '../../../../config/database'
import fs from "fs"
class CartService {

    private static database =  Database.getDB()

    private static async getProductsCartFromDB(id){
        let products = await this.database.getDataById('carts_products', id)
        let productIds = products.map(product => product.product_id);
        return await ProductsService.getProductsByIdList(productIds);
    }

    private static async createCartToDb(){
        return await this.database.insertData('carts', {
            timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        });
    }

    private static async deleteCartFromDB(id){
        return await this.database.deleteData('carts', id);
    }
    private static async addProductToCartDB(id, productId){

        return await this.database.insertData('carts_products', {
            cart_id: id,
            product_id: productId,
        });
    }

    private static async removeProductFromCartDB(id, productId){
        return await this.database.deleteData('carts_products', {
            cart_id: id,
            product_id: productId,
        });
    }

    private static async createTable(){
        await this.database.createTable('carts', table => {
            table.increments('id').primary();
            table.string('timestamp');
        })
        await this.database.createTable('carts_products', table => {
            table.increments('id').primary();
            table.integer('cart_id').unsigned().references('carts.id');
            table.integer('product_id').unsigned().references('products.id');
        })
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
        let products = await CartService.getProductsCartFromDB(id);
        return products;
    }

    static async addProductToCart(id: number, productId: number) {
        return await this.addProductToCartDB(id, productId);
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