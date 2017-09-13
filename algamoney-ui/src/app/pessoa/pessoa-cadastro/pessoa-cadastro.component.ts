import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { Pessoa, Endereco } from '../../core/modelo';
import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(response => {
        this.pessoa = response;

        this.toasty.success({
          title: '<strong>INCLUINDO<strong><br>',
          msg: `<strong>${this.pessoa.nome}</strong> adicionado com sucesso!`,
          showClose: false,
          theme: 'bootstrap',
          timeout: 4000
        });

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

}
