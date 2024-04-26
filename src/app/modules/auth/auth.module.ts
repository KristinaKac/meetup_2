import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrizmButtonModule } from '@prizm-ui/components';
import { PrizmInputLayoutDateComponent, PrizmInputTextModule } from '@prizm-ui/components';
import { PrizmInputPasswordModule } from '@prizm-ui/components';


@NgModule({
  declarations: [
    AuthFormComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    PrizmButtonModule,
    PrizmInputLayoutDateComponent,
    PrizmInputTextModule,
    PrizmInputPasswordModule
  ]
})
export class AuthModule {

 }
