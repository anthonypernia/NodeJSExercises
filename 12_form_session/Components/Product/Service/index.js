

class ProductsService{
    //  database =  Database.getDB()

    async getProductsFromDB(){
        // const products = await this.database.getAllData('products')
        // return products
    }

    async getProductsByIdFromDB(id){
        // const product = await this.database.getDataById('products', id)
        // return product
    }

    async getProductsByIdListFromDB(idList){
        // let product = await this.database.getDataByIdList('products', idList)
        // return product;
    }

     async insertProductsToDB(data){
        // return await this.database.insertData('products', data);
    }

    async UpdateProductsToDB(id, data){
        // return await this.database.updateData('products', id, data);
    }
    async deleteProductFromDB(id){
        // return await this.database.deleteData('products', id);
    }

    async createTables(){
        // await this.database.createTable('products', function (table) {
        //     table.increments('id').primary();
        //     table.string('timestamp');
        //     table.string('name');
        //     table.string('description');
        //     table.string('code');
        //     table.string('photo');
        //     table.integer('price');
        //     table.integer('stock');
        // });
    }


    async createSchema(){
        //  await this.createTables();
    }

    async getAllProducts() {
        console.log('getAllProducts');
        return 'getAllProducts';
        // return  await this.getProductsFromDB();
    }

    async getProductsById(id){
        return 'getProductsById';
        // return await this.getProductsByIdFromDB(id);
    }
    
    async getProductsByIdList(idList){
        // return await this.getProductsByIdListFromDB(idList);

    }

    async insertProducts(product){
        // let data = {
        //     timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        //     name: product.name,
        //     description: product.description,
        //     code: product.code,
        //     photo: product.photo,
        //     price: product.price,
        //     stock: product.stock
        // }
        // await this.insertProductsToDB(data);
        
        // return data;
    }

    async updateProduct(id, product){
        // let data = {
        //     timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        //     name: product.name,
        //     description: product.description,
        //     code: product.code,
        //     photo: product.photo,
        //     price: product.price,
        //     stock: product.stock
        // }
        // return await this.UpdateProductsToDB(id, data);
    }

    async deleteProduct(id){
        // return await this.deleteProductFromDB(id);
    }
}

module.exports = new ProductsService();