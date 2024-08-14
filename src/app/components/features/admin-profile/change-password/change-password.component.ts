import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponentComponent } from '@shared/components/header-component/header-component.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { EmailComponent } from '@shared/components/email/email.component';
import { ErrorComponent } from '@shared/components/error/error.component';
import { PasswordComponent } from '@shared/components/password/password.component';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';
import { Regex } from '@constants/regex';
import { StorageService } from '@services/storage.service';

import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validators';
import { AdminProfileService } from '../service/admin-profile.service';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
import { SnackbarService } from '@services/snackbar.service';
import { LabelTextComponent } from '@shared/components/label-text/label-text.component';
import { LOGIN } from '@constants/routes';
import { BUTTON_SLUGS } from '@enums/button-slugs';
import { PasswordStrengthComponent } from '@shared/components/password-strength/password-strength.component';
import { VALIDATION_CRITERIA } from '@constants/validation-criteria';

const ImportedItems = [
  ReactiveFormsModule,
  RouterModule,
  EmailComponent,
  ErrorComponent,
  PasswordComponent,
  ButtonComponent,
  InputErrorPipe,
  MatButtonModule,
  PasswordStrengthComponent,
];
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponentComponent,
    BreadcrumbComponent,
    ...ImportedItems,
    LabelTextComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  title: string = 'Change Password';
  changePasswordForm!: FormGroup;
  hide: boolean = true;
  submitting: boolean = false;
  buttonSlugs = BUTTON_SLUGS;
  #breadCrumbService = inject(BreadcrumbService);
  isPassValid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private adminProfileService: AdminProfileService,
    private router: Router,
    private _toastService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.#breadCrumbService.routerEvents();
  }

  createForm() {
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: ['', Validators.compose([Validators.required])],
        newPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(VALIDATION_CRITERIA.passwordMinLength),
          ]),
        ],
        confirmPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(VALIDATION_CRITERIA.passwordMinLength),
          ]),
        ],
      },
      {
        validator: ConfirmPasswordValidator,
      }
    );
  }

  markPasswordValid(event: boolean) {
    this.isPassValid = event;
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) return;

    const body = this.changePasswordForm.value;
    delete body['confirmPassword'];
    this.changePasswordForm.disable();

    this.adminProfileService.updatePassword(body).subscribe({
      next: (response) => {
        if (response.result) {
          this.changePasswordForm.enable();
          this.storageService.clearStorage();
          this.router.navigate([LOGIN.fullUrl]);
          this._toastService.openSuccessToast(response.message);
        }
      },
      error: (error) => {
        this.changePasswordForm.enable();
        this._toastService.openErrorToast(error.error.message);
      },
    });
  }
}
