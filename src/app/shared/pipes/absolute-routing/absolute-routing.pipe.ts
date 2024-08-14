import { Pipe, PipeTransform } from '@angular/core';
import * as routes from '@constants/routes';

@Pipe({
  name: 'absolutePath',
  standalone: true,
})
export class AbsoluteRoutingPipe implements PipeTransform {
  transform(route: string, id?: string) {
    try {
      if (id) {
        return (<any>routes)[route].fullUrl(id);
      }
      return (<any>routes)[route].fullUrl;
    } catch (error) {
      return '';
    }
  }
}
