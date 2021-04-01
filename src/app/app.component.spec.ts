import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatTableModule } from '@angular/material';
import { AppComponent } from './app.component';
import { OrderBookWidgetComponent } from './shared/components/order-book-widget/order-book-widget.component';
import { FormatSymbolLabelPipe } from './shared/pipes/format-symbol-label.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatAutocompleteModule,
        MatTableModule,
        MatFormFieldModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        OrderBookWidgetComponent,
        FormatSymbolLabelPipe
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
