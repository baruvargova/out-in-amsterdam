import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyEventsMapComponent } from './nearby-events-map.component';

describe('NearbyEventsMapComponent', () => {
  let component: NearbyEventsMapComponent;
  let fixture: ComponentFixture<NearbyEventsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyEventsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyEventsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
