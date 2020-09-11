import { MatSnackBar } from '@angular/material/snack-bar';
import { CanLoad, Route, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CanLoadCustomerGuard implements CanLoad {
    constructor(private router: Router, private snackBar: MatSnackBar) { }
    canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean {
        if (localStorage.getItem("jwttoken") && localStorage.getItem("role").toLowerCase() == 'customer' && localStorage.getItem("branchId")) {
            return true;
        }
        else {
            this.snackBar.open("Please signin as CUSTOMER role to access", "OK", { duration: 4000 });
            this.router.navigate(['home']);
            return false;
        }
    }

}