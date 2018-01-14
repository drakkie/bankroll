import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudServiceBase, ICrud} from './transaction.service.base'

@Injectable()
export class ExpenseService extends CrudServiceBase implements ICrud {

  transaction_type: any = "expense";

  constructor(public http: HttpClient) { 
    super();
    this.read();
  }

}
