import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [LayoutComponent, NotFoundComponent, HeaderComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    TranslateModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule,
    
    LayoutComponent,
    NotFoundComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
