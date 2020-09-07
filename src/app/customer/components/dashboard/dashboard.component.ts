import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../core/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { BalanceDialogComponent } from '../balance-dialog/balance-dialog.component';
import { CustomerModel } from '../../../../interfaces/CustomerModel';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
message:string;
customerModel:CustomerModel;
accountNumber:any;
balance:any;
showFiller = false;

constructor(private customerService:CustomerService,public dialog:MatDialog ,private  notifier: NotifierService) {
  this.notifier = notifier;
}



 ngOnInit(): void {
  }
  onClick(){
    this.message="hello";
    console.log("clicked");
  }
  openDialog(): void {
    //this.withdrawModel.customerModel.accountNo
    this.customerService.getCustomerByAccountNumber(11113).subscribe((data)=>{
      this.customerModel=data;
      this.accountNumber=this.customerModel.accountNo;
      this.balance=this.customerModel.balance;
      console.log(this.customerModel.accountNo);
      console.log(this.customerModel.balance);
    });

    const dialogRef = this.dialog.open(BalanceDialogComponent, {
      width: '250px',
      data: {name:this.customerModel.name,accountNumber: this.accountNumber, balance: this.balance}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  public showSpecificNotification( type: string, message: string, id: string ): void {
		this.notifier.show( {
			id,
			message,
			type
		} );
  }
  public showNotification( type: string, message: string ): void {
    console.log("inside show notification...")
		this.notifier.notify( type, message );
	}




}
