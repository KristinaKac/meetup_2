import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IMeetup } from '../../../shared/models/meetup';
import { MeetupService } from '../services/meetup.service';
import { CREATE_MEETUP, DELETE_MEETUP, EDIT_MEETUP, GET_ALL_MEETUPS, 
    SUBSCRIBE_MEETUP, UNSUBSCRIBE_MEETUP, createMeetupApi, deleteMeetupApi, 
    editMeetupApi, getAllMeetupsApi, subscribeMeetupApi } from './meetup.actions';

@Injectable()
export class MeetupEffects {

    getAllMeetups$ = createEffect(() => this.actions$.pipe(
        ofType(GET_ALL_MEETUPS),
        mergeMap(() => this.meetupService.getAll()
            .pipe(
                map(meetupList => { return getAllMeetupsApi({ meetupList }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    subscribeMeetup$ = createEffect(() => this.actions$.pipe(
        ofType(SUBSCRIBE_MEETUP),
        mergeMap((value: { idMeetup: number, idUser: number }) => this.meetupService.subscribe(value.idMeetup, value.idUser)
            .pipe(
                map(meetup => { return subscribeMeetupApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    unsubscribeMeetup$ = createEffect(() => this.actions$.pipe(
        ofType(UNSUBSCRIBE_MEETUP),
        mergeMap((value: { idMeetup: number, idUser: number }) => this.meetupService.unsubscribe(value.idMeetup, value.idUser)
            .pipe(
                map(meetup => { return subscribeMeetupApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    createMeetup$ = createEffect(() => this.actions$.pipe(
        ofType(CREATE_MEETUP),
        mergeMap((value: { form: IMeetup }) => this.meetupService.create({ form: value.form })
            .pipe(
                map(meetup => { return createMeetupApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    editMeetup$ = createEffect(() => this.actions$.pipe(
        ofType(EDIT_MEETUP),
        mergeMap((value: { form: IMeetup, meetup: IMeetup }) => this.meetupService.edit(value.form, value.meetup)
            .pipe(
                map(meetup => { return editMeetupApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    deleteMeetup$ = createEffect(() => this.actions$.pipe(
        ofType(DELETE_MEETUP),
        mergeMap((value: { id: number }) => this.meetupService.delete(value.id)
            .pipe(
                map(meetup => { return deleteMeetupApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private meetupService: MeetupService
    ) { }
}