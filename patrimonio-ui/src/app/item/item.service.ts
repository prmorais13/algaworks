import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ItemService {

  itensUrl = 'http://localhost:8080/itens';

  constructor(private http: HttpClient) { }

  lista() {
    return this.http.get(this.itensUrl);
  }

}
