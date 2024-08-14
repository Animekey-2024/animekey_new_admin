import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    AutoFocusDirective,
  ],
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
})
export class NumberComponent {
  @Input() form: any;
  @Input() controlName: any;
  @Input() label?: string;
  @Input() autofocus?: boolean = true;

  ngOnInit(): void {}
}
