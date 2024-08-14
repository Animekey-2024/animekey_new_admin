import { FormGroup, AbstractControl, FormControl } from '@angular/forms';

export const ConfirmPasswordValidator = (form: AbstractControl) => {
  const password = form.get('newPassword') as FormControl;
  const confirmPassword = form.get('confirmPassword') as FormControl;
  if (password?.value !== confirmPassword?.value) {
    if (confirmPassword?.errors) {
    } else {
      confirmPassword?.setErrors({ passwordNotMatch: true });
    }
  } else {
    if (password?.value === confirmPassword?.value) {
      if (confirmPassword?.errors) {
        delete confirmPassword?.errors['passwordNotMatch'];
        const keys = Object.keys(confirmPassword?.errors);
        if (keys.length === 0) {
          confirmPassword?.setErrors(null);
        }
      }
    }
  }
};
