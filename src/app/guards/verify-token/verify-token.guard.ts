import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LINK_EXPIRED } from '@constants/routes';
import { API_URLs } from '@constants/url';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs';

export const verifyTokenGuard: CanActivateFn = (route, state) => {
  const httpService = inject(HttpService);
  const router = inject(Router);
  const token = route.params['token'];
  if (token) {
    return validateResetPasswordToken(token);
  } else {
    return true;
  }

  function validateResetPasswordToken(token: string) {
    return new Observable<boolean>((observer) => {
      httpService.get(`${API_URLs.VALIDATE_TOKEN(token)}`).subscribe(
        (response) => {
          observer.next(true);
          observer.complete();
        },
        (err) => {
          router.navigate([LINK_EXPIRED.fullUrl]);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
};
