import { createReducer, on } from "@ngrx/store";
import { createApi, deleteApi, editApi, getAllApi, setCurrentPage, subscribeApi } from "./meetup.actions";
import { State, initialState } from "./meetup.state";


const _meetupReducer = createReducer(initialState,
    on(getAllApi, (state, action) => {
        return {
            ...state,
            meetupList: action.meetupList
        }
    }),
    on(setCurrentPage, (state, action) => {
        return {
            ...state,
            currentPage: action.page
        }
    }),
    on(subscribeApi, (state, action) => {
        return {
            ...state,
            meetupList: state.meetupList!.map(meetup =>
                meetup.id === action.meetup!.id ? action.meetup! : meetup)
        }
    }),
    on(createApi, (state, action) => {
        return {
            ...state,
            meetupList: [...state.meetupList!, action.meetup!]
        }
    }),
    on(editApi, (state, action) => {
        return {
            ...state,
            meetupList: state.meetupList!.map(meetup =>
                meetup.id === action.meetup!.id ? action.meetup! : meetup)
        }
    }),
    on(deleteApi, (state, action) => {
        return {
            ...state,
            meetupList: state.meetupList!.filter((meetup) => meetup.id !== action.meetup!.id)
        }
    })
)

export function meetupReducer(state: any, action: any) {
    return _meetupReducer(state, action);
}