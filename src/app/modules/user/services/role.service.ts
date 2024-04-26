import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { IRole } from '../../../shared/models/role';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseURL: string = `${environment.backendOrigin}/role`;

  // private dataSubject = new BehaviorSubject<IRole[]>([]);
  // private _roleList$: Observable<IRole[]> = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  // set roleList(value: IRole[]) {
  //   this.dataSubject.next(value);
  // }
  // get roleList(): Observable<IRole[]> {
  //   return this._roleList$;
  // }

  getAll(): Observable<IRole[] | null> {
    return this.http
      .get<IRole[]>(`${this.baseURL}`)
      .pipe(catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
      )
  }
}
