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

  existing_cc_transactions$: Observable<Transaction[]>;
  existing_bank_transactions$: Observable<Transaction[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.route.data.subscribe(data => { this.transactionType$.next(data.transactionType); console.log(data)});
  }

  add_cc_transactions(items: any[]) {
    this.transaction_cc_service.add(items);
  }

  add_bank_transactions(items: any[]) {
    this.transaction_bank_service.add(items);
  }

  onCcChange(item: any){
    this.transaction_cc_service.update(item);
  }

  onBankChange(item: any) {
    this.transaction_bank_service.update(item);
  }
}
