import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IDeactivateComponent } from "../../../interfaces/IDeactivateComponent";

@Injectable({
    providedIn: "root"
})
export class CanDeactivateComponentGuard implements CanDeactivate<IDeactivateComponent>{
    constructor(private snackbar: MatSnackBar) { }
    canDeactivate(component: IDeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
        console.log("invoking can deactivate guard");
        this.snackbar.open("guard", "OK", { duration: 3000 });

        return component.isSaved();
    }
}