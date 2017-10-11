import { Router } from '@angular/router';
import { ErrorHandlerService } from './../error-handler.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../seguranca/auth.service';
import { LogoutService } from '../../seguranca/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private logoutService: LogoutService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }
}
