


class ProductsService{

    constructor(){
        this.products = [
            {
                id: 1,
                title: 'House',
                price: 100,
                thumbnail: 'https://cdn1.iconfinder.com/data/icons/bokbokstars-121-classic-stock-icons-1/512/Home-icon.png'
            },
            {
                id: 2,
                title: 'Car',
                price: 200,
                thumbnail: 'https://cdn0.iconfinder.com/data/icons/isometric-city-basic-transport/48/car-front-01-512.png'
            },
            {
                id: 3,
                title: 'Laptop',
                price: 300,
                thumbnail: 'https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/laptop-with-code-512.png'
            }
        ]
    }

    async getAllProducts(){
        return this.products;
    }

    async getProductsById(id){
        
        return this.products.find(product => product.id == id);
    }

    async insertProducts(product){
        let incrementarId = this.products[this.products.length - 1].id + 1;
        product.id = incrementarId;
        this.products.push(product);
        return product;
    }

    async updateProduct(id, product){
        const index = this.products.findIndex(p => p.id == id);
        product.id = this.products[index].id;
        this.products[index] = product;

    }

    async deleteProduct(id){
        let deletedProduct = this.products.find(product => product.id == id);
        this.products = this.products.filter(product => product.id != id);
        return deletedProduct;
    }

}

module.exports = new ProductsService();
