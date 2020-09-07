
import { UpdateAddressComponent } from './components/update-address/update-address.component';
import { BranchDialogComponent } from './components/branch-dialog/branch-dialog.component';
import { AddressDialogComponent } from './components/address-dialog/address-dialog.component';
import { AddressComponent } from './components/address/address.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const components = [
  AddressComponent,
  AddressDialogComponent,
  BranchDialogComponent,
  UpdateAddressComponent
]
const routes: Routes = [
  { path: "update-address/:address-id", component: UpdateAddressComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
