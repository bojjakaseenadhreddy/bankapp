import { BranchDashboardComponent } from './components/branch-dashboard/branch-dashboard.component';
import { CoreModule } from './../core/core.module';
import { BranchesComponent } from './components/branches/branches.component';
import { AngMaterialModule } from './../ang-material/ang-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts'
const components = [
  BranchesComponent,
  BranchDashboardComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    BranchRoutingModule,
    HttpClientModule,
    AngMaterialModule,
    CoreModule,
    NgxChartsModule
  ],
  exports: [
    components
  ]
})
export class BranchModule { }
