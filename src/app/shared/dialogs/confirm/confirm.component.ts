import { Component, Inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponentComponent } from '@shared/components/header-component/header-component.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { VALIDATION_CRITERIA } from '@constants/validation-criteria';
import { InputErrorPipe } from '../../pipes/input-error/input-error.pipe';
import { InputRefDirective } from '@shared/directives/InputRefDirective/input-ref.directive';

@Component({
  selector: 'app-confirm',
  standalone: true,
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    HeaderComponentComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    InputErrorPipe,
    InputRefDirective,
  ],
})
export class ConfirmComponent {
  image = '';
  headerText = '';
  description = '';
  submitButtonText = 'Ok';
  cancelButtonText = 'Cancel';
  removeCancelBtn: boolean = false;
  title = '';
  showTextBox = false;
  validationCriteria = VALIDATION_CRITERIA;
  deactivateForm!: FormGroup;
  descriptionTemplate!: TemplateRef<any>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ConfirmComponent>,
    private formBuilder: FormBuilder
  ) {
    this.image = this.data.image;
    this.headerText = this.data.headerText;
    this.description = this.data.description;
    this.submitButtonText = this.data.submitButtonText;
    this.removeCancelBtn = this.data.removeCancelBtn;
    this.cancelButtonText = this.data.cancelButtonText;
    this.title = this.data.title;
    this.showTextBox = this.data.showTextBox;
    this.descriptionTemplate = this.data.descriptionTemplate;
  }

  ngOnInit(): void {
    if (this.showTextBox) {
      this.createForm();
    }
  }

  /**
   * Create login form and set validations
   */
  createForm(): void {
    this.deactivateForm = this.formBuilder.group({
      reason: ['', Validators.compose([Validators.required])],
    });
  }

  onCancel() {
    this.ref.close(null);
  }
  onSubmit() {
    if (this.showTextBox) {
      this.ref.close({
        reason: this.deactivateForm.controls['reason'].value.trim(),
      });
    } else {
      this.ref.close(true);
    }
  }
}
