import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAdderComponent } from './transactions-adder.component';

describe('TransactionsAdderComponent', () => {
  let component: TransactionsAdderComponent;
  let fixture: ComponentFixture<TransactionsAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
