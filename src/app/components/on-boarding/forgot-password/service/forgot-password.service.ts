import { Injectable } from '@angular/core';
import { API_URLs } from '@constants/url';
import { ApiResponse } from '@interface/common.interface';
import { HttpService } from '@services/http.service';
import { SnackbarService } from '@services/snackbar.service';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(
    private httpService: HttpService,
    private snackbarService: SnackbarService
  ) {}

  /**
   * Send api call for forgot password email link, so user can reset their password
   * @param payload
   * @returns
   */
  forgotPassword(payload: { email: string }): Observable<ApiResponse> {
    return this.httpService.post(API_URLs.FORGET_PASSWORD, payload).pipe(
      tap((response) => {
        const apiResponse = response as ApiResponse;
        this.snackbarService.openSuccessToast(apiResponse.message);
      }),
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }
}
