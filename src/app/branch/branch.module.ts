import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { BranchDashboardComponent } from './components/branch-dashboard/branch-dashboard.component';
import { CoreModule } from './../core/core.module';
import { AngMaterialModule } from './../ang-material/ang-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchRoutingModule } from './branch-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { SharedModule } from '../shared/shared.module';
import { AdminBranchModule } from '../admin-branch/admin-branch.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const components = [
  BranchDashboardComponent,
  CustomerRegisterComponent,
  UpdateCustomerComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    BranchRoutingModule,
    HttpClientModule,
    AngMaterialModule,
    CoreModule,
    SharedModule,
    NgxChartsModule,
    AdminBranchModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    components
  ]
})
export class BranchModule { }
