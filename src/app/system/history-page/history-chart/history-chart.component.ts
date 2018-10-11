import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {

	@Input() data;

	onSelect(event) {
    console.log(event);
  }

}
