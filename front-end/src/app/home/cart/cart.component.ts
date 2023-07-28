import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/user/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TotalItemService } from 'src/app/services/total-item.service';
import { CartResponse } from 'src/app/model/cart-response';
import { TokenService } from 'src/app/services/token.service';
import { TokenStoreService } from 'src/app/services/token-store.service';
import { Product } from 'src/app/model/product';
import { ProductPayment } from 'src/app/model/product-payment';
import { MercadoPagoServiceService } from 'src/app/services/mercado-pago-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{

  public subTotal !: any;
  public grandTotal !: any;
  cartData!: CartResponse | null;
  loading: boolean = true;
  error: boolean = false;
  public totalItem : number = 0;
  paymentSandboxUrl!: string;

  constructor(private cartService : CartService, private authService:AuthService,
    private tostr:ToastrService, private totalItemService:TotalItemService,
    private tokenService:TokenStoreService, private mercadoPagoService:MercadoPagoServiceService) { }

   // Reemplaza esto con el ID del carrito que deseas mostrar

  private subscription: Subscription = new Subscription();




  ngOnInit(): void {

    this.getCartDetails();

  }
  estaLogueado(): boolean{
   return this.tokenService.isLoggued();
  }

  deletedProduct(cartId:number, productId:number){
    // Llamar al servicio para eliminar el producto del carrito
    this.cartService.deletedProductCart(cartId, productId).subscribe(
      response => {
        // El producto se eliminó exitosamente
        // Actualizar la lista local de productos
      if (this.cartData) {
        this.cartData.products = this.cartData.products.filter((product: any) => product.id !== productId);
      }
        this.tostr.success("Producto eliminado");
        console.log('Producto eliminado del carrito:', response);
        // Aquí podrías realizar alguna acción adicional si es necesario,
        // por ejemplo, actualizar la lista de productos en el carrito.
      },
      error => {
        // Manejo de errores en caso de que la eliminación falle
        this.tostr.error("Error al eliminar el producto del carrito");
        console.error('Error al eliminar el producto del carrito:', error);
      }
    );

  }
  comprar(products:Product[]){
    if(!this.tokenService.isLoggued()){
      this.tostr.error("Debes estar logueado para comprar");
      return;
    }
    const productsPayment: ProductPayment[] = [];
    // Recorremos los productos recibidos como parámetro
  for (const product of products) {
    // Mapeamos cada producto al objeto ProductPayment y lo agregamos al array productsPayment
    const productPayment = new ProductPayment(
      product.id,
      product.name,
      product.description,
      1, // Suponemos que siempre compramos una cantidad de 1 por producto
      product.price,
      product.imgList[0].fileUrl
    );
    productsPayment.push(productPayment);
  }

  this.mercadoPagoService.createPreferenceProducts(productsPayment).subscribe(
    response =>{
      console.log(response);
      this.paymentSandboxUrl = response.initPoint;
      window.location.href = this.paymentSandboxUrl;
    },
    err =>{
      console.log(err.message);
      this.tostr.error(err.error,"Error");
    }
  )

  }
  getCartDetails(): void {
    this.subscription = this.cartService.cart$.subscribe(
      (cartData: CartResponse | null) => {
        this.cartData = cartData;
        this.loading = false;
        this.error = !cartData; // Si cartData es null, hay un error
        this.totalItem = cartData?.quantity ?? 0;
        // Actualiza el valor del totalItem en el servicio
        this.totalItemService.setTotalItem(this.totalItem);
      }
    );
    const cartId = this.authService.getCartId();
    if(cartId != null){
      this.cartService.getCartById(cartId);
    }else{
      this.tostr.error("Error al devolver productos");
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

}

