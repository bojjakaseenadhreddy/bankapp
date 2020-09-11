import { Component, OnInit } from '@angular/core';
import { WithdrawModel } from '../../../../interfaces/WithdrawModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepositService } from '../../../core/services/deposit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WithdrawService } from '../../../core/services/withdraw.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BalanceDialogComponent } from '../balance-dialog/balance-dialog.component';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerModel } from '../../../../interfaces/CustomerModel';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  wirthdraws: WithdrawModel[];
  withdrawModel: WithdrawModel;
  customerModel: CustomerModel;
  createWithdrawForm: FormGroup;
  isSaving = false;
  isSaved = false;
  accountNo:any;
  balance:any;
  constructor(private withdrawService: WithdrawService,private customerService:CustomerService,public dialog:MatDialog, private fb: FormBuilder, private snackBar: MatSnackBar) { }
  accountNumber=localStorage.getItem('accountNo');
  ngOnInit(): void {
   // this.accountNumber = +localStorage.getItem('accountNo');
    this.createWithdrawForm = this.fb.group({
      withdrawAmount: ['', Validators.required],
      customerModel: this.fb.group({
        accountNo: [this.accountNumber, Validators.required]
      })
    })

  }
  onSubmit() {
    console.log(this.createWithdrawForm.value);
    if (!this.createWithdrawForm.errors) {
      this.isSaving = true;
      this.withdrawModel = this.createWithdrawForm.value;
      this.withdrawService.createWithdraw(this.withdrawModel).subscribe((data) => {
        this.withdrawModel = data;
        console.log(data)
        this.isSaving = false;
        this.isSaved = true;
      }, (error) => {
        console.log(error)
      });
    }
    if (this.isSaved) {
      this.createWithdrawForm.reset();
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this.snackBar.open("Withdraw Success", "close", {
      duration: 2000,
    });
  }

      openDialog(): void {
        //this.withdrawModel.customerModel.accountNo
        this.customerService.getCustomerByAccountNumber(JSON.parse(localStorage.getItem('accountNo'))).subscribe((data)=>{
          this.customerModel=data;
          this.accountNo=this.customerModel.accountNo;
          this.balance=this.customerModel.balance;
          console.log(this.customerModel.accountNo);
          console.log(this.customerModel.balance);
          console.log('The dialog was closed');
        });
      

    const dialogRef = this.dialog.open(BalanceDialogComponent, {
      width: '250px',
      data: { name: this.customerModel.name, accountNumber: this.accountNumber, balance: this.balance }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }



}



