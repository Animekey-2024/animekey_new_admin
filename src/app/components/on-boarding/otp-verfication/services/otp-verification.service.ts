import { Injectable } from '@angular/core';
import { API_URLs } from '@constants/url';
import { MFAPlatform } from '@enums/login.enum';
import { ApiResponse } from '@interface/common.interface';
import { LoginResponse } from '@interface/onboarding-interface';
import { StorageKeys } from '@models/storage-keys.model';
import { AuthService } from '@services/auth.service';
import { HttpService } from '@services/http.service';
import { StorageService } from '@services/storage.service';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OtpVerificationService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  /**
   * Call the API to verify MFA Code
   * @param code
   * @returns
   */
  verifyCode(code: string): Observable<ApiResponse<LoginResponse>> {
    const body = {
      platform: MFAPlatform.GoogleAuth,
      otp: code,
    };
    return this.httpService.put(API_URLs.VERIFY_MFA_CODE, body).pipe(
      tap((response) => {
        this.verifyCodeSuccess(response.result);
      }),
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }

  /**
   * After successful verify code of authenticator save authToken and refreshToken in LocalStorage
   * @param result
   */
  verifyCodeSuccess(
    result: Pick<LoginResponse, 'authToken' | 'refreshToken'>
  ): void {
    this.storageService.removeFromLocalStorage(StorageKeys.MFA_TOKEN);
    this.storageService.removeFromLocalStorage(StorageKeys.QR_CODE_URL);
    this.authService.setAuthToken(result.authToken);
    this.authService.setRefreshToken(result.refreshToken);
  }
}
