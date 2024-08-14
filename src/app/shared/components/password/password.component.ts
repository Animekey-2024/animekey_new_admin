import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';
import { ErrorComponent } from '../error/error.component';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';
import { LabelTextComponent } from '../label-text/label-text.component';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ErrorComponent,
    AutoFocusDirective,
    ErrorComponent,
    InputErrorPipe,
    LabelTextComponent,
  ],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  @Input() form: any;
  @Input() controlName: any;
  @Input() label = '';
  @Input() eyeIcon?: boolean = true;
  @Input() autofocus?: boolean = false;
  @Input() errorKey = 'Password';
  @Input() placeHolder?: string;
  @Input() isShowError = true;

  hide = true;

  constructor() {}

  ngOnInit(): void {}
}
