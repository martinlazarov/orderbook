import { Component, Input } from '@angular/core';
import { DataType } from '../../enums/data-type.enum';
import { PriceSymbolLabel } from '../../enums/price-symbol-label.enum';
import { IBookOrder } from '../../interfaces/book-order';

@Component({
  selector: 'app-order-book-widget',
  templateUrl: './order-book-widget.component.html',
  styleUrls: ['./order-book-widget.component.scss']
})
export class OrderBookWidgetComponent {
  @Input() data;
  @Input() symbol: IBookOrder;

  dataTypeEnum = DataType;
  priceSymbolLabelEnum = PriceSymbolLabel;

  displayedColumns: string[] = ['price', 'quantity', 'total'];

}
