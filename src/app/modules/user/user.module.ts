import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTableRowComponent } from './components/user-table-row/user-table-row.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrizmButtonModule, PrizmInputSelectModule } from '@prizm-ui/components';
import { PrizmInputTextModule } from '@prizm-ui/components';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PrizmInputPasswordModule } from '@prizm-ui/components';
import { MatIconModule } from '@angular/material/icon';
import { PrizmSpinnerModule } from '@prizm-ui/components';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    UserFormComponent,
    UserTableRowComponent,
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrizmButtonModule,
    PrizmInputTextModule,
    PrizmInputPasswordModule,
    PrizmSpinnerModule,
    NgxPaginationModule,
    PrizmInputSelectModule
  ]
})
export class UserModule { }
