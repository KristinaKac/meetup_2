import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./meetup.state";

const getMeetupState = createFeatureSelector<State>('meetup');

export const getMeetups = createSelector(getMeetupState, (state) => {
    return state.meetupList;
});
export const getCurrentPage = createSelector(getMeetupState, (state) => {
    return state.currentPage;
});
