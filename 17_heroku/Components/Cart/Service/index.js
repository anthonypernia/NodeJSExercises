
const MongoDB = require('../../../config/db/MongoDB')

class CartService {

    database =  MongoDB;

    async getProductsCartFromDB(id){
        let productsID = await this.database.getValueFromDocument('carts', id, 'products');
        let products = await this.database.getByIdList('products', productsID);
        return products;
    }

    async createCartToDb(){
        return await this.database.insert('carts', {
            timestamp: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
            products: [],
        });
    }

    async deleteCartFromDB(id){
        return await this.database.delete('carts', id);
    }
    async addProductToCartDB(id, product){
        return await this.database.addValueToDocument('carts', id, 'products', product);
    }

    async removeProductFromCartDB(id, productId){
        return await this.database.deleteValueFromDocument('carts', id, 'products' , productId);
    }

    async createCart() {
        return this.createCartToDb();
    }

    async deleteCart(id) {
        return await this.deleteCartFromDB(id); 
    }

    async  getCartProducts(id) {
        let products = await this.getProductsCartFromDB(id);
        return products;
    }

    async addProductToCart(id, product) {
        return await this.addProductToCartDB(id, product);
    }

    async removeProductFromCart(id, productId) {
        return await this.removeProductFromCartDB(id, productId);
    }
    
}

module.exports = new CartService();