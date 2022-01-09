import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'regionNamePipe' })
export class regionNamePipe implements PipeTransform {
  transform(str: string) {
    if (str.includes('(')) {
      str = str.slice(0, str.indexOf('(') - 1);
    } else {
      str = str;
    }
  }
}
