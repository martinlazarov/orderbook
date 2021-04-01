import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material';

const angularMaterialModules = [
  MatAutocompleteModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [
    AppComponent
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
