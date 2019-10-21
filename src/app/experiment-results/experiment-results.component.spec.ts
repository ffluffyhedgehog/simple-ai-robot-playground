import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentResultsComponent } from './experiment-results.component';

describe('ExperimentResultsComponent', () => {
  let component: ExperimentResultsComponent;
  let fixture: ComponentFixture<ExperimentResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
