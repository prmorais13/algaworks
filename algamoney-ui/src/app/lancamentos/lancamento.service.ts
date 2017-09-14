import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

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

  lancamentoUrl = 'http://localhost:8080/lancamentos';
  // token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDU0NTU0NTEsInVzZXJfbmFtZSI6InBybW9yYWlzXzEzQGhvdG1haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiLCJST0xFX1JFTU9WRVJfQ0FURUdPUklBIl0sImp0aSI6IjE4MDg4YzkwLWU5ZWUtNDMyMC1hYThlLWE0ZDI0NGEyZDkwOSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.BBpEG1WZ-DYlpBVfBsyvghge7b4-CMvnddjO0VDy2_g';
  token: string;

  constructor(private http: Http) {
    this.token = `Bearer ${environment.token}`;
   }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', this.token);

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
      { headers: headers, search: params })
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
    const headers = new Headers();
    headers.append('Authorization', this.token);

    return this.http.delete(`${this.lancamentoUrl}/${codigo}`, { headers: headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.lancamentoUrl, JSON.stringify(lancamento),
        { headers: headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentoUrl}/${lancamento.codigo}`,
      JSON.stringify(lancamento), { headers: headers })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', this.token);

    return this.http.get(`${this.lancamentoUrl}/${codigo}`,
      { headers: headers})
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
