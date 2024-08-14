import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LOGIN } from '@constants/routes';
import { AuthService } from '@services/auth.service';

export const AdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getAuthToken()) {
    return true;
  } else {
    router.navigate([LOGIN.fullUrl]);
    return false;
  }
};
