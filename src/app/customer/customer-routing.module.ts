import { CanDeactivateComponentGuard } from './../core/guards/can-de-activate.guard';
import { LoansComponent } from './../admin-branch/components/loans/loans.component';
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
    path: "", children: [
      { path: "", component: DashboardComponent },
      { path: "transfer", component: TransferComponent },
      { path: "deposit", component: CreateDepositComponent },
      { path: "withdraw", component: WithdrawComponent },
      { path: "loans", component: LoansComponent },
      { path: "apply-loan", component: ViewAvailableLoansComponent },
      { path: "complaint", component: ComplaintComponent, canDeactivate: [CanDeactivateComponentGuard] },
      { path: "transaction-history", component: TransactionHistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [CanDeactivateComponentGuard],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
