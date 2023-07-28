export class ProductPayment {
  id:number;
  name:string;
  description:string;
  quantity:number;
  price:number;
  pictureUrl:string;

  constructor(id:number,name:string,description:string,quantity:number,price:number,
    pictureUrl:string){
      this.id=id;
      this.name=name;
      this.description=description;
      this.quantity=quantity;
      this.price=price;
      this.pictureUrl=pictureUrl;
    }

}
/*private Long id;

private String name;

private String description;

private int quantity;

private double price;

private String pictureUrl;*/
