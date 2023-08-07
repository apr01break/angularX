import { Pipe, PipeTransform } from '@angular/core';
import { PaginationService } from '../services/pagination.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  constructor(private paginationService: PaginationService) {    
  }

  transform(value: any, arg: any): any {
    if (!value || !arg)
    {
      this.paginationService.updateNumberRecords(value.length);
      return value;
    }
    const result = [];
    for (const item of value) {
      if (this.checkValues(item, String(arg).toLowerCase())) {
        result.push(item);
      }
    }
    this.paginationService.updateNumberRecords(result.length);
    return result;
  }

  checkValues(item: any, text: string): boolean {
    for (let prop in item) {

      if (item[prop] === null || item[prop] == undefined) {
        continue;
      }
      if (typeof item[prop] === "object") {
        if (this.checkValues(item[prop], text)) {
          return true;
        }
      }
      else if (item[prop].toString().toLowerCase().indexOf(text) > -1) {
        return true;
      }
    }
    return false;
  }

}
