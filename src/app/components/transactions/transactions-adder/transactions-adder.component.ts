import { MatDialogRef } from '@angular/material';
import { element } from 'protractor';
import { Transaction } from './../../../models/transaction';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';
@Component({
  selector: 'app-transactions-adder',
  templateUrl: './transactions-adder.component.html',
  styleUrls: ['./transactions-adder.component.css']
})
export class TransactionsAdderComponent implements OnInit {

  @Input('ExistingTransactions')
  existing_transactions: Transaction[];

  transactions_input: string;

  @Output()
  transactions_output = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  uploadCsv(event) {
    var reader = new FileReader();

    reader.onload = (f) => {
      this.processCsv(f, this.existing_transactions);
    }

    if (event.target.files && event.target.files[0]) {
      reader.readAsText(event.target.files[0], 'Windows-1252');
    }
  }

  processCsv(event, existing_transactions) {
    let csv = event.target.result;

    //get header rows
    csv = _.replace(csv, '\r', '');
    let rows = csv.split('\n');

    let headers = rows[0].split(',');

    headers.forEach(element => {
      element = element.trim();
    });

    rows.splice(0, 1);

    //get relevant header index
    let description_index = this.findIndex(headers, "Description")
    let amount_index = this.findIndex(headers, "Amount")
    let date_index = this.findIndex(headers, "Trans Date") != -1 ? this.findIndex(headers, "Trans Date") : this.findIndex(headers, "Date");
    let type_index = this.findIndex(headers, "Type");

    let new_transactions: Transaction[] = [];

    //create objects from rows
    for (let row of rows) {
      let transaction_values = row.split(',');

      if (isNaN(+transaction_values[amount_index]))
        continue;

      let new_transaction: Transaction = {
        Amount: +transaction_values[amount_index],
        Date: new Date(transaction_values[date_index]),
        Description: transaction_values[description_index],
        Type: transaction_values[type_index],
        category: null
      }

      new_transactions.push(new_transaction)
    }

    // return this.deduplicate_arrays(new_transactions, existing_transactions)
    this.transactions_output.emit(
      this.deduplicate_arrays(new_transactions, this.existing_transactions)
    );
  }

  findIndex(arr: any[], val: string) {
    return _.findIndex(arr, (header) => { return header === val });
  }
  
  //removes items from first array, if exist in second
  deduplicate_arrays(arr1: any[], arr2: any[]) {
    //does item exist in array?

    let elements_to_remove = [];

    arr1.forEach((item, index) => {
      if (this.exists_in_array(arr2, item)) {
        elements_to_remove.push(index);
      }
    });

    //console.log(elements_to_remove);
    for (let i = elements_to_remove.length; i-- > 0;) {
      arr1.splice(i, 1);
    }

    return arr1;
  }

  exists_in_array(array: any[], object: any) {
    let exists = false;
    let object_to_check = JSON.stringify(object);
    for (let i = 0; i < array.length; i++) {

      let object_in_array = JSON.stringify(array[i]);

      if (object_to_check === object_in_array) {
        exists = true;
        break;
      }
    }
    return exists;
  }

}

