import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from "primeng/components/common/api";
import { ToastyService } from "ng2-toasty";

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
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService
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

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: `Excluir lançamento ${lancamento.codigo}?`,
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
          title: "Exclusão de lançamentos",
          msg: `Lançamento ${lancamento.codigo} excluído com sucesso!`,
          timeout: 4000,
          showClose: false,
          theme: "bootstrap"
        });

        //this.toasty.success(`Lançamento "${lancamento.codigo}" excluído com sucesso!`)
      });
  }

}
