class Product {

    constructor(data){
        this.id = data.id ?? '';
        this.title = data.title ?? '';
        this.category = data.category ?? '';
        this.description = data.description ?? '';
        this.price = data.price ?? 0 ;
        this.image = data.image ?? '';
        this.rating = data.rating ?? {};
    }

    formatedPrice = () => {
        return `${this.price} €`;
    }

    getTVA = () => {
        return `${Math.round(this.price + this.price * 0.20 * 100) / 100} €`
    }
    
}

export default Product;