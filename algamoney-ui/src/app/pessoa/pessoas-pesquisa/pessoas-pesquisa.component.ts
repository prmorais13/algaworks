import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [];
  filtro: PessoaFiltro = new PessoaFiltro();
  totalRegistros = 0;
  @ViewChild('tabelaPessoa') grid;


  constructor (
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
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

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: `Excluir <strong>${pessoa.nome}</strong>?`,
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir (pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if(this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success({
          title: 'Exclusão <br>',
          msg: `<strong>${pessoa.nome}</strong> excluída com sucesso!`,
          timeout: 4000,
          showClose: false,
          theme: 'bootstrap'
        });
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  mudarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;
    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';
        pessoa.ativo = novoStatus;

        this.toasty.success({
          title: 'Status <br>',
          msg: `Pessoa <strong>${acao}</strong> com sucesso!`,
          timeout: 4000,
          showClose: false,
          theme: 'bootstrap'
        });
      })
      .catch(erro => this.errorHandler.handler(erro));
  }
}
