import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router'

@Injectable({
    providedIn: "root"
})
export class CustomerRoleCanActivateChildGuard implements CanActivateChild {

    constructor(private router: Router) { }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (localStorage.getItem('role').toLowerCase() == "customer") {
            return true;
        }
        else {
            this.router.navigate(['un-authourized']);
            return false;
        }
    }
}