import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-funcionario-card',
  templateUrl: './funcionario-card.component.html',
  // styleUrls: ['./funcionario-card.component.css']
  styles: [`
    .card-block {
      text-transform: uppercase;
      color: blue;
    }
  `]
})
export class FuncionarioCardComponent {

  @Input() funcionario: any;

  getEstiloCartao(){
    return {
      borderWidth : this.funcionario.id + 'px',
      backgroundColor : this.funcionario.id % 2 === 0 ? 'lightblue' : 'lightgreen'
    };
  }

  isAdmin(){
    return this.funcionario.nome.startsWith('P');
  }

}
