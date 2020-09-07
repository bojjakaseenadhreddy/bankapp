import { ViewAvailableLoansComponent } from './components/view-available-loans/view-available-loans.component';
import { ComplaintComponent } from './components/complaint/complaint.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CreateDepositComponent } from './components/create-deposit/create-deposit.component';
import { AngMaterialModule } from '../ang-material/ang-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { BalanceDialogComponent } from './components/balance-dialog/balance-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';


const components = [
  CreateDepositComponent,
  ComplaintComponent,
  CreateDepositComponent,
  ViewAvailableLoansComponent,
  WithdrawComponent,
  TransferComponent,
  BalanceDialogComponent,
  DashboardComponent,
  TransactionHistoryComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AngMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [components]
})
export class CustomerModule { }
