import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { distinctUntilChanged } from 'rxjs/operators'

import { BaseViewEnum } from '../../enums/base-view.enum'
import { BaseComponent } from '../base/base.component'

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.component.html',
  styleUrls: ['./view-toggle.component.scss'],
})
export class ViewToggleComponent extends BaseComponent implements OnInit {
  @Input() public activeView: BaseViewEnum
  @Output() public changeView = new EventEmitter<BaseViewEnum>()

  public BaseViewEnum = BaseViewEnum
  public form: FormGroup

  constructor(private fb: FormBuilder) {
    super()
  }

  public ngOnInit() {
    this.form = this.fb.group({
      view: [this.activeView],
    })

    this.form
      .get('view')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value: BaseViewEnum) => this.changeView.emit(value))
  }
}
