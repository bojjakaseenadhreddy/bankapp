import { InvalidTokenComponent } from './core/components/invalid-token/invalid-token.component';
import { UnAuthourizedComponent } from './core/components/un-authourized/un-authourized.component';
import { ComplaintsComponent } from './core/components/complaints/complaints.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { UserLoginComponent } from './core/components/user-login/user-login.component';
import { LoginComponent } from './core/components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "user/login", component: UserLoginComponent },
  { path: "admin/admin-dashboard", component: AdminDashboardComponent },
  { path: "dashboard", component: ComplaintsComponent },
  { path: "un-authourized", component: UnAuthourizedComponent },
  { path: "invalid-token", component: InvalidTokenComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
