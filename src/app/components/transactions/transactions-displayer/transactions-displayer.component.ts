import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output('onChange')
  change = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
  }

  onChange(id: any, field_to_update: any, data: any){
    this.change.emit({id: id, field_to_update: field_to_update, value: data.value});
  }

}
