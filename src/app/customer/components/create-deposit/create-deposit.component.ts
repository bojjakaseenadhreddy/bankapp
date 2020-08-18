import { Component, OnInit } from '@angular/core';
import { DepositModel } from '../../../../interfaces/DepositModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepositService } from './../../../core/services/deposit.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.component.html',
  styleUrls: ['./create-deposit.component.css']
})
export class CreateDepositComponent implements OnInit {

  deposits:DepositModel[];
  depositModel:DepositModel;
  createDepositForm:FormGroup;
  isSaving=false;
  isSaved=false;
  constructor(private depositService:DepositService,private fb:FormBuilder,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
      this.createDepositForm=this.fb.group({
      depositAmount:['',Validators.required],
      customerModel:this.fb.group({
        accountNo:['',Validators.required]
      })
      })

}
onSubmit(){

  console.log(this.createDepositForm.value);
  if(!this.createDepositForm.errors){
    this.isSaving=true;
      this.depositModel=this.createDepositForm.value;
      this.depositService.createDeposit(this.depositModel).subscribe((data)=>{
          this.depositModel=data;
          console.log("Data "+data)
          this.isSaving=false;
          this.isSaved=true;
      },(error)=>{
        console.log(error)
      });
  }
}

openSnackBar() {
if(this.isSaved){
  this.snackBar.open("Deposit Success", "close", {
    duration: 2000,
  });
}
}
}

