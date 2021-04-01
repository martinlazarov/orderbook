import { Pipe, PipeTransform } from '@angular/core';
import { PriceSymbolLabel } from '../enums/price-symbol-label.enum';

@Pipe({
  name: 'formatSymbolLabel'
})
export class FormatSymbolLabelPipe implements PipeTransform {

  transform(value: string, type: PriceSymbolLabel): any {
    const index = type === PriceSymbolLabel.Amount ? 0 : 1;
    return value.split('/')[index];
  }

}
