import { Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  number: number = 0;

  increment() {
    this.number++;
  }

  decrement() {
    if (this.number > 0) {
      this.number--;
    }
  }

}
