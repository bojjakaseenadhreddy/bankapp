import { InvalidTokenComponent } from './components/invalid-token/invalid-token.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnAuthourizedComponent } from './components/un-authourized/un-authourized.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "user-login", component: UserLoginComponent },
  { path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) },
  { path: "branch", loadChildren: () => import("./branch/branch.module").then(m => m.BranchModule) },
  { path: "customer", loadChildren: () => import("./customer/customer.module").then(m => m.CustomerModule) },
  { path: "un-authourized", component: UnAuthourizedComponent },
  { path: "invalid-token", component: InvalidTokenComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
