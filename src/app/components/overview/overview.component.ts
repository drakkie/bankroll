import { Observable } from 'rxjs/Observable';
import { Transaction } from './../../models/transaction';
import { TransactionCcService } from '../../services/transaction-cc.service';
import { Component, OnInit } from '@angular/core';
import { TransactionBankService } from '../../services/transaction-bank.service';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';
import { ExpenseService } from '../../services/expense.service';
import { GoalService } from '../../services/goal.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  expense_spending: any[];

  expenses;
  goals;

  total_spending: YearMonthTotals[];
  constructor(
    private transaction_cc_service: TransactionCcService,
    private transaction_bank_service: TransactionBankService,
    private calculator_service: CalculatorService
  ) { }

  ngOnInit() {
    this.calculator_service.calculateRemainingMoney();
  }

}

export class YearMonthTotals {
  yearMonth: string;
  total: number;
}
