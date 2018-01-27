import { Transaction } from './../../../models/transaction';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-transactions-toolbar',
  templateUrl: './transactions-toolbar.component.html',
  styleUrls: ['./transactions-toolbar.component.css']
})
export class TransactionsToolbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input()
  ExistingTransactions: Transaction[];

  @Output()
  onAdd = new EventEmitter();

  ngOnInit() {
  }

  onAddClick() {
    let dialogRef = this.dialog.open(TransactionsAddDialog);
    dialogRef.componentInstance.ExistingTransactions = this.ExistingTransactions;
    const sub = dialogRef.componentInstance.onAdd.subscribe((fileData) => {
      this.onAdd.emit(fileData);
    });

    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }


}


@Component({
  selector: 'app-transactions-add-dialog',
  templateUrl: './app-transactions-add-dialog.html'
})
export class TransactionsAddDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<TransactionsAddDialog>) {}
  public ExistingTransactions: Transaction[];

  @Output()
  onAdd = new EventEmitter();

  ngOnInit() { }



  onCancelClick() {
    this.dialogRef.close();
  }


  onAddClick(event) {
    var reader = new FileReader();

    reader.onload = (f) => {
      this.processCsv(f, this.ExistingTransactions);
    }

    if (event.target.files && event.target.files[0]) {
      reader.readAsText(event.target.files[0], 'Windows-1252');
    }

    this.dialogRef.close();
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
    this.onAdd.emit(
      this.deduplicate_arrays(new_transactions, existing_transactions)
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
      delete array[i].id;
      let object_in_array = JSON.stringify(array[i]);

      if (object_to_check === object_in_array) {
        exists = true;
        break;
      }
    }
    return exists;
  }
}
