import { Product } from "../../products/model/Product";

class Cart{
    private id: number;
    private timestamp: number;
    private productsRefList: number[];

    constructor(id: number, timestamp: number, productsRefList: number[]){
        this.id = id;
        this.timestamp = timestamp;
        this.productsRefList = productsRefList;
    }

    public getId(): number{
        return this.id;
    }

    public insertProduct(productId: number): void{
        this.productsRefList.push(productId);
    }

    public getProducts(): number[]{
        return this.productsRefList;
    }

    public getProductById(id: number): number{
        return this.productsRefList.filter(idProdRef => idProdRef === id)[0];
    }

    public deleteProductById( id: number){
        let deleted = -1;
        this.productsRefList.forEach( (productObj, index) => {
            if(productObj == id){
                this.productsRefList.splice(index, 1);
                deleted = 1;
            }
        });
        return deleted;
    }

}

export { Cart };