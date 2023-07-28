export class User {
    id?: number;
    name: string;
    description: string;
    lastname: string;
    img: string;

    constructor(name: string, lastname: string, description: string, img: string){
        this.name = name;
        this.lastname = lastname;
        this.description = description;
        this.img = img;
    }
}
