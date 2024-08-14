import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { API_URLs } from '../../../../constants/url';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyPasswordService {
  constructor(private _httpService: HttpService) {}

  verifyPassword(password: string) {
    const body = { currentPassword: password };
    return this._httpService.post(API_URLs.VERIFY_PASSWORD, body).pipe(
      tap((response) => {
        if (response.result) {
          // this._utilityService.isPasswordAuthenticated = true;
        }
      }),
      catchError((err) => throwError(err))
    );
  }
}
