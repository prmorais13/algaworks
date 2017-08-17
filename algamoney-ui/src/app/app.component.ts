import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '17/08/2017', dataPagamento: null,
      valor: 4.65, pessoa: 'Padaria Parque Verde'},
    { tipo: 'DESPESA', descricao: 'Compra de frutas', dataVencimento: '17/08/2017', dataPagamento: null,
      valor: 8.96, pessoa: 'Mercadinho Parque Verde'},
    { tipo: 'RECEITA', descricao: 'Manutenção micro', dataVencimento: '13/08/2017', dataPagamento: '17/08/2017',
      valor: 150.00, pessoa: 'Aurino Villa'},
    { tipo: 'DESPESA', descricao: 'Gasolina', dataVencimento: '17/08/2017', dataPagamento: '17/08/2017',
      valor: 100.00, pessoa: 'Posto Arco Verde'},
    { tipo: 'RECEITA', descricao: 'Salário Prefeitura', dataVencimento: '30/07/2017', dataPagamento: '11/08/2017',
      valor: 4773.12, pessoa: 'Prefeitura de Natal'},
    { tipo: 'DESPESA', descricao: 'Prestação casa', dataVencimento: '20/08/2017', dataPagamento: null,
      valor: 602.25, pessoa: 'Caixa Econômica'},
    { tipo: 'DESPESA', descricao: 'Energia elétrica', dataVencimento: '26/08/2017', dataPagamento: null,
      valor: 55.82, pessoa: 'COSERN'}
  ]
}
