import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../../core/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { BalanceDialogComponent } from '../balance-dialog/balance-dialog.component';
import { CustomerModel } from '../../../../interfaces/CustomerModel';
<<<<<<< HEAD

=======
import { PushNotificationsService } from 'ng-push';
>>>>>>> 98d8357515d47de0a7fa2b204469d4401d924c24
import { NotifierService } from 'angular-notifier';
import { ComplaintService } from '../../../core/services/complaint.service';
import { WithdrawService } from '../../../core/services/withdraw.service';
import { DepositService } from '../../../core/services/deposit.service';
import { TransferService } from '../../../core/services/transfer.service';
import { ComplaintModel } from '../../../../interfaces/ComplaintModel';
import { ComplaintDialogComponent } from '../complaint-dialog/complaint-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: string;
  customerModel: CustomerModel;
  accountNumber: any;
  balance: any;
  name: any;
  email: any;
  showFiller = false;
  withdrawCount: number;
  depositCount: number;
  transferCount: number;
  complaintCount: number;
  complaintModels:ComplaintModel[];


  constructor(private customerService: CustomerService, public dialog: MatDialog, private notifier: NotifierService, private complaintSevice: ComplaintService, private transferService: TransferService, private withdrawService: WithdrawService, private depositService: DepositService) {
    this.notifier = notifier;
  }



  ngOnInit(): void {
    let accountNumber = JSON.parse(localStorage.getItem('accountNo'));
    this.accountNumber=accountNumber;
    this.customerService.getCustomerByAccountNumber(accountNumber).subscribe((data) => {
      this.customerModel = data;
      this.accountNumber = this.customerModel.accountNo;
      this.balance = this.customerModel.balance;
      this.name = this.customerModel.name;
      this.email = this.customerModel.email;
      console.log(this.customerModel.accountNo);
      console.log(this.customerModel.balance);
    }, (error) => {
      console.log(error);
    });

    this.complaintSevice.getComplaintsCountByAccountNumber(accountNumber).subscribe(count => {
      this.complaintCount = count;
    });

    this.withdrawService.getWithdrawCountByAccountNumber(accountNumber).subscribe(count =>
      this.withdrawCount = count);

    this.depositService.getDepositsCountByAccountNumber(accountNumber).subscribe(count =>
      this.depositCount = count);

    this.transferService.getTransafersCountByAccountNumber(accountNumber).subscribe(count =>
      this.transferCount = count);

      this.complaintSevice.getComplaintsByAccountNumber(accountNumber).subscribe((data)=>{
          this.complaintModels=data;
      });


  }


  onClick() {
    this.message = "hello";
    console.log("clicked");
  }
  openDialog(): void {
    //this.withdrawModel.customerModel.accountNo
    const dialogRef = this.dialog.open(BalanceDialogComponent, {
      width: '250px',
      data: { name: this.name, accountNumber: this.accountNumber, balance: this.balance }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  viewComplaints()
  {
    const dialogRef = this.dialog.open(ComplaintDialogComponent, {
      width: '600px',
      height:'300px',
      data: { complaints: this.complaintModels, accountNumber: this.accountNumber, }
    });
  }

  public showNotification(type: string, message: string): void {
    console.log("inside show notification...")
    this.notifier.notify(type, message);
  }


}
