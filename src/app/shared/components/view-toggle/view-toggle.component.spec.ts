import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'

import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap'

import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core'

import { BaseViewEnum } from '../../enums/base-view.enum'
import { ViewToggleComponent } from './view-toggle.component'
import Spy = jasmine.Spy

describe('ViewToggleComponent', () => {
  let component: ViewToggleComponent
  let fixture: ComponentFixture<ViewToggleComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgbButtonsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      declarations: [ViewToggleComponent],
      providers: [FormBuilder],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewToggleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit event according to radio clicked', () => {
    const changeViewSpy: Spy = spyOn(component.changeView, 'emit').and.callThrough()
    const mapInput: HTMLInputElement = fixture.nativeElement.querySelector('#map')
    const tableInput: HTMLInputElement = fixture.nativeElement.querySelector('#table')

    mapInput.click()
    fixture.detectChanges()

    expect(changeViewSpy.calls.count()).toBe(1, 'not called once after click on map')
    expect(component.changeView.emit).toHaveBeenCalledWith(BaseViewEnum.Map)

    tableInput.click()
    fixture.detectChanges()

    expect(changeViewSpy.calls.count()).toBe(2, 'not called once after click on table')
    expect(component.changeView.emit).toHaveBeenCalledWith(BaseViewEnum.Table)
  })
})
