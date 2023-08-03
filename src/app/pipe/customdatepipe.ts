import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from "@angular/common";

@Pipe({
  name: 'customDataPipe'
})

/**
 * @since 1.1.0
 * Creation dun custom dite pipe pour formatter datetimepoint
 */
export class CustomDatePipe extends DatePipe implements PipeTransform {

  override transform(value: any, args?: any): any {    
    return super.transform(value*1000, 'dd/MM/YYYY HH:mm');
  }
}