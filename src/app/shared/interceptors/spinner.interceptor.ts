import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

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
      finalize((): void => {
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

