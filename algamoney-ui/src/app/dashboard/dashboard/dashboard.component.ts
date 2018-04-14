import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.configuraGraficoPizza();
    this.configurarGraficoLinha();
  }

  configuraGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: [
                '#FF9900', '#109618', '#990099', '#3B3EAC',
                '#0099C6', '#3366CC', '#DC3912'
              ]
            }
          ]
        };
      });
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia()
      .then(dados => {
        const diasDoMes = this.configurarDiasMes();

        const totaisReceita = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);

          const totaisDespesa = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceita,
              borderColor: '#3366CC'
            },
            {
              label: 'Despesas',
              data: totaisDespesa,
              borderColor: '#D62B00'
            }
          ]
        };
      });
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];

    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }

    return totais;
  }

  configurarDiasMes(): Array<number> {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const numDiasMes: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      numDiasMes.push(i);
    }

    return numDiasMes;
  }
}
