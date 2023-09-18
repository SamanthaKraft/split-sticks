export class User{
    constructor(id, name, itemsInCart) {
    this.id = id;             // integer
    this.name = name;     
    this.itemsInCart = itemsInCart;    // string
    }
}
export class Cigar {
    constructor(id, name, purchasers, price,img, country) {
        this.id = id;
        this.name = name;
        this.purchasers = purchasers; 
        this.price = price;
        this.img = img;
        this.country=country;
    }
    get purchaseSplit() {
        return this.purchasers.length;
    }
}