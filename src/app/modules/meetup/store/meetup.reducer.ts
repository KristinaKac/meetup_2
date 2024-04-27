import { createReducer, on } from "@ngrx/store";
import {
    createMeetupApi, deleteMeetupApi, editMeetupApi,
    getAllMeetupsApi, setCurrentPageMeetup, subscribeMeetupApi
} from "./meetup.actions";
import { initialState } from "./meetup.state";


export const meetupReducer = createReducer(initialState,
    on(getAllMeetupsApi, (state, action) => {
        return {
            ...state,
            meetupList: action.meetupList
        }
    }),
    on(setCurrentPageMeetup, (state, action) => {
        return {
            ...state,
            currentPage: action.page
        }
    }),
    on(subscribeMeetupApi, (state, action) => {
        return {
            ...state,
            meetupList: state.meetupList!.map(meetup =>
                meetup.id === action.meetup!.id ? action.meetup! : meetup)
        }
    }),
    on(createMeetupApi, (state, action) => {
        return {
            ...state,
            meetupList: [...state.meetupList!, action.meetup!]
        }
    }),
    on(editMeetupApi, (state, action) => {
        return {
            ...state,
            meetupList: state.meetupList!.map(meetup =>
                meetup.id === action.meetup!.id ? action.meetup! : meetup)
        }
    }),
    on(deleteMeetupApi, (state, action) => {
        return {
            ...state,
            meetupList: state.meetupList!.filter((meetup) => meetup.id !== action.meetup!.id)
        }
    })
)