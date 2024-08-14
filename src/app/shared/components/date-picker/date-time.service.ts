import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateTimeService {
  private _format: string;
  private _locale: string;

  constructor() {
    this._format = 'MMM DD, YYYY';
    this._locale = 'en-US';
  }

  get format(): string {
    return this._format;
  }
  set format(value: string) {
    this._format = value;
  }

  get locale(): string {
    return this._locale;
  }
  set locale(value: string) {
    this._locale = value;
  }
}
