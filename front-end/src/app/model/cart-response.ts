import { Product } from "./product";
import { UserCartResponse } from "./user-cart-response";

export class CartResponse {
  id:number;
  user:UserCartResponse;
  products:Product[];
  amount:number;
  quantity:number;

  constructor(id:number,user:UserCartResponse,
    products:Product[],amount:number,quantity:number){
      this.id=id;
      this.user=user;
      this.products=products;
      this.amount=amount;
      this.quantity=quantity;
    }
}
