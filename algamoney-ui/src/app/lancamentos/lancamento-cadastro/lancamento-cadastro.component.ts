import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { CategoriasService } from '../../categorias/categorias.service';
import { PessoaService } from '../../pessoa/pessoa.service';
import { Lancamento } from '../../core/modelo';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  // lancamento = new Lancamento();
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriasServive: CategoriasService,
    private pessoasServive: PessoaService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.configuraForm();
    const codigoLancamento = this.route.snapshot.params['codigo'];
    this.title.setTitle('Novo lancamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  antesDeEviar(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  configuraForm() {
    this.formulario = this.fb.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [ null, [ Validators.required, Validators.minLength(5) ] ],
      valor: [ null, Validators.required ],
      pessoa: this.fb.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.fb.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: []
    });
  }

  get editando() {
    // return Boolean (this.lancamento.codigo);
    return Boolean (this.formulario.get('codigo').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  adicionarLancamento() {
    // this.lancamentoService.adicionar(this.lancamento)
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamentoAdicionado => {

        this.toasty.success({
          title: '<strong>INCLUINDO...<strong> <br>',
          msg: `Lançamento <strong>${lancamentoAdicionado.descricao}</strong>
            adicionado com sucesso!`,
          timeout: 4000,
          showClose: false,
          theme: 'bootstrap'
        });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  carregarCategorias() {
    this.categoriasServive.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  carregarPessoas() {
    this.pessoasServive.listarPessoas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo}));
      })
      .catch(error => this.errorHandler.handler(error));
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
    // this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      // this.lancamento = lancamento;
      this.formulario.patchValue(lancamento);
      this.atualizarTituloEdicao();

      this.toasty.success({
        title: '<strong>ATUALIZANDO<strong> <br>',
        // msg: `Lançamento <strong>${this.lancamento.descricao}</strong>
        msg: `Lançamento <strong>${this.formulario.get('descricao').value}</strong>
          atualizado com sucesso!`,
        timeout: 4000,
        showClose: false,
        theme: 'bootstrap'
      });

      // form.reset();
      // this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  atualizarTituloEdicao() {
    // this.title.setTitle(`Editando ${this.lancamento.descricao}`);
    this.title.setTitle(`Editando ${this.formulario.get('descricao').value}`);
  }
}
