import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { CategoriasService } from '../../categorias/categorias.service';
import { PessoaService } from '../../pessoa/pessoa.service';
import { Lancamento } from '../../core/modelo';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ]

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriasServive: CategoriasService,
    private pessoasServive: PessoaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar() {
    
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
}
