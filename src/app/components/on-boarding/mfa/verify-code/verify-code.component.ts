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
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { OtpVerificationService } from '@components/on-boarding/otp-verfication/services/otp-verification.service';
import { LabelTextComponent } from '@shared/components/label-text/label-text.component';

const materialImports = [
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  ErrorComponent,
  InputErrorPipe,
];

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, ...materialImports, LabelTextComponent],
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit {
  verifyCodeForm!: FormGroup;
  eyeIcon?: boolean = true;
  hide = false;

  authenticatorLogo = 'assets/images/authenticator/google-authenticator.png';
  lockIcon = 'assets/images/logo.svg';
  qrCode = 'assets/images/authenticator/qr-code.png';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private verifyCodeService: OtpVerificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Created Verify Code Form
   */
  createForm(): void {
    this.verifyCodeForm = this.formBuilder.group({
      authenticator: [''],
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
   * Call the verify code api to validate the autenticator code
   * @returns
   */
  onVerify(): void {
    if (this.verifyCodeForm.invalid) {
      return;
    }
    this.verifyCodeForm.disable();
    const code = this.verifyCodeForm.get('otp')?.value;
    this.verifyCodeService.verifyCode(code).subscribe({
      next: () => {
        this.verifyCodeForm.enable();
        this.router.navigate(['/']);
      },
      error: () => {
        this.verifyCodeForm.enable();
      },
    });
  }

  /**
   * Back to the Authenticator scan code screen
   */
  backToSetup(): void {
    const params = {
      qrCode: true,
    };
    this.router.navigate(['/authenticator'], { queryParams: params });
  }
}
