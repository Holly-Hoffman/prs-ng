export class Vendor {
    id: number;
    code: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber: string;
    email: string;

    constructor(id: number = 0,
        code: string = "",
        name: string = "",
        address: string = "",
        city: string = "",
        state: string = "",
        zip: string = "",
        phoneNumber: string = "",
        email: string = "") {
        this.id = id;
        this.code = code;
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    details(): string {
        return `Vendor: ID ${this.id} - ${this.code} ${this.name}.  
                Contact Details: ${this.address}, ${this.city}, ${this.state} ${this.zip}; 
                ${this.email} | ${this.phoneNumber}.`;
    }
}
