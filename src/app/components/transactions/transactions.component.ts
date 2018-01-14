import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Transaction } from './../../models/transaction';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatPaginator } from '@angular/material';
import { TransactionCcService } from '../../services/transaction-cc.service';
import { TransactionBankService } from './../../services/transaction-bank.service';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Observable/';

import * as _ from 'lodash';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  constructor(private transaction_cc_service: TransactionCcService, private transaction_bank_service: TransactionBankService, private route: ActivatedRoute) { }

  transactionType$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  cc_data_source: CreditCardTransactionsDataSource | null;
  bank_data_source: BankTransactionsDataSource | null;
  existing_cc_transactions$: Observable<Transaction[]>;
  existing_bank_transactions$: Observable<Transaction[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.route.data.subscribe(data => { this.transactionType$.next(data.transactionType); console.log(data)});
    
    this.cc_data_source = new CreditCardTransactionsDataSource(this.transaction_cc_service.transactions$, this.paginator);

    this.bank_data_source = new BankTransactionsDataSource(this.transaction_bank_service.transactions$, this.paginator);
  }

  add_cc_transactions(items: any[]) {
    this.transaction_cc_service.add(items);
  }

  add_bank_transactions(items: any[]) {
    this.transaction_bank_service.add(items);
  }
}

export class CreditCardTransactionsDataSource extends DataSource<any> {
  constructor(private transactions$: Observable<Transaction[]>, private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Transaction[]> {
    return this.transactions$;
  }

  disconnect() { }
}


export class BankTransactionsDataSource extends DataSource<any> {
  constructor(private transactions$: Observable<Transaction[]>, private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Transaction[]> {
    return this.transactions$;
  }

  disconnect() { }
}
