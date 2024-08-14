import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICONS } from '@enums/icons.enum';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent {
  @Input('passwd') set password(v: any) {
    this.checkPasswordStrength(v);
  }

  @Output() onPasswordValid = new EventEmitter();
  regexText = {
    number: false,
    special: false,
    lower: false,
    upper: false,
    minimumChar: false,
    complete: false,
  };

  specialCharacterRegex = /[@$%&]/;

  unchecked_radio = ICONS.UNCHECKED_RADIO;
  success = ICONS.CHECKED_RADIO;

  constructor() {}

  checkPasswordStrength(psd: string) {
    this.regexText = {
      number: false,
      special: false,
      lower: false,
      upper: false,
      minimumChar: false,
      complete: false,
    };
    if (psd.match(/[a-z]/g)) {
      this.regexText.lower = true;
    }
    if (psd.match(/[A-Z]/g)) {
      this.regexText.upper = true;
    }
    if (psd.match(/\d/i)) {
      this.regexText.number = true;
    }
    if (psd.match(this.specialCharacterRegex)) {
      this.regexText.special = true;
    }
    if (psd.match(/[+-]/)) {
      this.regexText.special = false;
    }
    if (psd.length >= 8) {
      this.regexText.minimumChar = true;
    }
    if (
      this.regexText.minimumChar &&
      this.regexText.special &&
      this.regexText.number &&
      this.regexText.upper &&
      this.regexText.lower
    ) {
      this.onPasswordValid.emit(true);
    } else {
      this.onPasswordValid.emit(false);
    }
  }
}
