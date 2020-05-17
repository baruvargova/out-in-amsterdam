import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core'

import { ViewToggleComponent } from './view-toggle.component'

describe('ViewToggleComponent', () => {
  let component: ViewToggleComponent
  let fixture: ComponentFixture<ViewToggleComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
})
