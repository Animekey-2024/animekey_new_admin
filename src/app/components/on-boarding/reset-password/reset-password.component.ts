import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validators';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SnackbarService } from '@services/snackbar.service';
import { ResetPasswordService } from './service/reset-password.service';
import { ErrorComponent } from '@shared/components/error/error.component';
import { PasswordComponent } from '@shared/components/password/password.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';
import { MatButtonModule } from '@angular/material/button';
import { OnboardingLayoutComponent } from '../onboarding-layout/onboarding-layout.component';
import { Regex } from '@constants/regex';
import { LINK_EXPIRED, LOGIN } from '@constants/routes';
import { ICONS } from '@enums/icons.enum';
import { PasswordStrengthComponent } from '@shared/components/password-strength/password-strength.component';
import { HttpErrorResponse } from '@angular/common/http';

const ImportedItems = [
  ReactiveFormsModule,
  RouterModule,
  ErrorComponent,
  PasswordComponent,
  ButtonComponent,
  InputErrorPipe,
  MatButtonModule,
  OnboardingLayoutComponent,
  PasswordStrengthComponent,
];

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ...ImportedItems],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  jwtToken: string;
  resetPasswordForm!: FormGroup;
  hideConfirmPassword = true;
  hideNewPassword = true;
  submitting: boolean = false;
  icons = ICONS;
  routes = {
    LOGIN: LOGIN,
  };
  isPassValid: boolean = false;

  constructor(
    public resetPasswordService: ResetPasswordService,
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    private router: Router
  ) {
    this.jwtToken = this._route.snapshot.params['token'];
  }

  ngOnInit(): void {
    this.createResetPasswordForm();
  }

  /**
   * Create Reset password form
   */
  createResetPasswordForm(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator,
      }
    );
  }

  markPasswordValid(event: boolean) {
    this.isPassValid = event;
  }

  /**
   * Submit Reset Password Form
   * @returns
   */
  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const payload = {
      resetPasswordToken: this.jwtToken,
      password: this.resetPasswordForm.get('confirmPassword')?.value,
    };
    this.resetPasswordForm.disable();
    this.resetPasswordService.resetPassword(payload).subscribe({
      next: (data: any) => {
        this.snackBarService.openSuccessToast(data?.message);
        this.resetPasswordForm.enable();
        this.router.navigate([LOGIN.fullUrl]);
      },
      error: (error: HttpErrorResponse) => {
        this.resetPasswordForm.enable();
        if (error.error.statusCode === 410) {
          this.router.navigate([LINK_EXPIRED.fullUrl]);
        }
      },
    });
  }
}
