import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyEventsListComponent } from './nearby-events-list.component';

describe('NearbyEventsListComponent', () => {
  let component: NearbyEventsListComponent;
  let fixture: ComponentFixture<NearbyEventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyEventsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
