import { Observable } from 'rxjs/Observable';
import { Transaction } from './../../models/transaction';
import { TransactionCcService } from '../../services/transaction-cc.service';
import { Component, OnInit } from '@angular/core';
import { TransactionBankService } from '../../services/transaction-bank.service';
import 'rxjs/add/observable/zip';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  bank_spending: YearMonthTotals[];
  cc_spending: YearMonthTotals[];

  total_spending: YearMonthTotals[];
  constructor(private transaction_cc_service: TransactionCcService, private transaction_bank_service: TransactionBankService) { }

  ngOnInit() {
    this.transaction_bank_service.totals$.subscribe((bank_transactions: YearMonthTotals[]) => {
      this.bank_spending = bank_transactions;
    });

    this.transaction_cc_service.totals$.subscribe((cc_transactions: YearMonthTotals[]) => {
      this.cc_spending = cc_transactions;
    });

    Observable
      .zip(this.transaction_bank_service.totals$, this.transaction_cc_service.totals$)
      .subscribe(asdf => {console.log(asdf, "hello")});

  }
  



}

export class YearMonthTotals {
  yearMonth: string;
  total: number;
}
