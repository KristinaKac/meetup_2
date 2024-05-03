import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IRoles, IUser } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = `${environment.backendOrigin}/auth`;
  isAdmin = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public get token(): string | null {
    return localStorage.getItem('token');
  }

  public get user(): IUser | null {
    const token = localStorage.getItem('token');
    if (!token) { return null }
    return this.parseJWT(token);
  }
  public checkAdmin(): void {
    if (this.user?.roles) {
      this.isAdmin = this.user.roles.some((role: IRoles) => role.name === 'ADMIN');
    } else {
      this.isAdmin = false;
    }
  }

  login(email: string, password: string): Observable<IUser | null> {
    return this.http
      .post<{ token: string }>(`${this.baseURL}/login`, { email, password })
      .pipe(
        tap((response: { token: string }) =>
          localStorage.setItem('token', response.token)
        ),
        map((response: { token: string }) =>
          this.parseJWT(response.token)
        ),
        catchError((err: Error): Observable<null> => {
          if (err instanceof Error) {
            alert(err.message)
          }
          return of(null);
        })
      )
  }
  registration(fio: string, email: string, password: string): Observable<IUser | null> {
    return this.http
      .post<{ token: string }>(`${this.baseURL}/registration`, { fio, email, password })
      .pipe(
        tap((response: { token: string }) =>
          localStorage.setItem('token', response.token)
        ),
        map((response: { token: string }) =>
          this.parseJWT(response.token)
        ),
        catchError((err: Error): Observable<null> => {
          if (err instanceof Error) {
            alert(err.message)
          }
          return of(null);
        })
      )
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  parseJWT(token: string): IUser {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
