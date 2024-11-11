import { Products } from "./products";
import { Request } from "./request";

export class LineItem {
    id: number;
    request: Request;
    product: Products;
    quantity: number;

    constructor(
        id: number = 0,
        request: Request = new Request(),
        product: Products = new Products(),
        quantity: number = 0
    ) {
        this.id = id;
        this.request = request;
        this.product = product;
        this.quantity = quantity;
    }
    details(): string {
        return `Line Item ${this.id}: ${this.quantity} ${this.product} added to ${this.request}.`
    }
}
