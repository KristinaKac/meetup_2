import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IMeetup } from '../../../shared/models/meetup';
import { MeetupService } from '../services/meetup.service';
import {
    MeetupActionTypes, createMeetupApi, deleteMeetupApi,
    editMeetupApi, getAllMeetupsApi, subscribeMeetupApi
} from './meetup.actions';

@Injectable()
export class MeetupEffects {

    getAllMeetups$ = createEffect(():
        Observable<{ meetupList: IMeetup[] | null; } & TypedAction<MeetupActionTypes.requestAllMeetupsApi>> =>
        this.actions$.pipe(
            ofType(MeetupActionTypes.requestAllMeetups),
            mergeMap((): Observable<{ meetupList: IMeetup[] | null; } & TypedAction<MeetupActionTypes.requestAllMeetupsApi>> =>
                this.meetupService.getAll()
                    .pipe(
                        map((meetupList: IMeetup[] | null): { meetupList: IMeetup[] | null; } & TypedAction<MeetupActionTypes.requestAllMeetupsApi> => { return getAllMeetupsApi({ meetupList }) }),
                        catchError((): Observable<never> => EMPTY)
                    ))
        )
    );
    subscribeMeetup$ = createEffect((): Observable<{ meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.subscribeMeetupApi>> =>
        this.actions$.pipe(
            ofType(MeetupActionTypes.subscribeMeetup),
            mergeMap((value: { idMeetup: number, idUser: number }): Observable<{ meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.subscribeMeetupApi>> =>
                this.meetupService.subscribe(value.idMeetup, value.idUser)
                    .pipe(
                        map((meetup: IMeetup | null): { meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.subscribeMeetupApi> => { return subscribeMeetupApi({ meetup }) }),
                        catchError((): Observable<never> => EMPTY)
                    ))
        )
    );
    unsubscribeMeetup$ = createEffect((): Observable<{ meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.subscribeMeetupApi>> =>
        this.actions$.pipe(
            ofType(MeetupActionTypes.unsubscribeMeetup),
            mergeMap((value: { idMeetup: number, idUser: number }): Observable<{ meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.subscribeMeetupApi>> =>
                this.meetupService.unsubscribe(value.idMeetup, value.idUser)
                    .pipe(
                        map((meetup: IMeetup | null): { meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.subscribeMeetupApi> => { return subscribeMeetupApi({ meetup }) }),
                        catchError((): Observable<never> => EMPTY)
                    ))
        )
    );
    createMeetup$ = createEffect((): Observable<{ meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.createMeetupApi>> =>
        this.actions$.pipe(
            ofType(MeetupActionTypes.createMeetup),
            mergeMap((value: { form: IMeetup }): Observable<{ meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.createMeetupApi>> =>
                this.meetupService.create({ form: value.form })
                    .pipe(
                        map((meetup: IMeetup | null): { meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.createMeetupApi> => { return createMeetupApi({ meetup }) }),
                        catchError((): Observable<never> => EMPTY)
                    ))
        )
    );
    editMeetup$ = createEffect((): Observable<{ meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.editMeetupApi>> => this.actions$.pipe(
        ofType(MeetupActionTypes.editMeetup),
        mergeMap((value: { form: IMeetup, meetup: IMeetup }): Observable<{ meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.editMeetupApi>> => this.meetupService.edit(value.form, value.meetup)
            .pipe(
                map((meetup: IMeetup | null): { meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.editMeetupApi> => { return editMeetupApi({ meetup }) }),
                catchError((): Observable<never> => EMPTY)
            ))
    )
    );
    deleteMeetup$ = createEffect((): Observable<{ meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.deleteMeetupApi>> => this.actions$.pipe(
        ofType(MeetupActionTypes.deleteMeetup),
        mergeMap((value: { id: number }): Observable<{ meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.deleteMeetupApi>> => this.meetupService.delete(value.id)
            .pipe(
                map((meetup: IMeetup | null): { meetup: IMeetup | null; } & TypedAction<MeetupActionTypes.deleteMeetupApi> => { return deleteMeetupApi({ meetup }) }),
                catchError((): Observable<never> => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private meetupService: MeetupService
    ) { }
}