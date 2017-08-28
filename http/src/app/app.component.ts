import { CidadeService } from './cidade.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private cidadeService: CidadeService
  ){}

  cidades = [];

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.cidadeService.consultar()
      .then(dados => {
        this.cidades = dados;
      });
  }

  adicionar(nome: string) {
    this.cidadeService.adicionar({ nome: nome})
      .then(cidade =>  {
        alert(`Cidade "${cidade.nome}" adicionada com código ${cidade.id}`);

        this.consultar();
      });
  }

  excluir(id: number) {
    this.cidadeService.excluir(id)
    .then(() => {
      alert(`Cidade com id ${id} excluída com sucesso!`);

      this.consultar();
    });
  }

  atualizar(cidade: any) {
    this.cidadeService.atualizar(cidade)
      .then(() => {
        alert('Dados alterados com sucesso!');

        this.consultar();
      })
      .catch(erro => {
        alert(erro);
      })
  }
}
