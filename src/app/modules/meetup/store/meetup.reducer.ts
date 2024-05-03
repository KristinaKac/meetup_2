import { createReducer, on } from "@ngrx/store";
import {
    MeetupActionTypes,
    createMeetupApi, deleteMeetupApi, editMeetupApi,
    getAllMeetupsApi, setCurrentPageMeetup, subscribeMeetupApi
} from "./meetup.actions";
import { MeetupState } from "./meetup";
import { IMeetup } from "../../../shared/models/meetup";
import { TypedAction } from "@ngrx/store/src/models";

export const initialState: MeetupState = {
    meetupList: [],
    currentPage: 1
}

export const meetupReducer = createReducer(initialState,
    on(getAllMeetupsApi, (state: MeetupState, action: {
        meetupList: IMeetup[] | null;
    } & TypedAction<MeetupActionTypes.requestAllMeetupsApi> & {
        type: MeetupActionTypes.requestAllMeetupsApi;
    }) => {
        return {
            ...state,
            meetupList: action.meetupList
        }
    }),
    on(setCurrentPageMeetup, (state: MeetupState, action: {
        page: number;
    } & TypedAction<MeetupActionTypes.setCurrentPageMeetup> & {
        type: MeetupActionTypes.setCurrentPageMeetup;
    }) => {
        return {
            ...state,
            currentPage: action.page
        }
    }),
    on(subscribeMeetupApi, (state: MeetupState, action: {
        meetup: IMeetup | null;
    } & TypedAction<MeetupActionTypes.subscribeMeetupApi> & {
        type: MeetupActionTypes.subscribeMeetupApi;
    }) => {

        return {
            ...state,
            meetupList: state.meetupList!.map((meetup: IMeetup) =>
                meetup.id === action.meetup!.id ? action.meetup! : meetup)
        }
    }),
    on(createMeetupApi, (state: MeetupState, action: {
        meetup: IMeetup | null;
    } & TypedAction<MeetupActionTypes.createMeetupApi> & {
        type: MeetupActionTypes.createMeetupApi;
    }) => {
        return {
            ...state,
            meetupList: [...state.meetupList!, action.meetup!]
        }
    }),
    on(editMeetupApi, (state: MeetupState, action: {
        meetup: IMeetup | null;
    } & TypedAction<MeetupActionTypes.editMeetupApi> & {
        type: MeetupActionTypes.editMeetupApi;
    }) => {
        return {
            ...state,
            meetupList: state.meetupList!.map((meetup: IMeetup) =>
                meetup.id === action.meetup!.id ? action.meetup! : meetup)
        }
    }),
    on(deleteMeetupApi, (state: MeetupState, action: {
        meetup: IMeetup | null;
    } & TypedAction<MeetupActionTypes.deleteMeetupApi> & {
        type: MeetupActionTypes.deleteMeetupApi;
    }) => {
        return {
            ...state,
            meetupList: state.meetupList!.filter((meetup: IMeetup) => meetup.id !== action.meetup!.id)
        }
    })
)