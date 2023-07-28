import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionData } from 'src/app/model/transaction-data';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-succes-view',
  templateUrl: './succes-view.component.html',
  styleUrls: ['./succes-view.component.css']
})





export class SuccesViewComponent implements OnInit{

  transactionData: any; // Utiliza el tipo de dato adecuado para los datos de la URL
  fechaActual!: Date;
  nombreMes!: string;


  constructor(private route: ActivatedRoute, private pruductService:ProductService,
    private userService:AuthService) {
       // Obtenemos la fecha actual al instanciar el componente
    this.fechaActual = new Date();
    this.nombreMes = this.fechaActual.toLocaleString('default', { month: 'long' });
    }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.transactionData = params;


    });

  }


}
