import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { ProductPayment } from 'src/app/model/product-payment';
import { CartService } from 'src/app/services/cart.service';
import { MercadoPagoServiceService } from 'src/app/services/mercado-pago-service.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStoreService } from 'src/app/services/token-store.service';

@Component({
  selector: 'app-suplementos',
  templateUrl: './suplementos.component.html',
  styleUrls: ['./suplementos.component.css']
})
export class SuplementosComponent implements OnInit{

  products: Product[] = [];

  paymentSandboxUrl!: string;

  constructor(private productService:ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,private tokenStore:TokenStoreService,
    private cartService:CartService,private mercadoPagoService:MercadoPagoServiceService){}

  ngOnInit(): void {
    this.productService.getProductsForCategory('Suplementos').subscribe(
      response => {
        this.products = response;
      },
      err => {
        this.toastr.info('Sin productos en la categoria Suplementos.')
      }
    )
  }
/*
  addtocart(item:any){
    this.cartService.addToCart(item);
  }
*/
  addToPreference(product: Product){
    if(!this.tokenStore.isLoggued()){
      this.toastr.error("Debes estar logueado para comprar");
      return;
    }
    const productPayment = new ProductPayment(product.id,product.name,product.description,
      1,product.price,product.imgList[0].fileUrl);
    // Llama al servicio o componente que interactúa con Mercado Pago
    // para agregar el producto a la preferencia antes de redirigir al usuario a la URL de pago
    // Por ejemplo, supongamos que tienes un servicio llamado 'mercadoPagoService'
    // que contiene el método 'createPreferenceRest'
    this.mercadoPagoService.createPreference(productPayment).subscribe(
      (response) => {
        // Maneja la respuesta de Mercado Pago si es necesario
        // Por ejemplo, puedes redireccionar al usuario a la URL de pago después de obtener la preferencia
        // Asegúrate de que la variable 'paymentSandboxUrl' esté actualizada con la URL de pago obtenida
        console.log(response);
        this.paymentSandboxUrl = response.initPoint;
        window.location.href = this.paymentSandboxUrl;
      },
      (err) => {
        this.toastr.error(err.error,"Error");
      }
    );
  }
}
