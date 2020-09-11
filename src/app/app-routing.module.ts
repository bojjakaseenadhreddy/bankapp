import { CanDeactivateComponentGuard } from './core/guards/can-de-activate.guard';
import { HomeComponent } from './components/home/home.component';
import { CanLoadCustomerGuard } from './guards/canLoadCustomer.guard';
import { InvalidTokenComponent } from './components/invalid-token/invalid-token.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnAuthourizedComponent } from './components/un-authourized/un-authourized.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanLoadAdminGuard } from './guards/canLoadAdmin.guard';
import { CanLoadManagerGuard } from './guards/canLoadManager.guard';
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "user-login", component: UserLoginComponent },
  { path: "admin", canLoad: [CanLoadAdminGuard], loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) },
  { path: "branch", canLoad: [CanLoadManagerGuard], loadChildren: () => import("./branch/branch.module").then(m => m.BranchModule) },
  { path: "customer", canLoad: [CanLoadCustomerGuard], loadChildren: () => import("./customer/customer.module").then(m => m.CustomerModule) },
  { path: "un-authourized", component: UnAuthourizedComponent },
  { path: "invalid-token", component: InvalidTokenComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [CanDeactivateComponentGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
