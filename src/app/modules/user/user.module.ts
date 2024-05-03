import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTableRowComponent } from './components/user-table-row/user-table-row.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrizmButtonModule, PrizmInputSelectModule, PrizmInputTextModule } from '@prizm-ui/components';

import { PrizmInputPasswordModule, PrizmSpinnerModule } from '@prizm-ui/components';
import { PrizmIconsSvgComponent } from '@prizm-ui/icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { UtilIconsModule } from '../../shared/util/util-icons/util-icons.module';
import { UserStoreModule } from './store/user.store.module';


@NgModule({
  declarations: [
    UserFormComponent,
    UserTableRowComponent,
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    UserStoreModule,
    FormsModule,
    UtilIconsModule,
    ReactiveFormsModule,
    PrizmButtonModule,
    PrizmInputTextModule,
    PrizmInputPasswordModule,
    PrizmSpinnerModule,
    NgxPaginationModule,
    PrizmInputSelectModule,
    PrizmIconsSvgComponent
  ]
})
export class UserModule { }
