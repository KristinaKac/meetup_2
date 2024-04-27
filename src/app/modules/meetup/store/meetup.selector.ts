import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MeetupState } from "./meetup";
import { meetupFeatureKey } from "./meetup.actions";

const getMeetupState = createFeatureSelector<MeetupState>(meetupFeatureKey);

export const getMeetups = createSelector(getMeetupState, (state: MeetupState) => {
    return state.meetupList;
});
export const getCurrentPage = createSelector(getMeetupState, (state: MeetupState) => {
    return state.currentPage;
});
