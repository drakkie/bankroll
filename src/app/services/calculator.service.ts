import { Transaction } from './../models/transaction';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { TransactionBankService } from './transaction-bank.service';
import { TransactionCcService } from './transaction-cc.service';
import { ExpenseService } from './expense.service';
import { GoalService } from './goal.service';
import { YearMonthTotals } from '../components/overview/overview.component';
import * as _ from 'lodash';

@Injectable()
export class CalculatorService {

  constructor(
    private bank_service: TransactionBankService,
    private cc_service: TransactionCcService,
    private expense_service: ExpenseService,
    private goal_service: GoalService) {

  }

  remaining_money$ = new BehaviorSubject(0);

  calculateRemainingMoney() {
    Observable
      .zip(
      this.bank_service.transactions$,
      this.cc_service.transactions$,
      this.goal_service.transactions$,
      this.expense_service.transactions$
      )
      .subscribe(results => {
        //assign results
        let bank: YearMonthTotals[];
        let cc: YearMonthTotals[];
        let expense: number;
        let goal: number;
        let income: number;

        //loop through results
        for (let index in results) {
          switch (+index) {
            case 0:
              bank = this.calculateYearMonthTotals(results[index]);
              income = this.calculateAverageIncome(results[index]);
              console.log(income);
              break;
            case 1:
              cc = this.calculateYearMonthTotals(results[index]);
              break;
            case 2:
              expense = this.calculateExpenseGoalMonthTotals(results[index]);
              break;
            case 3:
              goal = this.calculateExpenseGoalMonthTotals(results[index]);
              break;
          }

        }

        //get current year/month
        let current_date = new Date();
        let current_year_month = `${current_date.getFullYear()}-${("0" + (current_date.getMonth() + 1)).slice(-2)}`;

        //calculate money left to spend..
        let left_to_spend = 0;
        let current_bank: number = _.result(_.find(bank, { key: current_year_month }), 'value');
        let current_cc: number = _.result(_.find(cc, { key: current_year_month }), 'value');


        //find a way to set the value to 0 if they are undefined, so calculations still go through
        if (!current_bank) {
          current_bank = 0;
        }

        if (!current_cc) {
          current_cc = 0;
        }

        //get income and put it in!
        this.remaining_money$.next(
          income - (current_bank + current_cc + expense + goal));
      });
  }

  private calculateYearMonthTotals(records: Transaction[]) {
    let totals = [];

    for (let record of records) {
      let date = new Date(record.Date);

      let year_month = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}`;


      if (!_.find(totals, { key: year_month })) {
        totals.push({
          key: year_month,
          value: 0
        });
      }


      _.find(totals, (o) => {
        if (o.key == year_month) {

          if (!record.category) {
            o.value -= record.Amount;
          }
        }
      });
    }

    return totals;
  }

  //todo: create a model for goals and expenses
  private calculateExpenseGoalMonthTotals(records: { frequency: string, amount: number }[]) {
    let amount_per_month = 0;

    for (let record of records) {
      switch (record.frequency) {
        case "Monthly":
          amount_per_month += record.amount;
          break;
        case "Yearly":
          amount_per_month += record.amount / 12;
          break;
      }
    }

    return amount_per_month;
  }

  private calculateAverageIncome(records: Transaction[]) {
    let income = 0;
    //remove current month
    let date = new Date();
    date.setMonth(date.getMonth() - 3);
    //calculate only past 3 months
    

    for (let record of records) {
      if (record.category == "directdeposit"){
        if (new Date(record.Date) > date)
        income += record.Amount
      } 
    }

    return income / 3;
  }
}
