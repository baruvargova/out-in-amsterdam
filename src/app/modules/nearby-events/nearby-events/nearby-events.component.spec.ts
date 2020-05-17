import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { NearbyEventsComponent } from './nearby-events.component'

describe('NearbyEventsComponent', () => {
  let component: NearbyEventsComponent
  let fixture: ComponentFixture<NearbyEventsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NearbyEventsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyEventsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
