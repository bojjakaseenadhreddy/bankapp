import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CreateDepositComponent } from './components/create-deposit/create-deposit.component';
import { AngMaterialModule } from '../ang-material/ang-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { BalanceDialogComponent } from './components/balance-dialog/balance-dialog.component';


@NgModule({
  declarations: [CreateDepositComponent, WithdrawComponent, TransferComponent, BalanceDialogComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AngMaterialModule,
    ReactiveFormsModule
  ],
  exports:[CreateDepositComponent,WithdrawComponent,TransferComponent,BalanceDialogComponent]
})
export class CustomerModule { }
