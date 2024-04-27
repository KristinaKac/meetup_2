import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { spinnerInterceptor } from './shared/interceptors/spinner.interceptor';

import { PrizmButtonModule } from '@prizm-ui/components';
import { HeaderComponent } from './components/header/header.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PolymorphModule } from '@prizm-ui/components';
import { AuthModule } from './modules/auth/auth.module';
import { MeetupModule } from './modules/meetup/meetup.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    MeetupModule,
    UserModule,
    SharedModule,
    PrizmButtonModule,
    PolymorphModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'ru_RU' },
    { provide: HTTP_INTERCEPTORS, useClass: spinnerInterceptor, multi: true },
    provideMomentDateAdapter(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
