import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriasService {

  categoriasUrl = 'http://localhost:8080/categorias';
  token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDQ5Mjg5MTQsInVzZXJfbmFtZSI6InBybW9yYWlzXzEzQGhvdG1haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiLCJST0xFX1JFTU9WRVJfQ0FURUdPUklBIl0sImp0aSI6ImU5MjFhYjhjLWQ2YmEtNDNhOS1hNDMyLTg4ZWY0MGI3YTkyZSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.LDNb-jCwhilqgvc_WCY5jMvlHVoaBLS7cDjWJzbeTtw';

  constructor(
    private http: Http
  ) { }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', this.token);

    return this.http.get(`${this.categoriasUrl}`, { headers: headers })
      .toPromise()
      .then(response => response.json());
  }

}