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
    this.http.post(`/api/${this.transaction_type}`, items).subscribe();
    this.read();
  }
  delete(items: any[]) {
    //using this instead of this.http.delete, since delete does not allow a body - must use generic request
    this.http.request(`delete`, `/api/${this.transaction_type}`, { body: items })
      .subscribe((result) => { this.read(); });

  }
  // update(item: any) {
  //   this.http.request(`put`, `/${this.transaction_type}/${item.id}`, { body: item } )
  //     .subscribe((result) => { this.read(); })
  // }
  update(item: any) {
    console.log(item);
    this.http.request(`put`, `/api/${this.transaction_type}/UpdateByDescription`, { body: item })
      .subscribe((result) => { console.log(result); this.read(); })
  }
  read() {
    return this.http.get(`/api/${this.transaction_type}`).subscribe((ccs: any[]) => {
      this.transactions$.next(ccs);
    });
  }
}

export abstract class TransactionService extends CrudServiceBase implements ICrud {

  abstract http: HttpClient;
  //TODO: Rename to total_spent
  totals$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  earnings$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  expenses$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  read() {
    return this.http.get(`/api/${this.transaction_type}`).subscribe((ccs: Transaction[]) => {
      this.transactions$.next(ccs);
      this.calculate_year_month_totals();
    });
  }


  calculate_year_month_totals() {
    this.transactions$
      .subscribe((result: Transaction[]) => {
        let totals = [];
        let earnings = [];
        let categories = [];

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

          //if category != undefined
          //if key doesnt already exist
          //if category for key doesn't already exist
          if (t.category && t.category != 'directdeposit' && t.category != 'ccpayment' && t.category !='mortgage') {
            let year_month_exists = _.find(categories, { key: year_month, category: t.category });

            if (!year_month_exists) {
              let date_category = { key: year_month, category: t.category, value: 0 };
              categories.push(date_category);
            }
          }


          //TODO: make two arrays in to a single object to improve performance
          //calculate money spent..
          _.find(totals, (o) => {
            if (o.key == year_month) {

              if (!t.category) {
                //exclude if it has a category: Utility/Credit Card Payment
                o.value -= t.Amount;
              }
            }
          });

          //calculate money earned - only consider direct deposit for now
          _.find(earnings, (o) => {
            if (o.key == year_month)
              if (t.category == 'directdeposit')
                o.value += t.Amount;
          });

          //essentially 
          //"SELECT [key] = year_month, category, SUM(Amount) 
          //FROM t 
          //GROUP BY year_month, category"
          _.find(categories, (o) => {
            if (o.key == year_month && o.category == t.category) {
              o.value += t.Amount;
            }
          })
        }

        this.totals$.next(totals);
        this.earnings$.next(earnings);
        this.expenses$.next(categories);
      });
  }
}




export interface ICrud {
  add(item: any);
  delete(item: any);
  update(item: any);
  read();
}

