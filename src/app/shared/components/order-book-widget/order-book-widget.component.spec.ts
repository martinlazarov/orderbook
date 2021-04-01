import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { FormatSymbolLabelPipe } from '../../pipes/format-symbol-label.pipe';

import { OrderBookWidgetComponent } from './order-book-widget.component';

@Component({
  selector: 'app-testhost-cmp',
  template: `<app-order-book-widget class="data-tables" *ngIf="selectedSymbol" [data]="data" [symbol]="selectedSymbol">
  </app-order-book-widget>`,
})
export class TestHostComponent {
  data: [];
  selectedSymbol = {
    symbol: 'ethbtc',
    label: 'ETH/BTC'
  };
}

describe('OrderBookWidgetComponent', () => {
  let component: OrderBookWidgetComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      declarations: [OrderBookWidgetComponent, TestHostComponent, FormatSymbolLabelPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.childNodes[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
