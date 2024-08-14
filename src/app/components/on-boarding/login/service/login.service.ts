import { Injectable } from '@angular/core';
import { API_URLs } from '@constants/url';
import { AuthService } from '@services/auth.service';
import { HttpService } from '@services/http.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApiResponse } from '@interface/common.interface';
import { LoginResponse } from '@interface/onboarding-interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}
  
  /**
   * Call the Login API to validate the credentials
   * @param payload
   * @returns
   */
  login(credentials: {
    email: string;
    password: string;
  }): Observable<ApiResponse<LoginResponse>> {
    return this.httpService.post(API_URLs.LOGIN, credentials).pipe(
      tap((response) => {
        this.loginSuccess(response.result);
      }),
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }

  /**
   * After successful login set the mfa token in local storage
   * @param result
   */
  loginSuccess(
    result: Pick<LoginResponse, 'mfaToken' | 'nextStep' | 'platform' | 'qrUrl'>
  ): void {
    this.authService.setMFAToken(result.mfaToken);
    if (result.qrUrl) this.authService.setQRCodeUrl(result.qrUrl);
  }
}
