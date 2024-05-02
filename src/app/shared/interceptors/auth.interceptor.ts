import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpContext,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { environment } from '../../../environments/environment.development';


@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<{
      headers?: HttpHeaders; context?: HttpContext; reportProgress?: boolean; params?: HttpParams;
      responseType?: "arraybuffer" | "blob" | "text" | "json"; withCredentials?: boolean; transferCache?: boolean;
    }>, next: HttpHandler): Observable<HttpEvent<{
      headers?: HttpHeaders; context?: HttpContext; reportProgress?: boolean; params?: HttpParams;
      responseType?: "arraybuffer" | "blob" | "text" | "json"; withCredentials?: boolean; transferCache?: boolean;
    }>> {
    const token: string | null = this.authService.token;
    const isApiUrl = request.url.startsWith(environment.backendOrigin);
    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(request);
  }
}
