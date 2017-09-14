import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(private http: Http) { }

  login(usuario: string, senha: string): Promise<void> {

    const headres = new Headers();
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers: headres })
      .toPromise()
      .then(() => {

      });
  }

}
