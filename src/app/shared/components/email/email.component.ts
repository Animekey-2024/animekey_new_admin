import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';
import { ErrorComponent } from '../error/error.component';
import { LabelTextComponent } from '../label-text/label-text.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    AutoFocusDirective,
    InputErrorPipe,
    ErrorComponent,
    LabelTextComponent,
    MatFormFieldModule
  ],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent {
  @Input() form: any;
  @Input() controlName: any;
  @Input() label = '';
  @Input() autofocus?: boolean = true;
  @Input() showError = false;
  @Input() placeHolder = 'placeholder text';
  @Input() isDisabled = false;

  ngOnInit(): void {}
}
