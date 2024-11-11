export class Users {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    reviewer: boolean;
    admin: boolean;

    constructor(id: number = 0,
        username: string = "",
        password: string = "",
        firstName: string = "",
        lastName: string = "",
        phoneNumber: string = "",
        email: string = "",
        reviewer: boolean = false,
        admin: boolean = false) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.reviewer = reviewer;
        this.admin = admin;
    }
    details(): string {
        return `User: ID ${this.id} - ${this.firstName} ${this.lastName}.  
            Contact Details: ${this.phoneNumber}, ${this.email}.  
            Account Details: ${this.username}, ${this.password}, Admin: ${this.admin}, Reviewer: ${this.reviewer}`;
    }
}
