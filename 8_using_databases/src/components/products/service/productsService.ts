
import { Product } from '../model/Product'
import { Database } from '../../../../config/db'
import knex from 'knex';

class ProductsService{

    private static mariaDB =  Database.getMariaDB()
    


    static async createSchema(){
        try{
            await ProductsService.mariaDB.schema.hasTable('products').then( async function(exists) {
                if (!exists) {
                     await ProductsService.mariaDB.schema.createTable('products', function (table) {
                        table.increments('id').primary();
                        table.string('timestamp');
                        table.string('name');
                        table.string('description');
                        table.string('code');
                        table.string('photo');
                        table.integer('price');
                        table.integer('stock');
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

    static async getAllProducts() {
        try {
            await this.createSchema();
            let res = await ProductsService.mariaDB.from('products')
            return res;
        }catch(err){
            console.log(err);
            return err;
        }
    }

    static  async getProductsById(id: number){
        try{
            await this.createSchema();
            let res =  await ProductsService.mariaDB.from('products').where('id', id)
            return res;
        }catch(err){
            return err;
        }
    }
    
    static async getProductsByIdList(idList: number[]){
        try{
            await this.createSchema();
            let res = await ProductsService.mariaDB.from('products').whereIn('id', idList)
            return res;
        }catch(err){
            return err;
        }
    }

    static async insertProducts(product){
        try{
            await this.createSchema();
            let data = {
                timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
                name: product.name,
                description: product.description,
                code: product.code,
                photo: product.photo,
                price: product.price,
                stock: product.stock
            }
            await ProductsService.mariaDB.from('products').insert(data);
            return data;
        }catch(err){
            return err;
        }
    }

    static  async updateProduct(id, product){
        try{
            await this.createSchema();
            let data = {
                timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
                name: product.name,
                description: product.description,
                code: product.code,
                photo: product.photo,
                price: product.price,
                stock: product.stock
            }
            let res = await ProductsService.mariaDB.from('products').where('id', id).update(data);
            return res;
        }catch(err){
            return err;
        }
    }

    static async deleteProduct(id){
        try{
            await this.createSchema();
            let res = await ProductsService.mariaDB.from('products').where('id', id).del();
            return res;
        }catch(err){
            return err;
        }
    }

}

export  { ProductsService }