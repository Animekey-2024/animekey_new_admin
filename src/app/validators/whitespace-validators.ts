import { AbstractControl, ValidationErrors } from '@angular/forms';

export class customValidatos {
  /**
   *
   * @param control its a form control which contains filed value
   * @returns if only whitespace is entered then whitespace error will be true
   */
  static whiteSpaceValidators(
    control: AbstractControl
  ): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }
}
