import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

// XXX: declare this interceptor on main module as HTTP interceptor
@Injectable({
  providedIn: 'root',
})
export class HttpCommonInterceptor implements HttpInterceptor {
  // TODO: write tests
  constructor(
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({
        headers: req.headers.set('Accept-Version', 'v1')
        .set('Authorization', 'Client-ID 3pBVO1EmJlDmFTAH3VECukfrfAD_C6nPrVquHhxzOz8')
       
    });
    return next.handle(cloneReq);
  }
}
