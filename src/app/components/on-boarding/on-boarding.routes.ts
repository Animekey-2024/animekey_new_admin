import { Route, Routes } from '@angular/router';
import {
  LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LINK_EXPIRED,
} from '@constants/routes';
import { AuthGuard } from '@guards/auth/auth.guard';
import { OnBoardingComponent } from './on-boarding.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: OnBoardingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: LOGIN.path,
        pathMatch: 'full',
      },
      {
        path: LOGIN.path,
        loadComponent: () =>
          import('@components/on-boarding/login/login.component').then(
            (comp) => comp.LoginComponent
          ),
      },
      {
        path: FORGOT_PASSWORD.path,
        loadComponent: () =>
          import(
            '@components/on-boarding/forgot-password/forgot-password.component'
          ).then((comp) => comp.ForgotPasswordComponent),
      },
      {
        path: `${RESET_PASSWORD.path}/:token`,
        loadComponent: () =>
          import(
            '@components/on-boarding/reset-password/reset-password.component'
          ).then((comp) => comp.ResetPasswordComponent),
        canActivate: [],
      },
      {
        path: `${LINK_EXPIRED.path}`,
        loadComponent: () =>
          import('@components/on-boarding/expiry-link/expiry-link.component').then(
            (comp) => comp.ExpiryLinkComponent
          ),
      },
    ],
  },
];
