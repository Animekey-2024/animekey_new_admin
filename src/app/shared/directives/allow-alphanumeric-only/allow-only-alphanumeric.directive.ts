import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAllowOnlyAlphaNumeric]',
  standalone: true,
})
export class AllowOnlyAlphaNumericDirective {
  appAllowOnlyAlphaNumeric: RegExp = new RegExp(/^[A-Z|a-z|0-9]+$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'Copy', 'Paste'];

  constructor(private el: ElementRef) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.appAllowOnlyAlphaNumeric)) {
      event.preventDefault();
    }
  }
}
