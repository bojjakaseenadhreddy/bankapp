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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { LoansComponent } from './components/loans/loans.component';


@NgModule({
  declarations: [CreateDepositComponent, WithdrawComponent, TransferComponent, BalanceDialogComponent, DashboardComponent, TransactionHistoryComponent, LoansComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AngMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[CreateDepositComponent,WithdrawComponent,TransferComponent,BalanceDialogComponent,DashboardComponent,TransactionHistoryComponent,LoansComponent]
})
export class CustomerModule { }
