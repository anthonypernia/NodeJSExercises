

import { Database } from '../../../../config/database'
import fs from "fs"
class CartService {

    private static database =  Database.getDB()

    private static async getProductsCartFromDB(id){
        let products = await this.database.getAllDataInsideDocument('carts', id, 'products');
        return products;
    }

    private static async createCartToDb(){
        return await this.database.insertData('carts', {
            timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        });
    }

    private static async deleteCartFromDB(id){
        return await this.database.deleteData('carts', id);
    }
    private static async addProductToCartDB(id, product){
        return await this.database.insertDataInsideDocument('carts', id, product, 'products');
    }

    private static async removeProductFromCartDB(id, productId){
        return await this.database.deleteDataInsideDocument('carts', id, 'products' , productId);
    }

    private static async createTable(){
        await this.database.createTable('carts', table => {
            table.increments('id').primary();
            table.string('timestamp');
        })
    }

    static async createSchema(){
        return await this.createTable();
    }


    static async createCart() {
        return this.createCartToDb();
    }

    static async deleteCart(id) {
        return await this.deleteCartFromDB(id); 
    }

    static async  getCartProducts(id) {
        let products = await CartService.getProductsCartFromDB(id);
        return products;
    }

    static async addProductToCart(id, product) {
        
        return await this.addProductToCartDB(id, product);
    }

    static async removeProductFromCart(id, productId) {
        return await this.removeProductFromCartDB(id, productId);
    }

    static async saveCartFile(id) {
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