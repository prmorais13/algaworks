import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class CategoriasService {

  categoriasUrl = 'http://localhost:8080/categorias';
  // token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDU0NTU0NTEsInVzZXJfbmFtZSI6InBybW9yYWlzXzEzQGhvdG1haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiLCJST0xFX1JFTU9WRVJfQ0FURUdPUklBIl0sImp0aSI6IjE4MDg4YzkwLWU5ZWUtNDMyMC1hYThlLWE0ZDI0NGEyZDkwOSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.BBpEG1WZ-DYlpBVfBsyvghge7b4-CMvnddjO0VDy2_g';
  token: string;

  constructor(private http: Http) {
    this.token = `Bearer ${environment.token}`;
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', this.token);

    return this.http.get(`${this.categoriasUrl}`, { headers: headers })
      .toPromise()
      .then(response => response.json());
  }

}
