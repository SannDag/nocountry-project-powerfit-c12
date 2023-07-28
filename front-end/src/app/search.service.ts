import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchValueSubject = new BehaviorSubject<string>('');
  public searchValue$: Observable<string> = this.searchValueSubject.asObservable();

  setSearchValue(searchValue: string) {
    this.searchValueSubject.next(searchValue);
  }

}
