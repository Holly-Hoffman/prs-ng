import { Users } from "./users";

export class RequestForm {
    id: number;
    user: Users;
    requestNumber: string;
    description: string;
    justification: string;
    dateNeeded: Date;
    deliveryMode: string;

    constructor(
        id: number = 0,
        user: Users = new Users(),
        requestNumber: string = "",
        description: string = "",
        justification: string = "",
        dateNeeded: Date = new Date(),
        deliveryMode: string = ""
    ) {
        this.id = id;
        this.user = user;
        this.requestNumber = requestNumber;
        this.description = description;
        this.justification = justification;
        this.dateNeeded = dateNeeded;
        this.deliveryMode = deliveryMode
    }
    details(): string {
        return `Request ID: ${this.id}: Created by ${this.user}.
        Description: ${this.description}: ${this.justification}. Needed: ${this.dateNeeded}.
        Delivery Mode: ${this.deliveryMode}.`
    }
}
