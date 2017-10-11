import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { AuthHttp } from 'angular2-jwt';

import { Lancamento } from '../core/modelo';
import { environment } from '../../environments/environment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class LancamentoService {

  lancamentoUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentoUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());


    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`,
      { search: params })
      .toPromise()
      .then(response => {
        const resultado  = {
          lancamentos: response.json().content,
          total: response.json().totalElements
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.lancamentoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.post(this.lancamentoUrl, JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.put(`${this.lancamentoUrl}/${lancamento.codigo}`,
      JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentoUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const lancamento = response.json() as Lancamento;

      this.converterStringsParaDatas([lancamento]);

      return lancamento;
    });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
        'YYYY-MM-DD').toDate();
      }
    }
  }
}
