import { UpdateComplaintComponent } from './../core/components/update-complaint/update-complaint.component';
import { AdminRoleCanActivateChildGuard } from './../core/guards/admin.guard';
import { UsersComponent } from './../admin-branch/components/users/users.component';
import { UserRegisterComponent } from './../admin-branch/components/user-register/user-register.component';
import { UpdateUserComponent } from './../admin-branch/components/update-user/update-user.component';
import { LoansComponent } from './../admin-branch/components/loans/loans.component';
import { CustomersComponent } from './../admin-branch/components/customers/customers.component';
import { ComplaintComponent } from './../customer/components/complaint/complaint.component';
import { BranchesComponent } from './components/branches/branches.component';
import { UpdateBranchComponent } from './components/update-branch/update-branch.component';
import { CreateBranchComponent } from './components/create-branch/create-branch.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintsComponent } from '../admin-branch/components/complaints/complaints.component';

const routes: Routes = [
  {
    path: "", canActivateChild: [AdminRoleCanActivateChildGuard], children: [
      { path: "", pathMatch: "full", component: AdminDashboardComponent },
      { path: "branches", component: BranchesComponent },
      { path: "create-branch", component: CreateBranchComponent },
      { path: "update-branch/:branch-code", component: UpdateBranchComponent },
      { path: "complaints", component: ComplaintsComponent },
      { path: "customers", component: CustomersComponent },
      { path: "loans", component: LoansComponent },
      { path: "update-user/:user-id", component: UpdateUserComponent },
      { path: "register-user", component: UserRegisterComponent },
      { path: "update-complaint/:complaint-id", component: UpdateComplaintComponent },
      { path: "users", component: UsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
