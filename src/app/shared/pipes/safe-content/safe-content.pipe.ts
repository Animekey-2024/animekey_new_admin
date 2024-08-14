import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeStyle,
  SafeScript,
} from '@angular/platform-browser';

@Pipe({ name: 'safeContent', standalone: true })
export class SafeContentPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(
    value: any,
    type: 'html' | 'url' | 'style' | 'script' | 'resourceUrl'
  ): SafeHtml | SafeResourceUrl | SafeStyle | SafeScript {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe content type: ${type}`);
    }
  }
}
