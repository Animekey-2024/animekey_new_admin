import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmailComponent } from '@shared/components/email/email.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';
import { MatButtonModule } from '@angular/material/button';
import { Regex } from '@constants/regex';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ForgotPasswordService } from './service/forgot-password.service';
import { OnboardingLayoutComponent } from '../onboarding-layout/onboarding-layout.component';
import { LOGIN } from '@constants/routes';
import { ICONS } from '@enums/icons.enum';

const ImportedItems = [
  ReactiveFormsModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  RouterModule,
  EmailComponent,
  ButtonComponent,
  InputErrorPipe,
  MatButtonModule,
  OnboardingLayoutComponent,
];

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ...ImportedItems],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  showSpinner = false;
  resetLinkLabel = 'Send Password Reset Link';
  icons = ICONS;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.createForgotPasswordForm();
  }

  ngOnInit(): void {}

  /**
   * Created Forget password for with validation
   */
  createForgotPasswordForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Regex.email)]],
    });
  }

  /**
   * On Forget password form submit
   * @returns
   */
  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.forgotPasswordForm.disable();
    this.forgotPasswordService
      .forgotPassword(this.forgotPasswordForm.value)
      .subscribe({
        next: (response) => {
          if (response.result as boolean) {
            this.resetLinkLabel = 'Resend Password Reset Link';
          }
          this.forgotPasswordForm.enable();
        },
        error: () => {
          this.forgotPasswordForm.enable();
        },
      });
  }

  backToLogin(): void {
    this.router.navigate([LOGIN.fullUrl]);
  }
}
