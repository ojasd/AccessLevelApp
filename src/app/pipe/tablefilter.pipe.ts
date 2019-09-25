import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {
  /**
   *  Filter the table using name
   */
  transform(items: Array<any>, filter: string): Array<any> {
    if (filter === null || filter === undefined) {
      return items;
    } else {
      return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    }
  }
}
