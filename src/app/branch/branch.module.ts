import { CoreModule } from './../core/core.module';
import { BranchesComponent } from './components/branches/branches.component';
import { AngMaterialModule } from './../ang-material/ang-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { HttpClientModule } from '@angular/common/http';
const components =[
  BranchesComponent
]

@NgModule({
  declarations: [ components],
  imports: [
    CommonModule,
    BranchRoutingModule,
    HttpClientModule,
    AngMaterialModule,
    CoreModule
  ],
  exports:[
    components
  ]
})
export class BranchModule { }
