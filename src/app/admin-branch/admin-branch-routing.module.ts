import { CanDeactivateComponentGuard } from './../core/guards/can-de-activate.guard';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoansComponent } from './components/loans/loans.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UsersComponent } from './components/users/users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [CanDeactivateComponentGuard],
    exports: [RouterModule]
})
export class AdminBranchRoutingModule { }