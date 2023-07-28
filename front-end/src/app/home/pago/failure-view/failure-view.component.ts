import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionData } from 'src/app/model/transaction-data';

@Component({
  selector: 'app-failure-view',
  templateUrl: './failure-view.component.html',
  styleUrls: ['./failure-view.component.css']
})
export class FailureViewComponent {
  transactionData: any; // Utiliza el tipo de dato adecuado para los datos de la URL
  fechaActual!: Date;
  nombreMes!: string;

  constructor(private route: ActivatedRoute) { 
    this.fechaActual = new Date();
    this.nombreMes = this.fechaActual.toLocaleString('default', { month: 'long' });

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.transactionData = params;
    });
  }
}
