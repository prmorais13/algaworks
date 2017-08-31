import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { ToastyModule } from 'ng2-toasty';
import {ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from "primeng/components/common/confirmationservice";

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { LancamentoModule } from './lancamentos/lancamento.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoa/pessoa.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,

    LancamentoModule,
    PessoaModule,
    CoreModule
  ],
  providers: [
    LancamentoService,
    PessoaService,

    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
