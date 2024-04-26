import { createAction, props } from "@ngrx/store";
import { IMeetup } from "../../../shared/models/meetup";

export const GET_ALL = '[MeetupPage Component] get all meetups';
export const GET_ALL_API = '[MeetupPage Component] get all meetups api';

export const SET_CURRENT_PAGE = '[CurrentPage Component] set Current Page';

export const SUBSCRIBE = '[Subscribe Component] subscribe';
export const SUBSCRIBE_API = '[Subscripe Component] subscribe api';
export const UNSUBSCRIBE = '[Unsubscribe Component] unsubscribe';

export const CREATE_MEETUP = '[CreateMeetup Component] create';
export const CREATE_MEETUP_API = '[CreateMeetup Component] create api';

export const EDIT_MEETUP = '[EditMeetup Component] Edit';
export const EDIT_MEETUP_API = '[EditMeetup Component] edit api';

export const DELETE_MEETUP = '[DeleteMeetup Component] delete';
export const DELETE_MEETUP_API = '[DeleteMeetup Component] delete api';


export const getAll = createAction(GET_ALL);
export const getAllApi = createAction(GET_ALL_API, props<{ meetupList: IMeetup[] | null }>());

export const setCurrentPage = createAction(SET_CURRENT_PAGE, props<{ page: number }>());

export const subscribe = createAction(SUBSCRIBE, props<{ idMeetup: number, idUser: number }>());
export const subscribeApi = createAction(SUBSCRIBE_API, props<{ meetup: IMeetup | null }>());

export const unsubscribe = createAction(UNSUBSCRIBE, props<{ idMeetup: number, idUser: number }>());

export const create = createAction(CREATE_MEETUP, props<{ form: IMeetup}>());
export const createApi = createAction(CREATE_MEETUP_API, props<{ meetup: IMeetup | null }>());

export const edit = createAction(EDIT_MEETUP, props<{ form: IMeetup, meetup: IMeetup}>());
export const editApi = createAction(EDIT_MEETUP_API, props<{ meetup: IMeetup | null }>());

export const deleteMeetup = createAction(DELETE_MEETUP, props<{ id: number }>());
export const deleteApi = createAction(DELETE_MEETUP_API, props<{ meetup: IMeetup | null }>());