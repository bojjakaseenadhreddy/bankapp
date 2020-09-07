import { SharedModule } from './../shared/shared.module';
import { UsersComponent } from './components/users/users.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { LoansComponent } from './components/loans/loans.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { AdminRoutingModule } from './../admin/admin-routing.module';
import { CoreModule } from './../core/core.module';
import { AngMaterialModule } from './../ang-material/ang-material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
const components = [
  ComplaintsComponent,
  CustomersComponent,
  UserRegisterComponent,
  LoansComponent,
  UpdateUserComponent,
  UsersComponent
]
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngMaterialModule,
    CoreModule,
    ReactiveFormsModule,
    NgxChartsModule,
    SharedModule
  ],
  declarations: [
    components
  ],
  exports: [
    NgxChartsModule,
    components
  ]
})
export class AdminBranchModule { }
