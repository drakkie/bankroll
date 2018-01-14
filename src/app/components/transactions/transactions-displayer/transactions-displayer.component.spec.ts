import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsCcComponent } from './transactions-cc.component';

describe('TransactionsCcComponent', () => {
  let component: TransactionsCcComponent;
  let fixture: ComponentFixture<TransactionsCcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsCcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
