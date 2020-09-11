import { MatSnackBar } from '@angular/material/snack-bar';
import { CanLoad, Route, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CanLoadAdminGuard implements CanLoad {
    constructor(private router: Router, private snackBar: MatSnackBar) { }
    canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean {
        if (localStorage.getItem("jwttoken") && localStorage.getItem("role").toLowerCase() == 'admin') {
            return true;
        }
        else {
            this.snackBar.open("Please signin as ADMIN role to access page", "OK", { duration: 4000 });
            this.router.navigate(['home']);
            return false;
        }
    }

}