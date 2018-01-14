import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDisplayerComponent } from './total-displayer.component';

describe('TotalDisplayerComponent', () => {
  let component: TotalDisplayerComponent;
  let fixture: ComponentFixture<TotalDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
