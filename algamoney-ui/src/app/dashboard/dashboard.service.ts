import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import * as moment from 'moment';

import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response.json());
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response.json();
        this.converteStringParaData(dados);
        return dados;
      });
  }

  private converteStringParaData(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
