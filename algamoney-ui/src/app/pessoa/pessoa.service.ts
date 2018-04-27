import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Pessoa, Estado, Cidade } from '../core/modelo';
import { AuthHttp } from 'angular2-jwt';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class PessoaService {

  pessoaUrl: string;
  cidadeUrl: string;
  estadoUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoaUrl = `${environment.apiUrl}/pessoas`;
    this.cidadeUrl = `${environment.apiUrl}/cidades`;
    this.estadoUrl = `${environment.apiUrl}/estados`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(this.pessoaUrl, { search: params })
      .toPromise()
      .then(response => {
        const resultado = {
          pessoas: response.json().content,
          total: response.json().totalElements
        };

        return resultado;
      });
  }

  listarPessoas(): Promise<any> {

    return this.http.get(`${this.pessoaUrl}`)
    .toPromise()
    .then(response => response.json().content);
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {

    return this.http.get(`${ this.pessoaUrl }/${ codigo }`)
    .toPromise()
    .then(response => response.json());
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {

    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo)
    .toPromise()
    .then(() => null);
  }


  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.post(this.pessoaUrl, JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.put(`${ this.pessoaUrl }/${ pessoa.codigo }`,
    JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json());
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get(this.estadoUrl)
      .toPromise()
      .then(estados => estados.json());
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new URLSearchParams();
    params.set('estado', estado);

    return this.http.get(this.cidadeUrl, { search: params })
      .toPromise()
      .then(cidades => cidades.json());
  }

}
