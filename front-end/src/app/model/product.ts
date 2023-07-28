import { Image } from "./image";
export class Product {
  id: number;
  name:string;
  description:string;
  price:number;
  stock:number;
  category:string;
  imgList: Image[];
  selectedImage: Image | undefined; // Propiedad para almacenar la imagen seleccionada

  constructor( id: number,name:string,description:string,price:number,
    stock:number,category:string,imgList:Image[]){
      this.id=id;
      this.name=name;
      this.description=description;
      this.price=price;
      this.stock=stock;
      this.category=category;
      this.imgList = imgList;
    }
}
