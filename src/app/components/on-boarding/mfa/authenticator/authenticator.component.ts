import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Regex } from '@constants/regex';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { StorageService } from '@services/storage.service';
import { MatIconModule } from '@angular/material/icon';
import { LOGIN, VERIFY_CODE } from '@constants/routes';
import { Subscription } from 'rxjs';
import { AuthService } from '@services/auth.service';

const materailImports = [
  MatRadioModule,
  MatCardModule,
  MatButtonModule,
  RouterModule,
  MatIconModule,
];
@Component({
  selector: 'app-authenticator',
  standalone: true,
  imports: [CommonModule, ...materailImports],
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss'],
})
export class AuthenticatorComponent implements OnInit, OnDestroy {
  authenticatorLogo = 'assets/images/authenticator/google-authenticator.png';
  lockIcon = 'assets/images/logo.svg';
  qrCode = 'assets/images/authenticator/qr-code.png';
  authToken!: string | null;
  authenticatorForm!: FormGroup;
  enableSetup2Factor: boolean = true;
  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.qrCode = this.authService.getQRCodeUrl() as string;
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params) => {
        if (params['qrCode']) {
          this.enableSetup2Factor = false;
        } else {
          this.enableSetup2Factor = true;
        }
      })
    );
  }

  /**
   * Create Authenticator Form
   */
  createForm(): void {
    this.authenticatorForm = this.formBuilder.group({
      authenticator: [''],
      code: [
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
   * Show hide qr code screen based on true false flag
   */
  setupAuthenticator(): void {
    this.enableSetup2Factor = false;
    const params = {
      qrCode: true,
    };
    this.router.navigate([], { queryParams: params });
  }

  /**
   * Show hide qr code screen based on true false flag
   */
  backToSetupAuthenticator(): void {
    this.enableSetup2Factor = true;
    const params = {
      qrCode: true,
    };
    this.router.navigate([], {});
  }

  /**
   * After scan the code navigate to the Verify Code Component
   */
  onSubmit(): void {
    this.router.navigate([VERIFY_CODE.fullUrl]);
  }

  /**
   * Navigate back to the login page and clear the localStorage data related to the 'mfatoken', whatever handling has been done using localStorage for it.
   */
  backToLogin(): void {
    this.router.navigate([LOGIN.fullUrl]);
    this.storageService.clearStorage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
