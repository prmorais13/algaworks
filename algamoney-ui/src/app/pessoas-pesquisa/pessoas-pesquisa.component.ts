import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    { nome: 'Paulo Roberto', cidade: 'Parnamirim', estado: 'RN', ativo: true},
    { nome: 'Patrícia Nunes', cidade: 'Parnamirim', estado: 'RN', ativo: false},
    { nome: 'Maria Fernanda', cidade: 'Parnamirim', estado: 'RN', ativo: true},
    { nome: 'Polliana Éricka', cidade: 'Natal', estado: 'RN', ativo: false},
    { nome: 'Diogo Gomes', cidade: 'Natal', estado: 'RN', ativo: false},
    { nome: 'Ana Paula', cidade: 'Natal', estado: 'RN', ativo: true},
    { nome: 'Paulo Ricardo', cidade: 'Natal', estado: 'RN', ativo: true}
  ]

}
