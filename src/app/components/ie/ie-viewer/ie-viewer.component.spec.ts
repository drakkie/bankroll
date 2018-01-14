import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IeViewerComponent } from './ie-viewer.component';

describe('IeViewerComponent', () => {
  let component: IeViewerComponent;
  let fixture: ComponentFixture<IeViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IeViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
