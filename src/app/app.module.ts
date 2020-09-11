import { HomeComponent } from './components/home/home.component';
import { CanLoadCustomerGuard } from './guards/canLoadCustomer.guard';
import { CanLoadManagerGuard } from './guards/canLoadManager.guard';
import { CanLoadAdminGuard } from './guards/canLoadAdmin.guard';
import { AdminBranchModule } from './admin-branch/admin-branch.module';
import { SharedModule } from './shared/shared.module';
import { InvalidTokenComponent } from './components/invalid-token/invalid-token.component';
import { UnAuthourizedComponent } from './components/un-authourized/un-authourized.component';
import { UnknownErrorComponent } from './components/unknown-error/unknown-error.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { LoginComponent } from './components/login/login.component';
import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';
import { AuthorizationInterceptor } from './interceptor/authorization.interceptor';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngMaterialModule } from './ang-material/ang-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserLoginComponent,
    UnknownErrorComponent,
    UnAuthourizedComponent,
    InvalidTokenComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    SharedModule,
    AdminBranchModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
