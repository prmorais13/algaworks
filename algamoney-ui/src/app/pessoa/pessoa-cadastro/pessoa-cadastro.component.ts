import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { Pessoa, Endereco } from '../../core/modelo';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  // pessoa: Pessoa = new Pessoa();
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.configuraForm();

    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova pessoa');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  configuraForm() {
    this.formulario = this.fb.group({
      codigo: [],
      nome: [ null, [ Validators.required, Validators.minLength(10) ] ],
      ativo: [ true ],
      endereco: this.fb.group({
        logradouro: [ null, Validators.required],
        numero: [ null, Validators.required ],
        complemento: [],
        bairro: [ null, Validators.required ],
        cep: [ null, Validators.required ],
        cidade: [ null, Validators.required ],
        estado: [ null, Validators.required ]
      })
    });
  }

  get editando() {
    // return Boolean(this.pessoa.codigo);
    return Boolean(this.formulario.get('codigo').value);
  }

  // novo (form: FormControl) {
  novo () {
    // form.reset();
    this.formulario.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  // salvar(form: FormControl) {
  salvar() {
    if (this.editando) {
      // this.atualizarPessoa(form);
      this.atualizarPessoa();
    } else {
      // this.adicionarPessoa(form);
      this.adicionarPessoa();
    }
  }

/*   adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa) */
  adicionarPessoa() {
    this.pessoaService.adicionar(this.formulario.value)
      .then(pessoaAdicionada => {

        this.toasty.success({
          title: '<strong>INCLUINDO<strong><br>',
          msg: `<strong>${ pessoaAdicionada.nome }</strong> adicionado com sucesso!`,
          showClose: false,
          theme: 'bootstrap',
          timeout: 4000
        });

        // form.reset();
        // this.pessoa = new Pessoa();
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

/*   atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa) */
  atualizarPessoa() {
    this.pessoaService.atualizar(this.formulario.value)
      .then(pessoaAtualizada => {

        this.atualizarTituloEdicao();

        this.toasty.success({
          title: '<strong>ATUALIZANDO<strong><br>',
          msg: `<strong>${ pessoaAtualizada.nome }</strong> atualizada com sucesso!`,
          showClose: false,
          theme: 'bootstrap',
          timeout: 4000
        });
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoaEncontrada => {
        // this.pessoa = pessoaEncontrada;
        this.formulario.patchValue(pessoaEncontrada);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizarTituloEdicao() {
    // this.title.setTitle(`Editando ${ this.pessoa.nome }`);
    this.title.setTitle(`Editando ${this.formulario.get('nome')}`);
  }

}
