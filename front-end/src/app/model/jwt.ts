export class Jwt {
  token: string;
  message: string;
  cartId: number;
  name:string

  constructor(token:string,message:string,cartId:number,name:string){
    this.token = token;
    this.message = message;
    this.cartId = cartId;
    this.name = name;
  }
}
