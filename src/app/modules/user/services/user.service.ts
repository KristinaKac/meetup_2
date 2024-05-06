import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IRole } from '../../../shared/models/role';
import { IUser } from '../../../shared/models/user';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = `${environment.backendOrigin}/user`;
  baseAuthURL = `${environment.backendOrigin}/auth`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll(): Observable<IUser[] | null> {
    return this.http
      .get<IUser[]>(`${this.baseURL}`)
      .pipe(catchError((err: Error): Observable<null> => {
        if (err instanceof Error) {
          alert(err.message)
        }
        return of(null);
      })
      )
  }
  create(fio: string, email: string, password: string): Observable<IUser | null> {
    return this.http
      .post<{ token: string }>(`${this.baseAuthURL}/registration`, { fio, email, password })
      .pipe(
        map((response: { token: string }): IUser =>
          this.authService.parseJWT(response.token)
        ),
        catchError((err: Error): Observable<null> => {
          if (err instanceof Error) {
            alert(err.message)
          }
          return of(null);
        })
      )
  }
  update(id: number, email: string, fio: string, password: string): Observable<IUser | null> {
    return this.http
      .put<IUser>(`${this.baseURL}/${id}`, { email, password, fio })
      .pipe(catchError((err: Error): Observable<null> => {
        if (err instanceof Error) {
          alert(err.message)
        }
        return of(null);
      })
      )
  }
  delete(id: number): Observable<IUser | null> {
    if (id === this.authService.user?.id) {
      alert('Невозможно удалить данного пользователя');
      return of(null);
    }
    return this.http
      .delete<IUser>(`${this.baseURL}/${id}`)
      .pipe(catchError((err: Error): Observable<null> => {
        if (err instanceof Error) {
          alert(err.message)
        }
        return of(null);
      })
      )
  }
  addRole(name: string, userId: number): Observable<IRole | null> {
    return this.http
      .put<IRole>(`${this.baseURL}/role`, { name, userId })
      .pipe(catchError((err: Error): Observable<null> => {
        if (err instanceof Error) {
          alert(err.message)
        }
        return of(null);
      })
      )
  }
}