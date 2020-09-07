import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { BranchDashboardComponent } from './components/branch-dashboard/branch-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintsComponent } from '../admin-branch/components/complaints/complaints.component';
import { CustomersComponent } from '../admin-branch/components/customers/customers.component';
import { LoansComponent } from '../admin-branch/components/loans/loans.component';
import { UpdateUserComponent } from '../admin-branch/components/update-user/update-user.component';
import { UserRegisterComponent } from '../admin-branch/components/user-register/user-register.component';
import { UsersComponent } from '../admin-branch/components/users/users.component';

const routes: Routes = [
  {
    path: "", children: [
      { path: "", pathMatch: "full", component: BranchDashboardComponent },
      { path: "register-customer", component: CustomerRegisterComponent },
      { path: "update-customer/:account-number", component: UpdateCustomerComponent },
      { path: "complaints", component: ComplaintsComponent },
      { path: "customers", component: CustomersComponent },
      { path: "loans", component: LoansComponent },
      { path: "update-user/:user-id", component: UpdateUserComponent },
      { path: "register-user", component: UserRegisterComponent },
      { path: "users", component: UsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
