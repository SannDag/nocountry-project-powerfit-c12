import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartResponse } from '../model/cart-response';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  cartURL = environment.apiResrURL + '/cart/';

  private cartSubject: BehaviorSubject<CartResponse | null> = new BehaviorSubject<CartResponse | null>(null);
  public cart$: Observable<CartResponse | null> = this.cartSubject.asObservable();

  constructor(private httpClient:HttpClient) { }

  addProductToCart(cartId: number, productId: number): Observable<any> {
    const url = this.cartURL + cartId + '/products';
    // Enviar el productId como parte de la URL utilizando HttpParams
    let params = new HttpParams();
    params = params.append('productId', productId.toString());

    return this.httpClient.put(url, null, { params: params });
  }

  deletedProductCart(cartId:number, productId:number): Observable<any>{
    const url = `${this.cartURL}${cartId}/product/${productId}`;
    return this.httpClient.delete<any>(url);

  }

  getCartById(cartId: number): void {
    const url = this.cartURL + cartId + '/products';

    this.httpClient.get<CartResponse>(url).pipe(
      tap((cartData: CartResponse) => this.cartSubject.next(cartData)),
      catchError((error) => {
        console.error('Error al obtener los detalles del carrito:', error);
        this.cartSubject.next(null);
        return [];
      })
    ).subscribe();
  }

 /* getCartById(cartId: number): Observable<CartResponse> {
    const url = `${this.cartURL}/${cartId}/products`;

    return this.httpClient.get<CartResponse>(url);
  }*/


/*
  getCartById(cartId:number): Observable<CartResponse>{
    return this.httpClient.get<CartResponse>(this.cartURL + `${cartId}` + '/products');
  }
*/
  getProduct(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(){
    let grandTotal = 0;
    this.cartItemList.map((a : any) =>{
      grandTotal += a.total;
    })
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
