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

<<<<<<< HEAD
        console.log("inside intercept")

        if(!req.url.match('login/')){
            req = req.clone({setHeaders:{"Authorization":"Bearer " + localStorage.getItem('jwttoken')}});
          console.log(req)
=======
        if (req.url.indexOf("login") == -1) {
            req = req.clone({ setHeaders: { "Authorization": "Bearer " + localStorage.getItem('jwttoken') } });
>>>>>>> 60295b496ae42b27504f502c9f5eb8b5f4b8d4b2
            console.log("after cloning")
        } else {
            if (req.body.customer == "true") {
                req = req.clone({ setHeaders: { "Role": "Customer" } });
                console.log("customer role");
            }
        }
<<<<<<< HEAD

    // req.headers.set("Access-Control-Allow-Credentials","true");
       console.log(req);
=======
        console.log(req);
>>>>>>> 60295b496ae42b27504f502c9f5eb8b5f4b8d4b2
        return next.handle(req);
    }
}
