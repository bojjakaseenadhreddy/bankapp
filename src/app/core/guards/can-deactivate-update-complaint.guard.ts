import { UpdateComplaintComponent } from './../components/update-complaint/update-complaint.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class CanDeactivateComplaintUpdateGuard implements CanDeactivate<UpdateComplaintComponent>{
    canDeactivate(component: UpdateComplaintComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
        return true;
    }

}       