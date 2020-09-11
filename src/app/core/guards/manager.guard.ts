import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router'

@Injectable({
    providedIn: "root"
})

export class ManagerRoleCanActivateChildGuard implements CanActivateChild {
    constructor(private router: Router) { }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('role').toLowerCase() == "manager") {
            return true;
        }
        else {
            this.router.navigate(['un-authourized']);
            return false;
        }
    }
}