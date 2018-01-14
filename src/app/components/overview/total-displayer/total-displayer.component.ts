import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-total-displayer',
  templateUrl: './total-displayer.component.html',
  styleUrls: ['./total-displayer.component.css']
})
export class TotalDisplayerComponent implements OnInit {

  constructor() { }

  @Input()
  yearMonthTotals: any[];

  get totals() {
    let total = 0;

    for (let ymt of this.yearMonthTotals){
      total += ymt.value;
    }

    return total;
  }
  ngOnInit() {
  }

  //add method to sum totals up..

  //show in datatable??

}
