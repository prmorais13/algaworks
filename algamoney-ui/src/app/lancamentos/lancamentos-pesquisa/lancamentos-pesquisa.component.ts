import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";

import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro: LancamentoFiltro = new LancamentoFiltro();
  lancamentos = [];

  constructor(
    private lancamentoService: LancamentoService
  ) {}

  ngOnInit(): void {
    // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
