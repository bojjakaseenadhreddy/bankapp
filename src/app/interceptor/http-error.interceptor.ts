import { Route, Routes, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {

                    if (error.error instanceof ErrorEvent) {
                        console.error("Error Event");
                    } else {

                        switch (error.status) {
                            case 401:
                                console.log("un authourized");
                                this.router.navigateByUrl("/un-authourized");
                                break;
                            case 403:
                                console.log("Token expired/invalid");
                                this.router.navigateByUrl("/invalid-token");
                                console.log("test");
                                break;
                        }
                    }
                }
                return throwError(error);

            })
        )
    }
}
