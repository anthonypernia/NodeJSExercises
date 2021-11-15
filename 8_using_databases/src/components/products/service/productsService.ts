
import { Product } from '../model/Product'


class ProductsService{

    private static products = [
        new Product(1, Date.now(), "casa", "casa color blanco", "AAAA222333", "https://decoraideas.com/wp-content/uploads/2016/01/022.jpg",230, 20 ),
        new Product(2, Date.now(), "carro", "carro color rojo", "BBBB3333XXX", "https://upload.wikimedia.org/wikipedia/commons/c/cf/Carro_Rojo_jun_Bog_2019.jpg", 300 ,10 ),
        new Product(3, Date.now(), "moto", "moto color negro", "CCCC4444YYY", "https://s3.eu-west-1.amazonaws.com/cdn.motorbikemag.es/wp-content/uploads/2018/10/MV-Agusta-F4-Claudio-2019-42-530x397.jpg",400 , 5 ),
        new Product(4, Date.now(), "bicicleta", "bicicleta color verde", "DDDD5555ZZZ", "https://thumbs.dreamstime.com/b/bicicleta-verde-aislada-en-un-blanco-89959574.jpg", 400, 15 )
    ]

    static  getAllProducts() {
        return this.products;
    }

    static  getProductsById(id: number){
        return this.products.find(product => product.getId() == id);
    }
    
    static  getProductsByIdList(idList: number[]){
        return this.products.filter(product => idList.includes(product.getId()));
    }

    static  insertProducts(product){
        let incrementarId = this.products[this.products.length - 1].getId() + 1;
        product.id = incrementarId;
        this.products.push(new Product(product.id, Date.now(), product.name, product.description, product.code, product.photo, product.price ,product.stock));
        return product;

    }

    static  updateProduct(id, product){
        const index = this.products.findIndex(product => product.getId() == id);
        product.id = this.products[index].getId();
        this.products[index] = new Product(product.id, Date.now(), product.name, product.description, product.code, product.photo, product.price , product.stock);
        return this.products[index];
    }

    static  deleteProduct(id){
        let deletedProduct = this.products.find(product => product.getId() == id);
        this.products = this.products.filter(product => product.getId() != id);
        return deletedProduct;
    }

}

export  { ProductsService }