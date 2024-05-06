import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MeetupState } from "./meetup";
import { meetupFeatureKey } from "./meetup.actions";
import { IMeetup } from "../../../shared/models/meetup";

const getMeetupState = createFeatureSelector<MeetupState>(meetupFeatureKey);

export const getMeetups = createSelector(getMeetupState, (state: MeetupState): IMeetup[] | null => {
    return state.meetupList;
});
export const getCurrentPage = createSelector(getMeetupState, (state: MeetupState): number => {
    return state.currentPage;
});
