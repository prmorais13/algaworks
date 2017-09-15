import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CategoriasService {

  categoriasUrl = 'http://localhost:8080/categorias';
  token: string;

  constructor(private http: AuthHttp) { }

  listarTodas(): Promise<any> {

    return this.http.get(`${this.categoriasUrl}`)
      .toPromise()
      .then(response => response.json());
  }

}
