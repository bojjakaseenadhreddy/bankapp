import { LoginModel } from './../../interfaces/LoginModel';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class AuthorizationInterceptor implements HttpInterceptor {
    data: LoginModel;
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("inside intercept");
        console.log(req.url);

        if (req.url.indexOf("login") == -1) {
            req = req.clone({ setHeaders: { "Authorization": "Bearer " + localStorage.getItem('jwttoken') } });
            console.log("after cloning")
        } else {
            if (req.body.customer == "true") {
                req = req.clone({ setHeaders: { "Role": "Customer" } });
                console.log("customer role");
            }
        }
        console.log(req);
        return next.handle(req);
    }
}
