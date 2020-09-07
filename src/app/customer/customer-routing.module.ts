import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { ComplaintComponent } from './components/complaint/complaint.component';
import { ViewAvailableLoansComponent } from './components/view-available-loans/view-available-loans.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { CreateDepositComponent } from './components/create-deposit/create-deposit.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "", component: DashboardComponent, children: [
      { path: "transfer", component: TransferComponent },
      { path: "deposit", component: CreateDepositComponent },
      { path: "withdraw", component: WithdrawComponent },
      { path: "loans", component: ViewAvailableLoansComponent },
      { path: "complaint", component: ComplaintComponent },
      { path: "transaction-history", component: TransactionHistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
