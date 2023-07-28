import { Component, OnInit } from '@angular/core';
import { TotalItemService } from 'src/app/services/total-item.service';



@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  public totalItem : number = 0;
  constructor(private totalItemService:TotalItemService) { }

  ngOnInit(): void {
    // Suscribirse al Observable del servicio para recibir actualizaciones en totalItem
    this.totalItemService.getTotalItemObservable().subscribe(totalItem => {
      this.totalItem = totalItem;
    });
    // Obtiene el valor actual del totalItem
    this.totalItem = this.totalItemService.getTotalItem();
  }


}
