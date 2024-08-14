import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  displayLoader() {
    this.showLoader.next(true);
  }

  hideLoader() {
    this.showLoader.next(false);
  }
}
