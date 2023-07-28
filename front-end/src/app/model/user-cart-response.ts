export class UserCartResponse {
  id:number;
  name:string;
  lastName:string;
  email:string;

  constructor(id:number,name:string,lastName:string,
    email:string){
      this.id=id;
      this.name=name;
      this.lastName=lastName;
      this.email=email;
    }
}
