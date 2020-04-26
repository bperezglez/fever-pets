import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new Subject<any>();

  loadingState = this.loadingSubject.asObservable();
  constructor() { }

  show() {
    this.loadingSubject.next({show: true});
  }

  hide() {
    this.loadingSubject.next({show: false});
  }
}
