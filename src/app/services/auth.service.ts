import { Injectable, inject } from '@angular/core';
import { StorageKeys } from '@models/storage-keys.model';
import { Observable, of, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';
import { API_URLs } from '@constants/url';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '@interface/common.interface';
import { LOGIN } from '@constants/routes';
import { SUCCESS_TOASTS } from '@constants/toast-messages';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storageService = inject(StorageService);
  httpService = inject(HttpService);
  toast = inject(SnackbarService);
  #router = inject(Router);
  handler = inject(HttpBackend);
  loader = inject(LoaderService);

  /**
   * Get user authentication state
   * @returns
   */
  isAuthenticated(): boolean {
    return !!this.storageService.getFromLocalStorage(StorageKeys.AUTH_TOKEN);
  }

  /**
   * Logout user from the system
   * @returns
   */
  private logoutApi() {
    const headers: {
      [name: string]: string | string[];
    } = {};

    headers['Authorization'] = `Bearer ${this.getRefreshToken()}`;
    return this.httpService.delete(API_URLs.LOGOUT, null, true, headers);
  }

  /**
   * Call the api to get new authToken and refreshToken
   * @returns
   */
  getAccessToken(): Observable<ApiResponse> {
    this.loader.displayLoader();
    const httpClient = new HttpClient(this.handler);
    const url = `${environment.baseUrl}/${API_URLs.REFRESH}`;

    return httpClient
      .get<ApiResponse>(url, {
        headers: {
          Authorization: `Bearer ${this.getRefreshToken()}`,
        },
      })
      .pipe(
        tap((response) => {
          this.loader.hideLoader();
          this.setAuthToken(response.result as string);
        })
      );
  }

  getAuthToken(): string | null {
    return localStorage.getItem(StorageKeys.AUTH_TOKEN);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(StorageKeys.AUTH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(StorageKeys.REFRESH_TOKEN);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, token);
  }

  getMFAToken(): string | null {
    return localStorage.getItem(StorageKeys.MFA_TOKEN);
  }

  setMFAToken(token: string): void {
    localStorage.setItem(StorageKeys.MFA_TOKEN, token);
  }

  getQRCodeUrl(): string | null {
    return localStorage.getItem(StorageKeys.QR_CODE_URL);
  }

  setQRCodeUrl(qrUrl: string): void {
    localStorage.setItem(StorageKeys.QR_CODE_URL, qrUrl);
  }

  /**
   * Logout the use from the platform
   */
  logout(): void {
    this.logoutApi().subscribe({
      next: () => {
        this.storageService.clearStorage();
        this.toast.openSuccessToast(SUCCESS_TOASTS.LOGOUT_SUCCESSFULLY);
        this.#router.navigate([LOGIN.fullUrl]);
      },
      error: (err) => {
        this.toast.openErrorToast(err.error.message);
      },
    });
  }
}
