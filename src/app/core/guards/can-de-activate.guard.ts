import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IDeactivateComponent } from "../../../interfaces/IDeactivateComponent";

@Injectable({
    providedIn: "root"
})
export class CanDeactivateComponentGuard implements CanDeactivate<any>{
    canDeactivate(component: IDeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
        return component.isSaved ? component.isSaved() : true;
    }
}