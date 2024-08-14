import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { StorageKeys } from '@models/storage-keys.model';
import { LoaderService } from '@services/loader.service';
import { SnackbarService } from '../services/snackbar.service';
import { StorageService } from '@services/storage.service';
import { Router } from '@angular/router';
import { LOGIN } from '@constants/routes';
import { Language, Platform } from '@enums/login.enum';
import { UtilityService } from '@services/utility.service';
import { ERROR_TOASTS } from '@constants/toast-messages';
import { environment } from 'src/environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  loaderService = inject(LoaderService);
  snackbarService = inject(SnackbarService);
  storageService = inject(StorageService);
  utilityService = inject(UtilityService);
  router = inject(Router);

  username: string = 'ANK_USR';
  password: string = 'ANK_PWD';
  authToken: any;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers: {
      [name: string]: string | string[];
    } = {};

    let req: HttpRequest<unknown>;

    const authToken = this.authService.getAuthToken();
    const mfaToken = this.authService.getMFAToken();

    if (!request.headers.has('Authorization')) {
      headers['Authorization'] =
        'Basic ' + btoa(this.username + ':' + this.password);

      // If mfaToken is available then bind mfaToken in 'Authorization'
      if (mfaToken) {
        headers['Authorization'] = `Bearer ${mfaToken}`;
      }

      // If authToken is available then bind authToken in 'Authorization'
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
    }

    headers['Accept-Language'] = Language.En;
    headers['Timezone'] = this.utilityService.getCurrentTimezone();
    headers['Platform'] = Platform.Web;

    request = request.clone({
      setHeaders: headers,
    });

    req = request.clone({
      setHeaders: headers,
      // setHeaders: { ...headers.keys().reduce((obj, key) => ({ ...obj, [key]: headers.getAll(key) }), {}) }
    });

    return next.handle(req).pipe(
      tap((data) => {
        if (data instanceof HttpResponse) {
          this.loaderService.showLoader.next(false);
        }
      }),

      catchError((error: HttpErrorResponse) => {
        this.loaderService.showLoader.next(false);

        if (error instanceof HttpErrorResponse) {
          if (
            error?.status != 401 &&
            !request.url.includes(StorageKeys.REFRESH_TOKEN)
          ) {
            if (!request.headers.has('Bypass-Interceptor-Snackbar')) {
              this.snackbarService.openErrorToast(error.error.message);
            }
          }

          if (error.status === 501) {
            this.storageService.clearStorage();
            this.router.navigate([LOGIN.fullUrl]);
          }
        }
        if (
          error?.status === 401 &&
          !request.url.includes(StorageKeys.REFRESH_TOKEN)
        ) {
          // If the error is 401 Unauthorized and the request is not a refresh token request
          // Call your authentication service's refresh token method to get a new token

          return this.authService.getAccessToken().pipe(
            switchMap((response) => {
              // Clone the original request and add the new token
              const authRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.result}`,
                },
              });

              // Retry the original request with the new token
              return next.handle(authRequest) as Observable<HttpEvent<unknown>>; // Explicitly specify the return type
            }),

            catchError((refreshError: any) => {
              // Handle refresh token error, e.g., logout the user
              // this.authService.logout();
              this.storageService.clearStorage();
              this.router.navigate([LOGIN.fullUrl]);
              this.snackbarService.openErrorToast(error.error.message);
              return throwError(() => new Error(refreshError.message));
            })
          );
        }

        //For CORS Error handling and Internet not connected related error message
        if (!error.status && navigator.onLine) {
          this.snackbarService.openErrorToast(
            ERROR_TOASTS.INTERNAL_SERVER_ERROR
          );
        } else if (!error.status) {
          this.snackbarService.openErrorToast(
            ERROR_TOASTS.INTERNET_NOT_CONNECTED
          );
        }

        // For any other error status codes or non-authentication related errors, just throw the error

        return throwError(() => error);
      })
    );
  }
}
