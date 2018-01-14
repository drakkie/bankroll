import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsToolbarComponent } from './transactions-toolbar.component';

describe('TransactionsToolbarComponent', () => {
  let component: TransactionsToolbarComponent;
  let fixture: ComponentFixture<TransactionsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
