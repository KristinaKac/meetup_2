import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IRole } from '../../../shared/models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseURL = `${environment.backendOrigin}/role`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IRole[] | null> {
    return this.http
      .get<IRole[]>(`${this.baseURL}`)
      .pipe(catchError((err: Error): Observable<null> => {
        if (err instanceof Error) {
          alert(err.message)
        }
        return of(null);
      })
      )
  }
}
