import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IMeetup } from '../../../shared/models/meetup';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  baseURL = `${environment.backendOrigin}/meetup`;

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<IMeetup[] | null> {
    return this.http
      .get<IMeetup[]>(`${this.baseURL}`)
      .pipe(
        map((data: IMeetup[]): IMeetup[] => {
          return data.sort((a: IMeetup, b: IMeetup): number =>
            new Date(b.time) > new Date(a.time) ? 1 : -1
          )
        }),
        catchError((err: Error): Observable<null> => {
          if (err instanceof Error) {
            alert(err.message)
          }
          return of(null);
        })
      )
  }

  subscribe(idMeetup: number, idUser: number): Observable<IMeetup | null> {
    return this.http
      .put<IMeetup>(`${this.baseURL}`, { idMeetup, idUser })
      .pipe(
        catchError((err: Error): Observable<null> => {
          if (err instanceof Error) {
            alert(err.message)
          }
          return of(null);
        })
      )
  }

  unsubscribe(idMeetup: number, idUser: number): Observable<IMeetup | null> {
    return this.http
      .delete<IMeetup>(`${this.baseURL}`, { body: { idMeetup, idUser } })
      .pipe(
        catchError((err: Error): Observable<null> => {
          if (err instanceof Error) {
            alert(err.message)
          }
          return of(null);
        })
      );
  }
  create(value: { form: IMeetup }): Observable<IMeetup | null> {
    return this.http
      .post<IMeetup>(`${this.baseURL}`,
        {
          name: value.form.name,
          description: value.form.description,
          time: value.form.time,
          duration: value.form.duration,
          location: value.form.location,
          target_audience: value.form.target_audience,
          need_to_know: value.form.need_to_know,
          will_happen: value.form.will_happen,
          reason_to_come: value.form.reason_to_come
        })
      .pipe(
        map((item: IMeetup): IMeetup => {
          item.users = [];
          return item
        }),
        catchError((err: Error): Observable<null> => {
          if (err instanceof Error) {
            alert(err.message)
          }
          return of(null);
        })
      )
  }
  edit(form: IMeetup, meetup: IMeetup): Observable<IMeetup | null> {
    return this.http
      .put<IMeetup>(`${this.baseURL}/${meetup?.id}`,
        {
          name: form.name,
          description: form.description,
          time: form.time,
          duration: form.duration,
          location: form.location,
          target_audience: form.target_audience,
          need_to_know: form.need_to_know,
          will_happen: form.will_happen,
          reason_to_come: form.reason_to_come,
        })
      .pipe(
        map((item: IMeetup): IMeetup => {
          meetup ? item.owner = meetup.owner : item.owner;
          return item
        }),
        catchError((err: Error): Observable<null> => {
          if (err instanceof Error) {
            alert(err.message)
          }
          return of(null);
        })
      )
  }
  delete(id: number): Observable<IMeetup | null> {
    return this.http
      .delete<IMeetup>(`${this.baseURL}/${id}`)
      .pipe(
        catchError((err: Error): Observable<null> => {
          if (err instanceof Error) {
            alert(err.message)
          }
          return of(null);
        })
      )
  }
}
