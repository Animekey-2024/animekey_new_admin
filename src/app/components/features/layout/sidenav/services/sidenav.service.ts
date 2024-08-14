import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  constructor() {}

  sidenavOpened = new EventEmitter<boolean>();

  toggleSidenav(opened: boolean) {
    this.sidenavOpened.emit(opened);
  }
}
