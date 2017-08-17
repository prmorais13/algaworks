import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/Components/inputtext/inputtext';
import { DataTableModule } from 'primeng/Components/datatable/datatable';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
