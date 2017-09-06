import { Headers, Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Pessoa } from '../core/modelo';

export class pessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class PessoaService {
  token: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDQ3MDM5NDEsInVzZXJfbmFtZSI6InBybW9yYWlzXzEzQGhvdG1haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiLCJST0xFX1JFTU9WRVJfQ0FURUdPUklBIl0sImp0aSI6IjJmZjFiN2NjLWI4OTktNDZkYi1iZWRlLTM2ODIwMDRjZTRlNSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.f7X-9VOHou4dTZqXc9VyA3FcLu6jNVz9lDWLdeMJUjg';
  pessoaUrl: string = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: pessoaFiltro): Promise<any> {

    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', this.token);

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if(filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(this.pessoaUrl, { headers: headers, search: params })
      .toPromise()
      .then(response => {
        const resultado = {
          pessoas: response.json().content,
          total: response.json().totalElements
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', this.token);

    return this.http.delete(`${this.pessoaUrl}/${codigo}`, { headers: headers })
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo, { headers: headers })
      .toPromise()
      .then(() => null);
  }

  listarPessoas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', this.token);

    return this.http.get(`${this.pessoaUrl}`, { headers: headers })
      .toPromise()
      .then(response => response.json().content);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoaUrl, JSON.stringify(pessoa),
        { headers: headers})
      .toPromise()
      .then(response => response.json());
  }

}
