import { formatCurrency } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number): string {
    return formatCurrency(value, 'en-NG', 'NGN', 'symbol', '1.2-2');
  }

}
