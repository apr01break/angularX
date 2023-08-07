import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], args: any): any {
    const result = value.slice(args.pageSize * (args.page - 1), args.pageSize * (args.page));
    return result;
  }

}
