import { Component } from '@angular/core';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.css']
})
export class ErrorComponentComponent {
  errorMessage = 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente más tarde.';
}
