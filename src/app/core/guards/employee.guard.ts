import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router'

@Injectable({
    providedIn: "root"
})
export class EmployeeRoleCanActivateChildGuard implements CanActivateChild {

    constructor(private router: Router) { }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (localStorage.getItem('role').toLowerCase() == "employee") {
            return true;
        }
        else {
            this.router.navigate(['un-authourized']);
            return false;
        }
    }
}