import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {UsuarioServiceService} from '../../service/usuario-service.service';
import {UserChart} from '../../model/UserChart';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  userChart = new UserChart();

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Salário Usuário' },
  ];


  constructor(private usuarioService: UsuarioServiceService) { }

  ngOnInit() {
    this.usuarioService.carregarGrafico().subscribe(data => {
      this.userChart = data;

      /* Nomes */
      this.barChartLabels = this.userChart.nome.split(',');

      /* Salarios */
      let arraySalario = JSON.parse('[' + this.userChart.salario + ']');

      this.barChartData = [
        { data: arraySalario, label: 'Salário Usuários'}
      ];
    });
  }

}
