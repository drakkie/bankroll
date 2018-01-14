import { TestBed, inject } from '@angular/core/testing';

import { TransactionCcService } from './transaction-cc.service';

describe('TransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionCcService]
    });
  });

  it('should be created', inject([TransactionCcService], (service: TransactionCcService) => {
    expect(service).toBeTruthy();
  }));
});
