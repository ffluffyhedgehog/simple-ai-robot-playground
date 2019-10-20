import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAgentSelectorComponent } from './map-agent-selector.component';

describe('MapAgentSelectorComponent', () => {
  let component: MapAgentSelectorComponent;
  let fixture: ComponentFixture<MapAgentSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAgentSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAgentSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
