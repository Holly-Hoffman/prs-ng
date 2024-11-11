import { Users } from "./users";

export class Request {
    id: number;
    user: Users;
    requestNumber: string;
    description: string;
    justification: string;
    dateNeeded: Date;
    deliveryMode: string;
    status: string;
    total: number;
    submittedDate: Date;
    reasonForRejection: string;

    constructor(
        id: number = 0,
        user: Users = new Users(),
        requestNumber: string = "",
        description: string = "",
        justification: string = "",
        dateNeeded: Date = new Date(),
        deliveryMode: string = "",
        status: string = "",
        total: number = 0,
        submittedDate: Date = new Date(),
        reasonForRejection: string = ""
    ) {
        this.id = id;
        this.user = user;
        this.requestNumber = requestNumber;
        this.description = description;
        this.justification = justification;
        this.dateNeeded = dateNeeded;
        this.deliveryMode = deliveryMode;
        this.status = status;
        this.total = total;
        this.submittedDate = submittedDate;
        this.reasonForRejection = reasonForRejection
    }
    details(): string {
        return `Request ID: ${this.id} (${this.requestNumber}): Created by ${this.user} (submitted ${this.submittedDate}).
        Description: ${this.description}: ${this.justification}. Total: ${this.total}. Needed: ${this.dateNeeded}.
        Delivery Mode: ${this.deliveryMode}. Status: ${this.status}.
        Reason for rejection: ${this.reasonForRejection}`
    }
}
