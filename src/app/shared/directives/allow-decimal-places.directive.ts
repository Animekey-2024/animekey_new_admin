import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAllowDecimalPlcaes]',
  standalone: true,
})
export class AllowDecimalPlcaesDirective {
  @Input() regex: RegExp = new RegExp(/^\d*\.?\d{0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'Copy', 'Paste'];

  constructor(private el: ElementRef) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
