import { InvalidTokenComponent } from './components/invalid-token/invalid-token.component';
import { UnknownErrorComponent } from './components/unknown-error/unknown-error.component';
import { UnAuthourizedComponent } from './components/un-authourized/un-authourized.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewAvailableLoansComponent } from './components/view-available-loans/view-available-loans.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { ComplaintComponent } from './components/complaint/complaint.component';
import { BranchDialogComponent } from './components/branch-dialog/branch-dialog.component';
import { AddressDialogComponent } from './components/address-dialog/address-dialog.component';
import { AddressComponent } from './components/address/address.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { LoginComponent } from './components/login/login.component';
import { AngMaterialModule } from './../ang-material/ang-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';

const components = [
  LoginComponent,
  UserRegisterComponent,
  AddressComponent,
  CustomerRegisterComponent,
  AddressDialogComponent,
  BranchDialogComponent,
  PageNotFoundComponent,
  UnAuthourizedComponent,
  UnknownErrorComponent,
  InvalidTokenComponent,
  ComplaintComponent,
  UserLoginComponent,
  ComplaintsComponent,
  ViewAvailableLoansComponent
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngMaterialModule
  ],
  exports: [
    components
  ]
})
export class CoreModule {

}