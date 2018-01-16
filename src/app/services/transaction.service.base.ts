import { HttpClient } from '@angular/common/http';
import { Transaction } from './../models/transaction';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

export abstract class CrudServiceBase implements ICrud {
  abstract http: HttpClient;

  abstract transaction_type: any;
  transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);

  add(items: any[]) {
    this.http.post(`/${this.transaction_type}`, items).subscribe();
    this.read();
  }
  delete(items: any[]) {
    //using this instead of this.http.delete, since delete does not allow a body - must use generic request
    this.http.request(`delete`, `/${this.transaction_type}`, { body: items })
      .subscribe((result) => { this.read(); });

  }
  update() {
    throw new Error("Method not implemented.");
  }
  read() {
    return this.http.get(`/${this.transaction_type}`).subscribe((ccs: any[]) => {
      this.transactions$.next(ccs);
    });
  }
}

export abstract class TransactionService extends CrudServiceBase implements ICrud {

  abstract http: HttpClient;

  totals$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  earnings$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  read() {
    return this.http.get(`/${this.transaction_type}`).subscribe((ccs: Transaction[]) => {
      this.transactions$.next(ccs);
      this.calculate_year_month_totals();
    });
  }

  calculate_into_array() {
    this.transactions$.subscribe((transactions: Transaction[]) => {
      let totals = [];

      for (let transaction of transactions) {
        let date = new Date(transaction.Date);


        let year_month = `${date.getFullYear()}-${date.getMonth()}`;

        if (totals.findIndex(i => i.yearmonth == year_month) != -1) {
          totals.push({
            year_month: year_month,
            total: 0
          });
        }
      }
    });
  }

  calculate_year_month_totals() {
    this.transactions$
      .subscribe((result: Transaction[]) => {
        let totals = [];
        let earnings = [];

        for (let t of result) {
          let date = new Date(t.Date);

          let year_month = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}`;

          if (!_.find(totals, { key: year_month })) {
            totals.push({
              key: year_month,
              value: 0
            });

            earnings.push({
              key: year_month,
              value: 0
            });
          }

          //TODO: make two arrays in to a single object to improve performance
          _.find(totals, (o) => {
            if (o.key == year_month) {
              if (t.Amount < 0 &&
                //TODO: make ability to link bank transactions as credit card payments, and auto link on new entries
                //excluding chase epay..
                t.Description.toLowerCase().indexOf('epay') == -1 &&
                //excludingchase autopay
                t.Description.toLowerCase().indexOf('autopay') == -1)
                o.value += t.Amount;
            }
          });

          _.find(earnings, (o) => {
            if (o.key == year_month)
              if (t.Amount > 0)
                o.value += t.Amount
          });
        }



        this.totals$.next(totals);
        this.earnings$.next(earnings);
      });
  }
}




export interface ICrud {
  add(item: any);
  delete(item: any);
  update();
  read();
}

