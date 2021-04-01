import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { startWith, map } from 'rxjs/operators';

import { IBookOrder } from './shared/interfaces/book-order';
import { DataType } from './shared/enums/data-type.enum';
import { IBookItem } from './shared/interfaces/book-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  symbolsAutocomplete = new FormControl();
  filteredOptions: Observable<IBookOrder[]>;
  altcoins: IBookOrder[] = [];

  dataSourceAsks: IBookItem[];
  dataSourceBids: IBookItem[];
  stream: WebSocketSubject<any>;
  selectedSymbol: IBookOrder;
  dataTypeEnum = DataType;

  constructor() {
    this.dataSourceAsks = [];
    this.dataSourceBids = [];
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

    this.stream = webSocket(`wss://stream.binance.com:9443/ws/${option.symbol}@depth10@10000ms`);
    this.stream.subscribe(
      ({ asks, bids }) => {
        this.dataSourceAsks = asks.map(this.mapBookData);
        this.dataSourceBids = bids.map(this.mapBookData);
      },
      error => console.error(error)
    );
    this.selectedSymbol = option;
  }

  getOptionText(option: IBookOrder): string {
    return option && option.label ? option.label : '';
  }

  private mapBookData(row: string[]): IBookItem {
    const price = parseFloat(row[0]);
    const quantity = parseFloat(row[1]);
    return {
      price: price.toFixed(6),
      quantity: quantity.toFixed(3),
      total: (price * quantity).toFixed(5)
    }
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
