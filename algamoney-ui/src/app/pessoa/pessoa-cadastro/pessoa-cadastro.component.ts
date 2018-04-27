import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { Pessoa, Endereco, Contato } from '../../core/modelo';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { FooterColumnGroup } from 'primeng/components/common/shared';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  formulario: FormGroup;
  estados: any[];
  cidades: any[];
  // estadoSelecionado: number;

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

    this.carregarEstados();

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
        estado: [],
        cidade: []
      }),
      contatos: []
    });
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
      .then(lista => {
        this.estados = lista.map(uf => (
          {
            label: uf.nome, value: uf.codigo
          }
        ));

      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.formulario.get('endereco.estado').value)
      .then(lista => {
        this.cidades = lista.map(cidade => (
          {
            label: cidade.nome, value: cidade.codigo
          }
        ));

      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

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

        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

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
        this.formulario.patchValue(pessoaEncontrada);

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Editando ${this.formulario.get('nome')}`);
  }

  teste() {
    console.log(this.formulario.value);
  }
}
