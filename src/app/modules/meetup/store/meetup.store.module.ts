import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { meetupFeatureKey } from './meetup.actions';
import { meetupReducer } from './meetup.reducer';
import { MeetupEffects } from './meetup.effects';

@NgModule({
imports: [
CommonModule,
StoreModule.forFeature(meetupFeatureKey, meetupReducer),
EffectsModule.forFeature([MeetupEffects]),
],
})
export class MeetupStoreModule {}