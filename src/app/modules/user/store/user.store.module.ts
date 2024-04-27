import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userFeatureKey } from './user.actions';
import { userReducer } from './user.reducer';
import { UserEffects } from './user.effects';

@NgModule({
imports: [
CommonModule,
StoreModule.forFeature(userFeatureKey, userReducer),
EffectsModule.forFeature([UserEffects]),
],
})
export class UserStoreModule {}