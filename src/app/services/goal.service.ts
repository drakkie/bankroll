import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudServiceBase, ICrud } from './transaction.service.base';

@Injectable()
export class GoalService extends CrudServiceBase implements ICrud {

  transaction_type: any = "goal";
  
    constructor(public http: HttpClient) { 
      super();

      this.read();
    }
}
