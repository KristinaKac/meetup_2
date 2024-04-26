import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MeetupService } from '../services/meetup.service';
import { CREATE_MEETUP, DELETE_MEETUP, EDIT_MEETUP, GET_ALL, SUBSCRIBE, UNSUBSCRIBE, createApi, deleteApi, editApi, getAllApi, subscribeApi } from './meetup.actions';
import { IMeetup } from '../../../shared/models/meetup';

@Injectable()
export class MeetupEffects {

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(GET_ALL),
        mergeMap(() => this.meetupService.getAll()
            .pipe(
                map(meetupList => { return getAllApi({ meetupList }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    subscribe$ = createEffect(() => this.actions$.pipe(
        ofType(SUBSCRIBE),
        mergeMap((value: { idMeetup: number, idUser: number }) => this.meetupService.subscribe(value.idMeetup, value.idUser)
            .pipe(
                map(meetup => { return subscribeApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    unsubscribe$ = createEffect(() => this.actions$.pipe(
        ofType(UNSUBSCRIBE),
        mergeMap((value: { idMeetup: number, idUser: number }) => this.meetupService.unsubscribe(value.idMeetup, value.idUser)
            .pipe(
                map(meetup => { return subscribeApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    create$ = createEffect(() => this.actions$.pipe(
        ofType(CREATE_MEETUP),
        mergeMap((value: { form: IMeetup }) => this.meetupService.create({ form: value.form })
            .pipe(
                map(meetup => { return createApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    edit$ = createEffect(() => this.actions$.pipe(
        ofType(EDIT_MEETUP),
        mergeMap((value: { form: IMeetup, meetup: IMeetup }) => this.meetupService.edit(value.form, value.meetup)
            .pipe(
                map(meetup => { return editApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    delete$ = createEffect(() => this.actions$.pipe(
        ofType(DELETE_MEETUP),
        mergeMap((value: { id: number }) => this.meetupService.delete(value.id)
            .pipe(
                map(meetup => { return deleteApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private meetupService: MeetupService
    ) { }
}