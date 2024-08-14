import { Injectable } from '@angular/core';
import { API_URLs } from '@constants/url';
import { ApiResponse } from '@interface/common.interface';
import { HttpService } from '@services/http.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private httpService: HttpService) {}

  /**
   * Call the reset-password API to reset the user password
   * @param payload
   * @returns
   */
  resetPassword(payload: {
    resetPasswordToken: string;
    password: string;
  }): Observable<ApiResponse<unknown>> {
    const headers: {
      [name: string]: string | string[];
    } = {};
    headers['Authorization'] = `Bearer ${payload.resetPasswordToken}`;
    const password = { password: payload.password };
    return this.httpService.put(
      API_URLs.RESET_PASSWORD,
      password,
      true,
      headers
    );
  }
}
