
class Product {
    private id: number;
    private timestamp: number;
    private name: string;
    private description: string;
    private code: string;
    private photo: string;
    private price: number;
    private stock: number;

    constructor(id: number, timestamp: number, name: string, description: string, code: string, photo: string, price: number, stock: number) {
        this.id = id;
        this.timestamp = timestamp;
        this.name = name;
        this.description = description;
        this.code = code;
        this.photo = photo;
        this.price = price;
        this.stock = stock;
    }

    public getId(): number {
        return this.id;
    }


}

export { Product };