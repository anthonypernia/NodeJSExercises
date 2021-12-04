
import { Product } from '../model/Product'
import { Database } from '../../../../config/database'
import knex from 'knex';

class ProductsService{
    private static database: any =  Database.getDB()

    private static async getProductsFromDB(){
        const products = await this.database.getAllData('products')
        return products
    }

    private static async getProductsByIdFromDB(id){
        const product = await this.database.getDataById('products', id)
        return product
    }

    private static async getProductsByIdListFromDB(idList: []){
        let product = await this.database.getDataByIdList('products', idList)
        return product;
    }

    private static async insertProductsToDB(data){
        return await this.database.insertData('products', data);
    }

    private static async UpdateProductsToDB(id, data){
        return await this.database.updateData('products', id, data);
    }
    private static async deleteProductFromDB(id){
        return await this.database.deleteData('products', id);
    }

    private static async createTables(){
        await this.database.createTable('products', function (table) {
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


    static async createSchema(){
         await this.createTables();
    }

    static async getAllProducts() {
        return  await this.getProductsFromDB();
    }

    static  async getProductsById(id){
        return await this.getProductsByIdFromDB(id);
    }
    
    static async getProductsByIdList(idList: []){
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