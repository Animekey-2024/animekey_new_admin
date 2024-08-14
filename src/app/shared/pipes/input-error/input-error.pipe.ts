import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { Regex } from '@constants/regex';
import { ERROR_TYPES } from '@enums/error-types';

@Pipe({
  name: 'inputError',
  standalone: true,
  pure: false,
})
export class InputErrorPipe implements PipeTransform {
  transform(
    form: FormGroup,
    control: string,
    label: string,
    isAllowDigitsOnly?: boolean,
    inputType = 'text'
  ): string {
    if (form.get(control)?.touched && form.get(control)?.invalid) {
      const errors = form.get(control)?.errors;
      if (errors?.hasOwnProperty('required')) {
        return `Please ${
          inputType == 'dropdown' ? 'select' : 'enter'
        } ${label}`;
      } else if (errors?.hasOwnProperty('minlength')) {
        return `${label} should be more than ${
          errors['minlength']['requiredLength']
        } ${isAllowDigitsOnly ? 'digits' : 'characters'}`;
      } else if (errors?.hasOwnProperty('maxlength')) {
        return `Only ${errors['maxlength']['requiredLength']} ${
          isAllowDigitsOnly ? 'digits' : 'characters'
        } allowed`;
      } else if (errors?.hasOwnProperty('min')) {
        return `${label} should be greater than ${errors['min']['min']}`;
      } else if (errors?.hasOwnProperty('max')) {
        return `${label} should be less than ${errors['max']['max']}`;
      } else if (errors?.hasOwnProperty('pattern')) {
        if (
          control === 'password' ||
          control === 'confirmPassword' ||
          control === 'oldPassword'
        ) {
          return `${label} must be between 8-15 characters and have at-least 1 upper case, 1 lower case, 1 special character [@,$,%,&] & 1 numeric value`;
        } else {
          let pattern = errors['pattern']['requiredPattern'];
          return this.PATTERN_ERRORS(pattern, label);
        }
      } else if (errors?.hasOwnProperty('passwordNotMatch')) {
        return `New Password and Confirm Password should be same`;
      } else if (
        form.controls[control].hasError('whitespace') ||
        form.controls[control].hasError('required')
      ) {
        return `Whitespace is not allowed`;
      }
    }
    return '';
  }

  PATTERN_ERRORS(pattern: any, key: string) {
    let comment!: string;
    if (pattern == Regex.email) {
      comment = `${key} is invalid or not in correct format`;
    } else if (pattern == Regex.name) {
      comment = `${key} is not valid`;
    } else if (pattern == Regex.characterOnly) {
      comment = `No special characters and numbers will be allowed`;
    } else if (pattern == Regex.phone) {
      comment = `${key} can contain only digits`;
    } else if (pattern == Regex.PASSWORD) {
      comment = `${key} must be between 8-15 characters and have at-least 1 upper case, 1 lower case, 1 special character [@,$,%,&] & 1 numeric value`;
    } else if (pattern == Regex?.URL) {
      return `Not a valid ${key}`;
    }
    return comment;
  }
}
