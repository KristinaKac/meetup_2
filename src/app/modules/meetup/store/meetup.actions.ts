import { createAction, props } from "@ngrx/store";
import { IMeetup } from "../../../shared/models/meetup";

export const meetupFeatureKey = 'meetup';

export const GET_ALL_MEETUPS = '[MeetupPage Component] get all meetups';
export const GET_ALL_MEETUPS_API = '[MeetupPage Component] get all meetups api';

export const SET_CURRENT_PAGE_MEETUP = '[CurrentPage Component] set Current Page';

export const SUBSCRIBE_MEETUP = '[Subscribe Component] subscribe';
export const SUBSCRIBE_MEETUP_API = '[Subscripe Component] subscribe api';
export const UNSUBSCRIBE_MEETUP = '[Unsubscribe Component] unsubscribe';

export const CREATE_MEETUP = '[CreateMeetup Component] create';
export const CREATE_MEETUP_API = '[CreateMeetup Component] create api';

export const EDIT_MEETUP = '[EditMeetup Component] Edit';
export const EDIT_MEETUP_API = '[EditMeetup Component] edit api';

export const DELETE_MEETUP = '[DeleteMeetup Component] delete';
export const DELETE_MEETUP_API = '[DeleteMeetup Component] delete api';


export const getAllMeetups = createAction(GET_ALL_MEETUPS);
export const getAllMeetupsApi = createAction(GET_ALL_MEETUPS_API, props<{ meetupList: IMeetup[] | null }>());

export const setCurrentPageMeetup = createAction(SET_CURRENT_PAGE_MEETUP, props<{ page: number }>());

export const subscribeMeetup = createAction(SUBSCRIBE_MEETUP, props<{ idMeetup: number, idUser: number }>());
export const subscribeMeetupApi = createAction(SUBSCRIBE_MEETUP_API, props<{ meetup: IMeetup | null }>());

export const unsubscribeMeetup = createAction(UNSUBSCRIBE_MEETUP, props<{ idMeetup: number, idUser: number }>());

export const createMeetup = createAction(CREATE_MEETUP, props<{ form: IMeetup}>());
export const createMeetupApi = createAction(CREATE_MEETUP_API, props<{ meetup: IMeetup | null }>());

export const editMeetup = createAction(EDIT_MEETUP, props<{ form: IMeetup, meetup: IMeetup}>());
export const editMeetupApi = createAction(EDIT_MEETUP_API, props<{ meetup: IMeetup | null }>());

export const deleteMeetup = createAction(DELETE_MEETUP, props<{ id: number }>());
export const deleteMeetupApi = createAction(DELETE_MEETUP_API, props<{ meetup: IMeetup | null }>());