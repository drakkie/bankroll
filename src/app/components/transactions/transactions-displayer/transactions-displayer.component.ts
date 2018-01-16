import { Component, OnInit, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-transactions-displayer',
  templateUrl: './transactions-displayer.component.html',
  styleUrls: ['./transactions-displayer.component.css']
})
export class TransactionsDisplayerComponent implements OnInit {

  @Input('Data')
  data_source: any[];
  @Input('Columns')
  displayed_columns: string[];


  
  constructor() { }

  ngOnInit() {
  }

}
