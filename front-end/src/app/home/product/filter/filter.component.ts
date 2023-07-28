import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductPayment } from 'src/app/model/product-payment';
import { SearchService } from 'src/app/search.service';
import { MercadoPagoServiceService } from 'src/app/services/mercado-pago-service.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStoreService } from 'src/app/services/token-store.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  paymentSandboxUrl!: string;
  products: Product[] = [];

  constructor(private productService:ProductService,
    private toastr:ToastrService,private searchService: SearchService,private route: ActivatedRoute,
    private mercadoPagoService:MercadoPagoServiceService,private tokenStore:TokenStoreService){

    }
    ngOnInit(): void {
   // Lee los parámetros de la ruta y realiza la búsqueda al cargar el componente
   this.route.queryParams.subscribe(params => {
    const searchValue = params['search'];
    if (searchValue) {
      this.productService.getProductByName(searchValue).subscribe(products => {
        this.products = products;
      });
    }
  });
}

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
/*
    searchProductByName(productName:string) {
    this.productService.getProductByName(productName).subscribe(
      response => {
        console.log(response);
        this.products = response;
      },
      error => {
        this.toastr.error("No se encontraron productos");
        console.error(error);
      }
    )
  }
  */







}
