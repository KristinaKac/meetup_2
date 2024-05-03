import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IMeetup } from '../../../shared/models/meetup';
import { MeetupService } from '../services/meetup.service';
import { MeetupActionTypes, createMeetupApi, deleteMeetupApi, 
    editMeetupApi, getAllMeetupsApi, subscribeMeetupApi } from './meetup.actions';

@Injectable()
export class MeetupEffects {

    getAllMeetups$ = createEffect(() => this.actions$.pipe(
        ofType(MeetupActionTypes.requestAllMeetups),
        mergeMap(() => this.meetupService.getAll()
            .pipe(
                map((meetupList: IMeetup[] | null) => { return getAllMeetupsApi({ meetupList }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    subscribeMeetup$ = createEffect(() => this.actions$.pipe(
        ofType(MeetupActionTypes.subscribeMeetup),
        mergeMap((value: { idMeetup: number, idUser: number }) => this.meetupService.subscribe(value.idMeetup, value.idUser)
            .pipe(
                map((meetup: IMeetup | null) => { return subscribeMeetupApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    unsubscribeMeetup$ = createEffect(() => this.actions$.pipe(
        ofType(MeetupActionTypes.unsubscribeMeetup),
        mergeMap((value: { idMeetup: number, idUser: number }) => this.meetupService.unsubscribe(value.idMeetup, value.idUser)
            .pipe(
                map((meetup: IMeetup | null) => { return subscribeMeetupApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    createMeetup$ = createEffect(() => this.actions$.pipe(
        ofType(MeetupActionTypes.createMeetup),
        mergeMap((value: { form: IMeetup }) => this.meetupService.create({ form: value.form })
            .pipe(
                map((meetup: IMeetup | null) => { return createMeetupApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    editMeetup$ = createEffect(() => this.actions$.pipe(
        ofType(MeetupActionTypes.editMeetup),
        mergeMap((value: { form: IMeetup, meetup: IMeetup }) => this.meetupService.edit(value.form, value.meetup)
            .pipe(
                map((meetup: IMeetup | null) => { return editMeetupApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );
    deleteMeetup$ = createEffect(() => this.actions$.pipe(
        ofType(MeetupActionTypes.deleteMeetup),
        mergeMap((value: { id: number }) => this.meetupService.delete(value.id)
            .pipe(
                map((meetup: IMeetup | null) => { return deleteMeetupApi({ meetup }) }),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private meetupService: MeetupService
    ) { }
}