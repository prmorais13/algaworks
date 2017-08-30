import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { PessoaService, pessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  pessoas = [];
  filtro: pessoaFiltro = new pessoaFiltro();
  totalRegistros = 0;


  constructor (
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {
    // this.pesquisar();
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
