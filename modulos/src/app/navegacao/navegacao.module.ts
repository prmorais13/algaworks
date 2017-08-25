import { BotaoGrandeComponent } from './../botoes/botao-grande/botao-grande.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotoesModule } from './../botoes/botoes.module';

import { MenuComponent } from './menu/menu.component';
import { LinhaComponent } from './linha/linha.component';

@NgModule({
  imports: [
    CommonModule,
    BotoesModule
  ],
  declarations: [
    MenuComponent,
    LinhaComponent
  ],
  exports: [
    MenuComponent,
    BotoesModule
  ]
})
export class NavegacaoModule { }
