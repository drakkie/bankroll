import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IeToolbarComponent, IeToolbarDialogComponent } from './ie-Toolbar.component';

describe('IeToolbarComponent', () => {
  let component: IeToolbarComponent;
  let fixture: ComponentFixture<IeToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IeToolbarComponent, IeToolbarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
