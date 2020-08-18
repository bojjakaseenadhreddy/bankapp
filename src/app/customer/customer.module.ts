import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CreateDepositComponent } from './components/create-deposit/create-deposit.component';
import { AngMaterialModule } from '../ang-material/ang-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [CreateDepositComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AngMaterialModule,
    ReactiveFormsModule
  ],
  exports:[CreateDepositComponent]
})
export class CustomerModule { }
