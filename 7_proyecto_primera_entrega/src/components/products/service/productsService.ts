
import { Product } from '../model/Product'


class ProductsService{

    private static products = [
        new Product(1, Date.now(), "casa", "casa color blanco", "AAAA222333", "LINK",230, 20 ),
        new Product(2, Date.now(), "carro", "carro color rojo", "BBBB3333XXX", "LINK", 300 ,10 ),
        new Product(3, Date.now(), "moto", "moto color azul", "CCCC4444YYY", "LINK",400 , 5 ),
        new Product(4, Date.now(), "bicicleta", "bicicleta color verde", "DDDD5555ZZZ", "LINK", 400, 15 )
    ]

    static async getAllProducts() {
        return this.products;
    }

    static async getProductsById(id: number){
        return this.products.find(product => product.getId() == id);
    }

    static async insertProducts(product){
        let incrementarId = this.products[this.products.length - 1].getId() + 1;
        product.id = incrementarId;
        this.products.push(new Product(product.id, Date.now(), product.name, product.description, product.code, product.photo, product.price ,product.stock));
        return product;

    }

    static async updateProduct(id, product){
        const index = this.products.findIndex(product => product.getId() == id);
        product.id = this.products[index].getId();
        this.products[index] = new Product(product.id, Date.now(), product.name, product.description, product.code, product.photo, product.price , product.stock);
        return this.products[index];
    }

    static async deleteProduct(id){
        let deletedProduct = this.products.find(product => product.getId() == id);
        this.products = this.products.filter(product => product.getId() != id);
        return deletedProduct;
    }

}

export  { ProductsService }