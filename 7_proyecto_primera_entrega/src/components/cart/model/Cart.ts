import { Product } from "../../products/model/Product";

class Cart{
    private id: number;
    private timestamp: number;
    private products: Product[];

    constructor(id: number, timestamp: number, product: Product[]){
        this.id = id;
        this.timestamp = timestamp;
        this.products = product;
    }

    public getId(): number{
        return this.id;
    }

    public addProduct(product: Product): void{
        this.products.push(product);
    }

    public getProduct(): Product[]{
        return this.products;
    }

    public deleteProductById(idCart:number , idProduct: number){
        this.products = this.products.filter(product => product.getId() !== idProduct);
    }

    public getAllProducts(): Product[]{
        return this.products;
    }

}