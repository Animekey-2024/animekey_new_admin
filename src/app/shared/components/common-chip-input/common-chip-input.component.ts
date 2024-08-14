import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LabelTextComponent } from '../label-text/label-text.component';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';

@Component({
  selector: 'app-common-chip-input',
  standalone: true,
  imports: [
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    LabelTextComponent,
    InputErrorPipe
  ],
  templateUrl: './common-chip-input.component.html',
  styleUrl: './common-chip-input.component.scss',
})
export class CommonChipInputComponent {
  @Input() form!: FormGroup;
  @Input() controlName: string = '';
  @Input() label: string = '';
  @Input() errorText: string = '';
  @Input() placeholderLabel = '';
  @Input() isDisabled = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (value) {
      const control = this.form.get(this.controlName);
      if (control) {
        const chips = control.value || [];
        chips.push(value);
        control.setValue(chips);
      }
    }

    if (input) {
      input.value = '';
    }
  }

  remove(val: string): void {
    const control = this.form.get(this.controlName);
    if (control) {
      const chips = control.value || [];
      const index = chips.indexOf(val);

      if (index >= 0) {
        chips.splice(index, 1);
        control.setValue(chips);
      }
    }
  }

  edit(val: string, event: MatChipEditedEvent) {
    const control = this.form.get(this.controlName);
    if (control) {
      const chips = control.value || [];
      const index = chips.indexOf(val);

      if (index >= 0) {
        chips[index] = event.value.trim();
        control.setValue(chips);
      }
    }
  }
}
