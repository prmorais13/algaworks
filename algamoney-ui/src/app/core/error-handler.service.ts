import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {


  constructor(private toasty: ToastyService) { }

  handler(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {

      let errors;
      msg = 'Ocorreu um erro ao processar sua solicitação!';

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
      title: 'Erro <br>',
      msg: `${msg}`,
      timeout: 4000,
      showClose: false,
      theme: 'bootstrap'
    });
  }

}
