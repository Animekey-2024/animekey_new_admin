import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { IPopupData } from '@interface/verify-password.interface';
import { VerifyPasswordService } from './service/verify-password.service';
import { MatIconModule } from '@angular/material/icon';
import { PasswordComponent } from '../password/password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';

const materials = [
  MatFormFieldModule,
  MatDialogModule,
  MatIconModule,
  MatButtonModule,
  ButtonComponent,
];

@Component({
  selector: 'app-verify-password',
  standalone: true,
  imports: [CommonModule, ...materials, ReactiveFormsModule, PasswordComponent],
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.scss'],
})
export class VerifyPasswordComponent {
  hide = true;
  modalData: IPopupData = <IPopupData>{};
  verifyPasswordForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<VerifyPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPopupData,
    private _verifyPasswordService: VerifyPasswordService,
    private _formBuilder: FormBuilder
  ) {
    this.modalData = { ...this.data };
  }

  ngOnInit(): void {
    this.verifyPasswordForm = this._formBuilder.group({
      password: ['', Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  getControl(control: string): FormControl {
    return this.verifyPasswordForm.controls[control] as FormControl;
  }

  /**
   * Get form control from child component and update in the parent based on the control key
   * @param control
   * @param key
   */
  getFormControl(control: FormControl, key: string) {
    this.verifyPasswordForm.controls[key] = control;
  }

  /**
   * Verify user password
   */

  verify() {
    const password = this.verifyPasswordForm.get('password')?.value;
    this._verifyPasswordService.verifyPassword(password).subscribe({
      next: (response) => {
        if (response.result) {
          this.dialogRef.close(response.result);
        }
      },
      error: () => {
        // this.dialogRef.close();
      },
    });
  }
}
