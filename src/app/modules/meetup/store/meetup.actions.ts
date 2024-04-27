import { ActionCreator, createAction, props } from "@ngrx/store";
import { IMeetup } from "../../../shared/models/meetup";
import { TypedAction } from "@ngrx/store/src/models";

export const meetupFeatureKey = 'meetup';

export enum MeetupActionTypes {
    requestAllMeetups = '[MeetupPage Component] get all meetups',
    requestAllMeetupsApi = '[MeetupPage Component] get all meetups api',
    setCurrentPageMeetup = '[CurrentPage Component] set Current Page',
    subscribeMeetup = '[Subscribe Component] subscribe',
    subscribeMeetupApi = '[Subscripe Component] subscribe api',
    unsubscribeMeetup = '[Unsubscribe Component] unsubscribe',
    createMeetup = '[CreateMeetup Component] create',
    createMeetupApi = '[CreateMeetup Component] create api',
    editMeetup = '[EditMeetup Component] Edit',
    editMeetupApi = '[EditMeetup Component] edit api',
    deleteMeetup = '[DeleteMeetup Component] delete',
    deleteMeetupApi = '[DeleteMeetup Component] delete api',
}

export const getAllMeetups = createAction(MeetupActionTypes.requestAllMeetups);

export const getAllMeetupsApi:
    ActionCreator<MeetupActionTypes.requestAllMeetupsApi,
        (props: { meetupList: IMeetup[] | null }) => {
            meetupList: IMeetup[] | null;
        } & TypedAction<MeetupActionTypes.requestAllMeetupsApi>
    > = createAction(MeetupActionTypes.requestAllMeetupsApi, props<{ meetupList: IMeetup[] | null }>());

export const setCurrentPageMeetup:
    ActionCreator<MeetupActionTypes.setCurrentPageMeetup,
        (props: { page: number }) => {
            page: number;
        } & TypedAction<MeetupActionTypes.setCurrentPageMeetup>
    > = createAction(MeetupActionTypes.setCurrentPageMeetup, props<{ page: number }>());

export const subscribeMeetup:
    ActionCreator<MeetupActionTypes.subscribeMeetup,
        (props: { idMeetup: number, idUser: number }) => {
            idMeetup: number, idUser: number;
        } & TypedAction<MeetupActionTypes.subscribeMeetup>
    > = createAction(MeetupActionTypes.subscribeMeetup, props<{ idMeetup: number, idUser: number }>());

export const subscribeMeetupApi:
    ActionCreator<MeetupActionTypes.subscribeMeetupApi,
        (props: { meetup: IMeetup | null }) => {
            meetup: IMeetup | null;
        } & TypedAction<MeetupActionTypes.subscribeMeetupApi>
    > = createAction(MeetupActionTypes.subscribeMeetupApi, props<{ meetup: IMeetup | null }>());

export const unsubscribeMeetup:
    ActionCreator<MeetupActionTypes.unsubscribeMeetup,
        (props: { idMeetup: number, idUser: number }) => {
            idMeetup: number, idUser: number;
        } & TypedAction<MeetupActionTypes.unsubscribeMeetup>
    > = createAction(MeetupActionTypes.unsubscribeMeetup, props<{ idMeetup: number, idUser: number }>());

export const createMeetup:
    ActionCreator<MeetupActionTypes.createMeetup,
        (props: { form: IMeetup }) => {
            form: IMeetup;
        } & TypedAction<MeetupActionTypes.createMeetup>
    > = createAction(MeetupActionTypes.createMeetup, props<{ form: IMeetup }>());

export const createMeetupApi:
    ActionCreator<MeetupActionTypes.createMeetupApi,
        (props: { meetup: IMeetup | null }) => {
            meetup: IMeetup | null;
        } & TypedAction<MeetupActionTypes.createMeetupApi>
    > = createAction(MeetupActionTypes.createMeetupApi, props<{ meetup: IMeetup | null }>());

export const editMeetup:
    ActionCreator<MeetupActionTypes.editMeetup,
        (props: { form: IMeetup, meetup: IMeetup }) => {
            form: IMeetup, meetup: IMeetup;
        } & TypedAction<MeetupActionTypes.editMeetup>
    > = createAction(MeetupActionTypes.editMeetup, props<{ form: IMeetup, meetup: IMeetup }>());

export const editMeetupApi:
    ActionCreator<MeetupActionTypes.editMeetupApi,
        (props: { meetup: IMeetup | null }) => {
            meetup: IMeetup | null;
        } & TypedAction<MeetupActionTypes.editMeetupApi>
    > = createAction(MeetupActionTypes.editMeetupApi, props<{ meetup: IMeetup | null }>());

export const deleteMeetup:
    ActionCreator<MeetupActionTypes.deleteMeetup,
        (props: { id: number }) => {
            id: number;
        } & TypedAction<MeetupActionTypes.deleteMeetup>
    > = createAction(MeetupActionTypes.deleteMeetup, props<{ id: number }>());

export const deleteMeetupApi:
    ActionCreator<MeetupActionTypes.deleteMeetupApi,
        (props: { meetup: IMeetup | null }) => {
            meetup: IMeetup | null;
        } & TypedAction<MeetupActionTypes.deleteMeetupApi>
    > = createAction(MeetupActionTypes.deleteMeetupApi, props<{ meetup: IMeetup | null }>());