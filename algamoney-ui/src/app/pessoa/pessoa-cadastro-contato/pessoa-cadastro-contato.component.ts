import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Contato } from '../../core/modelo';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  formContato: FormGroup;
  exibindoFormularioContato = false;
  contatoIndex: number;

  constructor(
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
    this.configuraFormContato();
  }

  configuraFormContato() {
    this.formContato = this.fb.group({
      codigo: [],
      nome: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      telefone: []
    });
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contatoIndex = this.contatos.length;
    this.formContato.reset();
  }

  prepararParaEditar(contato: Contato) {
    this.formContato.patchValue(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = this.contatos.indexOf(contato);
  }

  confirmarExclusao(contato: Contato) {
    this.confirmation.confirm({
      message: `Excluir contato <strong>${contato.nome}</strong>?`,
      accept: () => {
        this.removerContato(this.contatos.indexOf(contato));
      }
    });
  }

  removerContato(index: number) {
    this.contatoIndex = index;
    this.contatos.splice(this.contatoIndex, 1);
  }

  confirmarContato() {
    this.contatos[this.contatoIndex] = this.formContato.value;
    this.exibindoFormularioContato = false;
  }

  get editando(): boolean {
    return this.formContato.value && this.formContato.get('codigo').value;
  }
}
