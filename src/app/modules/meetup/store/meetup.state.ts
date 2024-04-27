import { IMeetup } from "../../../shared/models/meetup";

export interface MeetupState {
    meetupList: IMeetup[] | null,
    currentPage: number,
}

export const initialState: MeetupState = {
    meetupList: [],
    currentPage: 1
}