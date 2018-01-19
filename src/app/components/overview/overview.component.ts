import { Observable } from 'rxjs/Observable';
import { Transaction } from './../../models/transaction';
import { TransactionCcService } from '../../services/transaction-cc.service';
import { Component, OnInit } from '@angular/core';
import { TransactionBankService } from '../../services/transaction-bank.service';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  bank_spending: YearMonthTotals[];
  cc_spending: YearMonthTotals[];
  expense_spending: any[];

  total_spending: YearMonthTotals[];
  constructor(private transaction_cc_service: TransactionCcService, private transaction_bank_service: TransactionBankService) { }

  ngOnInit() {
    this.transaction_bank_service.totals$.subscribe((bank_transactions: YearMonthTotals[]) => {
      this.bank_spending = bank_transactions;
    });

    this.transaction_cc_service.totals$.subscribe((cc_transactions: YearMonthTotals[]) => {
      this.cc_spending = cc_transactions;
    });

    this.combineExpenses();
  }

  combineExpenses() {
    let bank = this.transaction_bank_service.expenses$.getValue();
    let cc = this.transaction_cc_service.expenses$.getValue();

    this.expense_spending = bank.concat(cc);


  }




}

export class YearMonthTotals {
  yearMonth: string;
  total: number;
}
