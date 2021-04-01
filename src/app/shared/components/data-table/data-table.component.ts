import { Component, Input } from '@angular/core';
import { DataType } from '../../enums/data-type.enum';
import { PriceSymbolLabel } from '../../enums/price-symbol-label.enum';
import { IBookOrder } from '../../interfaces/book-order';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() data;
  @Input() symbol: IBookOrder;
  @Input() type: DataType;

  dataTypeEnum = DataType;
  priceSymbolLabelEnum = PriceSymbolLabel;

  displayedColumns: string[] = ['price', 'quantity', 'total'];
}
