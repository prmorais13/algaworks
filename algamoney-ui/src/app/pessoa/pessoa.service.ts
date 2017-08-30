import { Headers, Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

export class pessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class PessoaService {

  pessoaUrl: string = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: pessoaFiltro): Promise<any> {

    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDQxNDE1MTYsInVzZXJfbmFtZSI6InBybW9yYWlzXzEzQGhvdG1haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiLCJST0xFX1JFTU9WRVJfQ0FURUdPUklBIl0sImp0aSI6Ijc2MWIxMmUxLWRjNDYtNDFiOS04MDg2LTQxYmI3YWMwY2ZkMCIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.bxAk5D4pd4YtiNOEvR97l68nfJ__XjByssPI2g3UIDo');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if(filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}`, { headers: headers, search: params })
      .toPromise()
      .then(response => {
        const resultado = {
          pessoas: response.json().content,
          total: response.json().totalElements
        };

        return resultado;
      });
  }

}
