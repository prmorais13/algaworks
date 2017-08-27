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
    this.cidadeService.consultar()
      .then(dados => {
        this.cidades = dados;
      })
  }




  adicionar(nome: string) {
    alert(nome);
  }

  excluir(id: number) {
    alert(id);
  }

  atualizar(cidade: any) {
    alert(JSON.stringify(cidade))
  }
}
