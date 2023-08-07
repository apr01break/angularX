import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private numberRecords = new Subject<number>;
  constructor() { }  

  updateNumberRecords(numberRecords: number) {
    this.numberRecords.next(numberRecords);
  }
  
  getNumberRecord(): Observable<number> {
    return this.numberRecords.asObservable();
  }
}
