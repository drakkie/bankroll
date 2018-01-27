import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-total-displayer',
  templateUrl: './total-displayer.component.html',
  styleUrls: ['./total-displayer.component.css']
})
export class TotalDisplayerComponent implements OnInit {

  constructor() { }

  @Input()
  yearMonthTotals: any[];
  chart = new Chart({});


  get totals() {
    let total = 0;

    for (let ymt of this.yearMonthTotals) {
      total += ymt.value;
    }
    return total;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    //categories
    let categories = [];

    //series
    let seriesData = [];

    for (let kvp of this.yearMonthTotals) {
      categories.push(kvp.key);
      seriesData.push(kvp.value);
    }


    let chart = new Chart({
      title: {
        text: ''
      },
      chart: {
        type: 'line'
      },
      xAxis: {
        categories: categories
      },
      series: [{
        name: 'Year-Date',
        data: seriesData
      }]
    });

    this.chart = chart;
  }

  //add method to sum totals up..

  //show in datatable??

}
