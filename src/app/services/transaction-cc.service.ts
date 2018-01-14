import { Injectable } from '@angular/core';
import { TransactionService } from './transaction.service.base';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionCcService extends TransactionService {
  constructor(public http: HttpClient) { super(); this.read(); }

  transaction_type = 'cc';
}

