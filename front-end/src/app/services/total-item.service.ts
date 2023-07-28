import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalItemService {

  private totalItemValue: number = 0;
  private totalItemSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.totalItemValue);

  getTotalItem(): number {
    return this.totalItemValue;
  }

  setTotalItem(value: number): void {
    this.totalItemValue = value;
    this.totalItemSubject.next(value); // Notifica a los suscriptores sobre el cambio
  }

  getTotalItemObservable(): Observable<number> {
    return this.totalItemSubject.asObservable();
  }
}

