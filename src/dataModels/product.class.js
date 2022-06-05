class Product {

    /**
        * This component define the product class and formate them. Includes the calcul of VAT and add the '€' sigle for prices.
    */

    constructor(data) {
        this.id = data.id ?? '';
        this.title = data.title ?? '';
        this.category = data.category ?? '';
        this.description = data.description ?? '';
        this.price = data.price ?? 0;
        this.image = data.image ?? '';
        this.rating = data.rating ?? {};
    }

    // add '€' at the end of the price
    formatedPrice = () => {
        return `${this.price} €`;
    }

    // VAT calcul
    getTVA = () => {
        return `${Math.round(this.price + ((this.price * 20) / 100))} €`
    }

}

export default Product;