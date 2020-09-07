import { AdminBranchRoutingModule } from './../admin-branch/admin-branch-routing.module';
import { AdminBranchModule } from './../admin-branch/admin-branch.module';
import { SharedModule } from './../shared/shared.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UpdateBranchComponent } from './components/update-branch/update-branch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './../core/core.module';
import { AngMaterialModule } from './../ang-material/ang-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { AdminRoutingModule } from './admin-routing.module';
import { CreateBranchComponent } from './components/create-branch/create-branch.component';
import { BranchesComponent } from './components/branches/branches.component';

export const components = [
  CreateBranchComponent,
  UpdateBranchComponent,
  AdminDashboardComponent,
  BranchesComponent
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
    ReactiveFormsModule,
    NgxChartsModule,
    SharedModule,
    AdminBranchModule
  ],
  exports: [
    components,
    NgxChartsModule
  ]
})
export class AdminModule { }