import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { TransactionService } from './transaction.service.base';
import { Transaction } from './../models/transaction';
@Injectable()
export class TransactionBankService extends TransactionService {
  constructor(public http: HttpClient) { super(); this.read(); }
  
  transaction_type = 'bank';
}

