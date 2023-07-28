import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{
  product!: Product;
  quantity:number = 1;
  nameCategory:string ='';
  buttonState: string = ''; // Variable para almacenar el estado del botón activado

  constructor(private productService:ProductService,
  private activatedRoute: ActivatedRoute, private toast:ToastrService, private cartService:CartService,
  private authService:AuthService){}

  ngOnInit(): void {
    this.getProductById();

  }

  agregarProductoAlCarrito(id: number) {
    const cartId = this.authService.getCartId(); // Invocar la función para obtener el valor numérico o null
    if (cartId !== null) {
      // Si cartId no es null, entonces podemos agregar el producto al carrito
      const productId = id; // Reemplaza esto con el ID del producto que deseas agregar

      this.cartService.addProductToCart(cartId, productId).subscribe(
        response => {
          console.log('Producto agregado al carrito exitosamente:', response);
          this.toast.success("Producto agregado con exito");
          // Aquí puedes realizar otras acciones tras agregar el producto
        },
        error => {
          console.error('Error al agregar el producto al carrito:', error.message);
          this.toast.warning('Debes estar logueado para agregar productos al cart.')

        }
      );
    } else {
      // Manejar el caso en el que cartId es null (no hay carrito existente)
      console.error('No se pudo agregar el producto al carrito. No hay carrito existente.');
      this.toast.error('No se pudo agregar el producto al carrito. No hay carrito existente.');
    }
  }

  getProductById():void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.productService.getById(id).subscribe(
      data => {
        console.log(data);
        this.product = data;
        this.nameCategory = this.product.category;
      },
      err => {
        console.log(err);
        this.toast.error(err.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-center'});
      }
    )
  }

  asCategoryClothing():boolean {//tieneCategoriaIndumentaria
    return this.nameCategory === 'Indumentaria';
  }

  decrement():void{
    if(this.quantity > 1)
      this.quantity--;
  }

  increment():void{
    this.quantity++;
  }


  toggleButton(size: string) {
    this.buttonState = size;
  }

  addtocart(item:any){
    this.cartService.addToCart(item);
  }

}
