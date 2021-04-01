import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { startWith, map } from 'rxjs/operators';

export interface IBookOrder {
  subject: WebSocketSubject<any>;
  symbol: string;
  label: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myControl = new FormControl();
  filteredOptions: Observable<IBookOrder[]>;
  altcoins: IBookOrder[] = [];

  displayedColumns: string[] = ['price', 'amount', 'total'];
  dataSource = [];

  constructor() {
    this.altcoins = [{
      subject: null,
      symbol: 'btcusdt',
      label: 'BTC/USDT'
    }, {
      subject: null,
      symbol: 'ethbtc',
      label: 'ETH/BTC'
    }];
    this.altcoins.forEach((coin) => {

      coin.subject = webSocket(`wss://stream.binance.com:9443/ws/${coin.symbol}@depth10@100ms`);

      coin.subject.subscribe(
        data => {
          console.log('>>>data', data)
        }, // Called whenever there is a message from the server.
        err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        () => console.log('complete') // Called when connection is closed (for whatever reason).
      );
      setTimeout(() => {
        coin.subject.unsubscribe();
      }, 3500)
    })
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  getOptionText(option: IBookOrder): string {
    return option && option.label ? option.label : '';
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
/**
 * E: 1617270514078
U: 2839718066
a: (13) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]
b: (14) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]
e: "depthUpdate"
s: "ETHBTC" / symbol
u: 2839718109 /

 */
/**
 * {
  "u":400900217,     // order book updateId
  "s":"BNBUSDT",     // symbol
  "b":"25.35190000", // best bid price
  "B":"31.21000000", // best bid qty
  "a":"25.36520000", // best ask price
  "A":"40.66000000"  // best ask qty
}
 */
