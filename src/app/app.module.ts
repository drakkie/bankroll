import { GoalService } from './services/goal.service';
import { ExpenseService } from './services/expense.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http';

//custom 
import { AppComponent } from './app.component';

import { TransactionCcService } from './services/transaction-cc.service';
import { TransactionBankService } from './services/transaction-bank.service';
import { TransactionsModule } from './components/transactions/transactions.module';

import { OverviewModule } from './components/overview/overview.module';

import { IeModule } from './components/ie/ie.module';

//material
import { MatTabsModule, MatButtonModule, MatMenuModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    TransactionsModule,
    //  AngularFireModule.initializeApp(environment.firebase, 'bankrolldb'),
    //  AngularFirestoreModule,
    MatTabsModule,
    HttpClientModule,
    OverviewModule,
    IeModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule
  ],
  providers: [ 
    TransactionCcService,
    TransactionBankService,
    ExpenseService,
    GoalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
