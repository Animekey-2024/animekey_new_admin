import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MinLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.trim().length < length) {
      return {
        minlength: {
          requiredLength: length,
        },
      };
    } else {
      return null;
    }
  };
}
