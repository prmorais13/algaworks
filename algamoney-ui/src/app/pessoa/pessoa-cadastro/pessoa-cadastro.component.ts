import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { Pessoa, Endereco, Contato } from '../../core/modelo';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { FooterColumnGroup } from 'primeng/components/common/shared';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  estados: any[];
  cidades: any[];
  pessoa: Pessoa = new Pessoa();
  estadoSelecionado: number;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova pessoa');

    this.carregarEstados();

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
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

    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
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
    return Boolean(this.pessoa.codigo);
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
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

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
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
        this.pessoa = pessoaEncontrada;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
          this.pessoa.endereco.cidade.estado.codigo : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Editando ${this.pessoa.nome}`);
  }

}
