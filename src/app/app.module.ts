import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material';

import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { FormatSymbolLabelPipe } from './shared/pipes/format-symbol-label.pipe';

const angularMaterialModules = [
  MatAutocompleteModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    FormatSymbolLabelPipe
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
