let mongoDB = require('../../../config/db/MongoDB');

class ProductsService{
    database =  mongoDB

    async getProductsFromDB(){
        const products = await this.database.getAll('products')
        return products
    }

    async getProductsByIdFromDB(id){
        const product = await this.database.getById('products', id)
        return product
    }

    async getProductsByIdListFromDB(idList){
        let product = await this.database.getByIdList('products', idList)
        return product;
    }

     async insertProductsToDB(data){
        return await this.database.insert('products', data);
    }

    async UpdateProductsToDB(id, data){
        return await this.database.update('products', id, data);
    }
    async deleteProductFromDB(id){
        return await this.database.delete('products', id);
    }

    async getAllProducts() {
        return  await this.getProductsFromDB();
    }

    async getProductsById(id){
        return await this.getProductsByIdFromDB(id);
    }
    
    async getProductsByIdList(idList){
        return await this.getProductsByIdListFromDB(idList);
    }

    async insertProducts(product){
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

    async updateProduct(id, product){
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

    async deleteProduct(id){
        return await this.deleteProductFromDB(id);
    }
}

module.exports = new ProductsService();