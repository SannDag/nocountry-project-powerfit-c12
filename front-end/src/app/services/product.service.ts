import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  authURL = environment.apiResrURL + '/products/';
  constructor(private httpClient:HttpClient) { }

  getProduct(){
    return this.httpClient.get<any>(this.authURL + "/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  public getProductsForCategory(categoryName:string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.authURL + 'category' + `/${categoryName}`);
  }

  public getById(id:number): Observable<any>{
    return this.httpClient.get<any>(this.authURL + `${id}`);
  }

  public getProductByName(name:string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.authURL + 'name' + `/${name}`);
  }


}
