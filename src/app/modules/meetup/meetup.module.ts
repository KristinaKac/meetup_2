import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { MeetupFormComponent } from './components/meetup-form/meetup-form.component';
import { MeetupComponent } from './components/meetup/meetup.component';
import { MeetupsPageComponent } from './pages/meetups-page/meetups-page.component';
import { UserMeetupsPageComponent } from './pages/user-meetups-page/user-meetups-page.component';
import { FilterMeetupsPipe } from './pipes/filter-meetups.pipe';
import { UserFilterMeetupsPipe } from './pipes/user-filter-meetups.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrizmAccordionModule, PrizmButtonModule, PrizmInputDateMultiComponent, 
  PrizmInputLayoutDateComponent, PrizmInputLayoutDateTimeComponent, PrizmInputNumberModule, 
  PrizmInputSelectModule, PrizmInputTextModule, PrizmSpinnerModule } from '@prizm-ui/components';
import { NgxPaginationModule } from 'ngx-pagination';
import { MeetupStoreModule } from './store/meetup.store.module';
import { UtilIconsModule } from '../../shared/util/util-icons/util-icons.module';
import { PrizmIconsSvgComponent } from '@prizm-ui/icons';



@NgModule({
  declarations: [
    FilterFormComponent,
    MeetupComponent,
    MeetupFormComponent,
    MeetupsPageComponent,
    UserMeetupsPageComponent,
    FilterMeetupsPipe,
    UserFilterMeetupsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilIconsModule,
    MeetupStoreModule,
    ReactiveFormsModule,
    PrizmButtonModule,
    PrizmInputLayoutDateComponent,
    PrizmInputTextModule,
    PrizmInputSelectModule,
    NgxPaginationModule,
    PrizmSpinnerModule,
    PrizmAccordionModule,
    PrizmInputNumberModule,
    PrizmInputDateMultiComponent,
    PrizmInputLayoutDateTimeComponent,
    PrizmIconsSvgComponent
  ]
})
export class MeetupModule { }
