import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IRole } from '../../../shared/models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseURL: string = `${environment.backendOrigin}/role`;

  constructor(
    private http: HttpClient
  ) { }

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
