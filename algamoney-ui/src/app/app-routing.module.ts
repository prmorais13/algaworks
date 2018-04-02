import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
    { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamento.module#LancamentoModule'},
    { path: 'pessoas', loadChildren: 'app/pessoa/pessoa.module#PessoaModule'},

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'nao-autorizado', component: NaoAutorizadoComponent },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
