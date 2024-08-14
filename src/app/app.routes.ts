import { Routes } from '@angular/router';
import {
  AUTHENTICATOR,
  NOT_FOUND,
  ONBOARDING,
  VERIFY_CODE,
  VERIFY_OTP,
} from '@constants/routes';
import { AuthGuard } from '@guards/auth/auth.guard';
import { AuthenticatorGuard } from '@guards/authenticator/authenticator.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@components/features/features.routes').then(
        (comp) => comp.FEATURE_ROUTES
      ),
  },
  {
    path: ONBOARDING.path,
    loadChildren: () =>
      import('@components/on-boarding/on-boarding.routes').then(
        (comp) => comp.AUTH_ROUTES
      ),
  },

  {
    path: AUTHENTICATOR.path,
    loadComponent: () =>
      import(
        '@components/on-boarding/mfa/authenticator/authenticator.component'
      ).then((comp) => comp.AuthenticatorComponent),
    canActivate: [AuthenticatorGuard, AuthGuard],
  },
  {
    path: VERIFY_CODE.path,
    loadComponent: () =>
      import('@components/on-boarding/mfa/verify-code/verify-code.component').then(
        (comp) => comp.VerifyCodeComponent
      ),
    canActivate: [AuthenticatorGuard, AuthGuard],
  },
  {
    path: VERIFY_OTP.path,
    loadComponent: () =>
      import(
        '@components/on-boarding/otp-verfication/otp-verification.component'
      ).then((comp) => comp.OtpVerificationComponent),
    canActivate: [AuthenticatorGuard, AuthGuard],
  },
  {
    path: NOT_FOUND.path,
    loadComponent: () =>
      import('@components/not-found/not-found.component').then(
        (comp) => comp.NotFoundComponent
      ),
  },
];
