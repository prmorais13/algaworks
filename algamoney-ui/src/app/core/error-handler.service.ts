import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ToastyService } from 'ng2-toasty';

import { NotAuthenticatedError } from '../seguranca/apicurso-http';

@Injectable()
export class ErrorHandlerService {


  constructor(
    private toasty: ToastyService,
    private router: Router
  ) { }

  handler(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof Response && errorResponse.status >= 400
        && errorResponse.status <= 499) {

      let errors;
      msg = 'Ocorreu um erro ao processar sua solicitação!';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar essa ação!';
      }

      try {
        errors = errorResponse.json();
        msg = errors[0].mensagemUsuario;

      } catch (e) {}

      console.error('Ocorreu um erro cara!', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto! Tente novamente.';
      console.error('Ocorreu um erro viu!', errorResponse);
    }

    // this.toasty.error(msg);
    this.toasty.error({
      title: 'ATENÇÃO: <br>',
      msg: `${msg}`,
      timeout: 4000,
      showClose: false,
      theme: 'bootstrap'
    });
  }

}
