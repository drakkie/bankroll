import { TestBed, inject } from '@angular/core/testing';

import { TransactionBankService } from './transaction-bank.service';

describe('TransactionBankService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionBankService]
    });
  });

  it('should be created', inject([TransactionBankService], (service: TransactionBankService) => {
    expect(service).toBeTruthy();
  }));
});
