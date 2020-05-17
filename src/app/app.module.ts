import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { SharedModule } from './shared/shared.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpLoaderFactory } from './core/services/app-translate.loader'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
