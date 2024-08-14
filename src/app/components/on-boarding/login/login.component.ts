import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './service/login.service';
import { Regex } from '@constants/regex';
import { EmailComponent } from '@shared/components/email/email.component';
import { ErrorComponent } from '@shared/components/error/error.component';
import { PasswordComponent } from '@shared/components/password/password.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';
import { MatButtonModule } from '@angular/material/button';
import { StorageService } from '@services/storage.service';
import { OnboardingLayoutComponent } from '../onboarding-layout/onboarding-layout.component';
import { AUTHENTICATOR, FORGOT_PASSWORD, VERIFY_OTP } from '@constants/routes';
import { NextStep } from '@enums/login.enum';
import { LabelTextComponent } from '@shared/components/label-text/label-text.component';
import { LoginResponse } from '@interface/onboarding-interface';
import { ICONS } from '@enums/icons.enum';

const ImportedItems = [
  ReactiveFormsModule,
  RouterModule,
  EmailComponent,
  ErrorComponent,
  PasswordComponent,
  ButtonComponent,
  InputErrorPipe,
  MatButtonModule,
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ...ImportedItems,
    OnboardingLayoutComponent,
    LabelTextComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitting: boolean = false;
  routes = {
    FORGET_PASSWORD: FORGOT_PASSWORD,
  };
  icons = ICONS;
  result!: LoginResponse;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.storageService.clearStorage();
  }

  /**
   * Create login form and set validations
   */
  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(Regex.email),
        ]),
      ],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Submit login form to call api to validate user credentials
   * @returns
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginForm.disable();
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.result = response.result;
        if (this.result.nextStep === NextStep.Verify) {
          this.router.navigate([VERIFY_OTP.fullUrl]);
          return;
        }
        this.loginForm.enable();
        this.router.navigate([AUTHENTICATOR.fullUrl]);
      },
      error: () => {
        this.loginForm.enable();
      },
    });
  }
}
