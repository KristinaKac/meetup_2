import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { spinnerInterceptor } from './shared/interceptors/spinner.interceptor';

import { HeaderComponent } from './components/header/header.component';
import { PrizmButtonModule } from '@prizm-ui/components';

import { PolymorphModule } from '@prizm-ui/components';
import { AuthModule } from './modules/auth/auth.module';
import { MeetupModule } from './modules/meetup/meetup.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { meetupReducer } from './modules/meetup/store/meetup.reducer';
import { MeetupEffects } from './modules/meetup/store/meetup.effects';
import { userReducer } from './modules/user/store/user.reducer';
import { UserEffects } from './modules/user/store/user.effects';

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
    StoreModule.forFeature('meetup', meetupReducer),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([MeetupEffects, UserEffects]),
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
