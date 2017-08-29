import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LancamentoService {

  lancamentoUrl: string = 'http://localhost:8080/lancamentos';

  constructor(
    private http: Http
  ) { }

  pesquisar(): Promise<any> {
    const headers = new Headers();

    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDM5NzcxMjgsInVzZXJfbmFtZSI6InBybW9yYWlzXzEzQGhvdG1haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiLCJST0xFX1JFTU9WRVJfQ0FURUdPUklBIl0sImp0aSI6ImExNDRmNzM3LTJhYjgtNDhmYy05MmNlLWFiNjJhYjYxZjk3OCIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.Ly3yCu9MXVXIAAfp2ADNl3SvHan8RN4V9BtRtrFc0hc');

    return this.http.get(`${this.lancamentoUrl}?resumo`, { headers: headers })
      .toPromise()
      .then(response => response.json().content);
  }
}
