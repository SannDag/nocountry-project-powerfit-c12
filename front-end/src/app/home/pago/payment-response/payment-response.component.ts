import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { TransactionData } from 'src/app/model/transaction-data';
import { MercadoPagoServiceService } from 'src/app/services/mercado-pago-service.service';

@Component({
  selector: 'app-payment-response',
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.component.css']
})
export class PaymentResponseComponent implements OnInit {
  transactionData: TransactionData | undefined; // Utiliza el tipo de dato adecuado para la respuesta

  constructor(private mercadoPagoService: MercadoPagoServiceService, private router: Router) { }

  ngOnInit() {
    this.mercadoPagoService.sendTransactionData().subscribe(
      (response) => {
        console.log(response);
        this.transactionData = response;
        this.redirectToResponseComponent();
      },
      (error) => {
        console.error(error);
        // Manejar el error si es necesario
      }
    );
  }

  redirectToResponseComponent() {
    const status = this.transactionData?.status;
    if (status === 'approved') {
      this.router.navigateByUrl('/payment/success');
    } else if (status === 'pending') {
      this.router.navigateByUrl('/payment/pending');
    } else if (status === 'failure') {
      this.router.navigateByUrl('/payment/failure');
    } else {
      // Redirigir a una página de error si el estado no es reconocido
      this.router.navigateByUrl('/error');
    }
  }
}








