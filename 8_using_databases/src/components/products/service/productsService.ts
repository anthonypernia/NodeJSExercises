
import { Product } from '../model/Product'
import { Database } from '../../../../config/db'
import knex from 'knex';

class ProductsService{

    private static mariaDB =  Database.getMariaDB()
    
    private static async getProductsFromDB(){
        const products = await this.mariaDB.select('*').from('products')
        return products
    }

    private static async getProductsByIdFromDB(id){
        const product = await this.mariaDB.from('products').where('id', id)
        return product
    }

    private static async getProductsByIdListFromDB(idList: number[]){
        let product = await this.mariaDB.from('products').whereIn('id', idList)
        return product;
    }

    private static async insertProductsToDB(data){
        return await this.mariaDB.from('products').insert(data);
    }

    private static async UpdateProductsToDB(id, data){
        return await this.mariaDB.from('products').where('id', id).update(data);
    }
    private static async deleteProductFromDB(id){
        return await this.mariaDB.from('products').where('id', id).del();
    }

    private static async createTables(){
        let exists = await this.mariaDB.schema.hasTable('products')
        if (!exists) {
                 await this.mariaDB.schema.createTable('products', function (table) {
                    table.increments('id').primary();
                    table.string('timestamp');
                    table.string('name');
                    table.string('description');
                    table.string('code');
                    table.string('photo');
                    table.integer('price');
                    table.integer('stock');
                });
            }

    }


    static async createSchema(){
         await this.createTables();
    }

    static async getAllProducts() {
        return  await this.getProductsFromDB();
    }

    static  async getProductsById(id: number){
        return await this.getProductsByIdFromDB(id);
    }
    
    static async getProductsByIdList(idList: number[]){
        return await this.getProductsByIdListFromDB(idList);

    }

    static async insertProducts(product){
        let data = {
            timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
            name: product.name,
            description: product.description,
            code: product.code,
            photo: product.photo,
            price: product.price,
            stock: product.stock
        }
        await this.insertProductsToDB(data);
        return data;
    }

    static  async updateProduct(id, product){
        let data = {
            timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
            name: product.name,
            description: product.description,
            code: product.code,
            photo: product.photo,
            price: product.price,
            stock: product.stock
        }
        return await this.UpdateProductsToDB(id, data);
    }

    static async deleteProduct(id){
        return await this.deleteProductFromDB(id);
    }

}

export  { ProductsService }