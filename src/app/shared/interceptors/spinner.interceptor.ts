import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { Observable, finalize, tap } from 'rxjs';

@Injectable()
export class spinnerInterceptor implements HttpInterceptor {
  totalRequests = 0;
  completedRequests = 0;

  constructor(private spinnerService: SpinnerService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();
    this.totalRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.completedRequests++;

        if (this.completedRequests === this.totalRequests) {
          this.spinnerService.hide();
          this.completedRequests = 0;
          this.totalRequests = 0;
        }
      })
    );
  }
}

