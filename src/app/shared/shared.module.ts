import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { GoogleMapsModule } from '@angular/google-maps'
import { RouterModule } from '@angular/router'

import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap'
import { NgSelectModule } from '@ng-select/ng-select'

import { TranslateModule } from '@ngx-translate/core'

import { EventVenueMapComponent } from './components/event-venue-map/event-venue-map.component'
import { HeaderComponent } from './components/header/header.component'
import { LayoutComponent } from './components/layout/layout.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { ViewToggleComponent } from './components/view-toggle/view-toggle.component'

@NgModule({
  declarations: [
    LayoutComponent,
    NotFoundComponent,
    HeaderComponent,
    EventVenueMapComponent,
    ViewToggleComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    NgbButtonsModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleMapsModule,
  ],
  exports: [
    TranslateModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule,

    LayoutComponent,
    NotFoundComponent,
    HeaderComponent,
    EventVenueMapComponent,
    ViewToggleComponent,
  ],
})
export class SharedModule {}
