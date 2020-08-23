import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: string): string {
    const age = parseInt(value)
    if (!age) return value;
    return  age > 1 ? `${value} years old` : `${value} year old`;
  }
}
