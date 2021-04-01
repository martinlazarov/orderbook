import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material';

import { FormatSymbolLabelPipe } from './shared/pipes/format-symbol-label.pipe';
import { OrderBookWidgetComponent } from './shared/components/order-book-widget/order-book-widget.component';

const angularMaterialModules = [
  MatAutocompleteModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [
    AppComponent,
    FormatSymbolLabelPipe,
    OrderBookWidgetComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...angularMaterialModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
