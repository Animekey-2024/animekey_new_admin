import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Regex } from '@constants/regex';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorComponent } from '@shared/components/error/error.component';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';
import { Router, RouterLink } from '@angular/router';
import { OnboardingLayoutComponent } from '../onboarding-layout/onboarding-layout.component';
import { OtpVerificationService } from './services/otp-verification.service';
import { LOGIN } from '@constants/routes';
import { LabelTextComponent } from '@shared/components/label-text/label-text.component';
import { ICONS } from '@enums/icons.enum';
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';

const materialImports = [
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  ErrorComponent,
  InputErrorPipe,
  OnboardingLayoutComponent,
  RouterLink,
  AutoFocusDirective,
];

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ...materialImports, LabelTextComponent],
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit {
  otpVerificationForm!: FormGroup;
  eyeIcon?: boolean = true;
  logo = 'assets/images/logo.svg';
  hide = false;
  icons = ICONS;
  routes = {
    LOGIN: LOGIN,
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private otpVerificationService: OtpVerificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Created OTP Verification Component
   */
  createForm(): void {
    this.otpVerificationForm = this.formBuilder.group({
      otp: [
        '',
        [
          Validators.required,
          Validators.pattern(Regex.numberOnly),
          Validators.minLength(6),
          Validators.maxLength(6),
        ],
      ],
    });
  }

  /**
   * Call the API to verify the code authenticator code
   */
  onVerify(): void {
    if (this.otpVerificationForm.invalid) {
      return;
    }
    this.otpVerificationForm.disable();
    const code = this.otpVerificationForm.get('otp')?.value;
    this.otpVerificationService.verifyCode(code).subscribe({
      next: () => {
        this.otpVerificationForm.enable();
        this.router.navigate(['/']);
      },
      error: () => {
        this.otpVerificationForm.enable();
      },
    });
  }

  /**
   * Back to the Login Component
   */
  backToSetup(): void {
    this.router.navigate([LOGIN.path]);
  }
}
