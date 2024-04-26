import { IMeetup } from "../../../shared/models/meetup";

export interface State {
    meetupList: IMeetup[] | null,
    currentPage: number,
}

export const initialState: State = {
    meetupList: [],
    currentPage: 1
}