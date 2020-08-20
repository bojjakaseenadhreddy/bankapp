import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable({
    providedIn:"root"
})
export class AuthorizationInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log("inside intercept")

        if(!req.url.match('login/')){
            req = req.clone({setHeaders:{"Authorization":"Bearer " + localStorage.getItem('jwttoken')}});
          console.log(req)
            console.log("after cloning")
        }

    // req.headers.set("Access-Control-Allow-Credentials","true");
       console.log(req);
        return next.handle(req);
    }
}
