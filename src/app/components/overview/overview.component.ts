import { Observable } from 'rxjs/Observable';
import { Transaction } from './../../models/transaction';
import { TransactionCcService } from '../../services/transaction-cc.service';
import { Component, OnInit } from '@angular/core';
import { TransactionBankService } from '../../services/transaction-bank.service';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/forkJoin';
import { ExpenseService } from '../../services/expense.service';
import { GoalService } from '../../services/goal.service';

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
    private expense_service: ExpenseService,
    private goal_service: GoalService
  ) { }

  ngOnInit() {
    //todo: run both @ same time, then calculate goals + expenses + spending - income = extra spending money
    this.expense_service.transactions$.subscribe((expenses) => this.expenses = expenses);
    this.goal_service.transactions$.subscribe((goals) => this.goals = goals);

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
