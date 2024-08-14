import { AbstractControl } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {
  const value = control.value.trim();
  if (value.length > 0) {
    try {
      new URL(value);
      return null;
    } catch {
      return { validUrl: true };
    }
  }
  return null;
}
