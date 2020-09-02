import { Component, OnInit } from '@angular/core';
import { TransferModel } from '../../../../interfaces/TransferModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransferService } from '../../../core/services/transfer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transfers: TransferModel[];
 transferModel: TransferModel;
  createTransferForm: FormGroup;
  isSaving = false;
  isSaved = false;
  constructor(private transferService: TransferService, private fb: FormBuilder, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.createTransferForm=this.fb.group({
      customerModel: this.fb.group({
        accountNo: ['', [Validators.required,Validators.minLength(5)]]
      }),
      receiverAccountNumber:['',Validators.required],
      amount:['',Validators.required]
    });
  }

  onSubmit() {
    console.log(this.createTransferForm.value);
    if (this.createTransferForm.valid) {
      this.isSaving = true;
      this.transferModel = this.createTransferForm.value;
      this.transferService.createTransfer(this.transferModel).subscribe((data) => {
        this.transferModel = data;
        console.log(data)
        this.isSaving = false;
        this.isSaved = true;
      }, (error) => {
        console.log(error)
      });
    }
    if (this.isSaved) {
      this.openSnackBar();
    }
  }

  openSnackBar() {
      this.snackBar.open("Transaction Successful", "close", {
        duration: 2000,
      });
  }
 errors(){
   if(this.createTransferForm.get('accountNo').hasError('required')){
     return "account no required";
   }else if(this.createTransferForm.get('accountNo').hasError('minlength')){
    return "account no should be minimum 5 digits."
   }}

}
