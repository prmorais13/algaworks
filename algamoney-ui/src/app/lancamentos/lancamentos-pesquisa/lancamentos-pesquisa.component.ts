import { LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [
    /*{ tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2017, 8, 19), dataPagamento: null,
    valor: 4.65, pessoa: 'Padaria Parque Verde'},
    { tipo: 'DESPESA', descricao: 'Compra de frutas', dataVencimento: new Date(2017, 8, 20), dataPagamento: null,
    valor: 8.96, pessoa: 'Mercadinho Parque Verde'},
    { tipo: 'RECEITA', descricao: 'Manutenção micro', dataVencimento: new Date(2017, 8, 20),
    dataPagamento: new Date(2017, 8, 21), valor: 150.00, pessoa: 'Aurino Villa'},
    { tipo: 'DESPESA', descricao: 'Gasolina', dataVencimento: new Date(2017, 8, 19),
    dataPagamento: new Date(2017, 8, 21), valor: 100.00, pessoa: 'Posto Arco Verde'},
    { tipo: 'RECEITA', descricao: 'Salário Prefeitura', dataVencimento: new Date(2017, 8, 18),
    dataPagamento: new Date(2017, 8, 20), valor: 4773.12, pessoa: 'Prefeitura de Natal'},
    { tipo: 'DESPESA', descricao: 'Prestação casa', dataVencimento: new Date(2017, 8, 20), dataPagamento: null,
    valor: 602.25, pessoa: 'Caixa Econômica'},
    { tipo: 'DESPESA', descricao: 'Energia elétrica', dataVencimento: new Date(2017, 8, 26), dataPagamento: null,
    valor: 55.82, pessoa: 'COSERN'}*/
  ]

  constructor(
    private lancamentoService: LancamentoService
  ) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    this.lancamentoService.pesquisar()
      .then(lancamentos => this.lancamentos = lancamentos)
  }

}
