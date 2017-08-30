import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

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

    LancamentoModule,
    PessoaModule,
    CoreModule
  ],
  providers: [
    LancamentoService,
    PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
