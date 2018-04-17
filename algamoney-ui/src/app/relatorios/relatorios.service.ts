import { Injectable } from '@angular/core';
import { ResponseContentType, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class RelatoriosService {

  lancamento: String;

  constructor(private http: AuthHttp) {
    this.lancamento = `${environment.apiUrl}/lancamentos`;
   }

  relatorioLancamentosPorPessoa(dataInicio: Date, dataFinal: Date) {
    const params = new URLSearchParams();
    params.set('dataInicio', moment(dataInicio).format('YYYY-MM-DD'));
    params.set('dataFinal', moment(dataFinal).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamento}/relatorios/por-pessoa`,
      { search: params, responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob());
   }

}
