import { TransactionsDisplayerComponent } from './transactions-displayer.component';
import { TransactionsComponent } from './../transactions.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('TransactionsCcComponent', () => {
  let component: TransactionsDisplayerComponent;
  let fixture: ComponentFixture<TransactionsDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
