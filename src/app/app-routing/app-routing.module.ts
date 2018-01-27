import { IeComponent } from './../components/ie/ie.component';
import { OverviewComponent } from './../components/overview/overview.component';
import { TransactionsComponent } from './../components/transactions/transactions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '',
  //   component: TransactionsComponent,
  //   data: {transactionType: 'cc'}
  // },
  {
    path: '',
    component: TransactionsComponent,
    data: {transactionType: 'cc'},
    pathMatch: 'full'
  },
  {
    path: 'cc',
    component: TransactionsComponent,
    data: {transactionType: 'cc'}
  },
  {
    path: 'bank',
    component: TransactionsComponent,
    data: {transactionType: 'bank'}
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'ie',
    component: IeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
