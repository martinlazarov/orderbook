import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { startWith, map } from 'rxjs/operators';

import { IBookOrder } from './shared/interfaces/book-order';
import { DataType } from './shared/enums/data-type.enum';
import { IBookItem } from './shared/interfaces/book-item';
import {
  PRICE_DIGITS,
  QUANTITY_DIGITS,
  STREAM_INTERVAL,
  STREAM_LEVELS,
  STREAM_NAME,
  STREAM_URL,
  TOTAL_DIGITS
} from './shared/configs/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  symbolsAutocomplete = new FormControl();
  filteredOptions: Observable<IBookOrder[]>;
  altcoins: IBookOrder[] = [];

  data: IBookItem[];
  stream: WebSocketSubject<any>;
  selectedSymbol: IBookOrder;
  dataTypeEnum = DataType;

  constructor() {
    this.data = [];
    this.altcoins = [{
      symbol: 'btcusdt',
      label: 'BTC/USDT'
    }, {
      symbol: 'ethbtc',
      label: 'ETH/BTC'
    }];

  }

  ngOnInit() {
    this.filteredOptions = this.symbolsAutocomplete.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onSymbolSelect(option: IBookOrder): void {
    if (this.stream) {
      this.stream.unsubscribe();
      this.stream = null;
    }
    const url = `${STREAM_URL}/${option.symbol}${STREAM_NAME}${STREAM_LEVELS}${STREAM_INTERVAL}`;
    this.stream = webSocket(url);
    this.stream.subscribe(
      ({ asks, bids }) => {
        this.data = [
          ...asks.map((row) => this.mapBookData(row, DataType.Ask)),
          ...bids.map((row) => this.mapBookData(row, DataType.Bid))
        ];
      },
      error => console.error(error)
    );
    this.selectedSymbol = option;
  }

  getOptionText(option: IBookOrder): string {
    return option && option.label ? option.label : '';
  }

  private mapBookData(row: string[], type: DataType): IBookItem {
    const price = parseFloat(row[0]);
    const quantity = parseFloat(row[1]);

    return {
      type,
      price: price.toFixed(PRICE_DIGITS),
      quantity: quantity.toFixed(QUANTITY_DIGITS),
      total: (price * quantity).toFixed(TOTAL_DIGITS),
    };
  }

  private _filter(value): IBookOrder[] {
    if (value.symbol) {
      return [];
    }
    const filterValue = value.toLowerCase();
    const foundItems = this.altcoins.filter((option: IBookOrder) => (option.symbol || '').toLowerCase().indexOf(filterValue) > -1);
    return foundItems || this.altcoins;
  }
}
