
import { AngMaterialModule } from './../ang-material/ang-material.module';
import { UpdateAddressComponent } from './components/update-address/update-address.component';
import { BranchDialogComponent } from './components/branch-dialog/branch-dialog.component';
import { AddressDialogComponent } from './components/address-dialog/address-dialog.component';
import { AddressComponent } from './components/address/address.component';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
const components = [
  AddressComponent,
  AddressDialogComponent,
  BranchDialogComponent,
  UpdateAddressComponent
]
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    AngMaterialModule
  ],
  declarations: [
    components
  ],
  exports: [components]
})
export class SharedModule { }
