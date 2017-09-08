import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro: LancamentoFiltro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit(): void { }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: `Excluir lançamento <strong>${lancamento.codigo}</strong>?`,
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {

    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {

        if(this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success({
          title: 'Exclusão <br>',
          msg: `Lançamento <strong>${lancamento.codigo}</strong> excluído com sucesso!`,
          timeout: 4000,
          showClose: false,
          theme: 'bootstrap'
        });

        // this.toasty.success(`Lançamento "${lancamento.codigo}" excluído com sucesso!`)
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

}
