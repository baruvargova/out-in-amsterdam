import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyEventsFilterComponent } from './nearby-events-filter.component';

describe('NearbyEventsFilterComponent', () => {
  let component: NearbyEventsFilterComponent;
  let fixture: ComponentFixture<NearbyEventsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyEventsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyEventsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
