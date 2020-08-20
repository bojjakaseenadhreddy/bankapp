import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { UpdateAddressComponent } from './components/update-address/update-address.component';
import { UpdateBranchComponent } from './components/update-branch/update-branch.component';
import { UsersComponent } from './components/users/users.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './../core/core.module';
import { AngMaterialModule } from './../ang-material/ang-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateBranchComponent } from './components/create-branch/create-branch.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

export const components = [
  CreateBranchComponent,
  CustomersComponent,
  UsersComponent,
  UpdateBranchComponent,
  UpdateAddressComponent,
  UpdateCustomerComponent,
  UpdateUserComponent
  
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngMaterialModule,
    CoreModule,
    ReactiveFormsModule
  ],
  exports:[
    components
  ]
})
export class AdminModule { }