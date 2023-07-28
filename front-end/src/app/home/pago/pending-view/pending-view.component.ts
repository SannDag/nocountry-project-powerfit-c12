import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionData } from 'src/app/model/transaction-data';

@Component({
  selector: 'app-pending-view',
  templateUrl: './pending-view.component.html',
  styleUrls: ['./pending-view.component.css']
})
export class PendingViewComponent {
  fechaActual!: Date;
  nombreMes!: string;

  transactionData: any; // Utiliza el tipo de dato adecuado para los datos de la URL

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
