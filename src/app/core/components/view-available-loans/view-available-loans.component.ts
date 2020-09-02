import { LoanTypeModel } from './../../../../interfaces/LoanTypeModel';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoanModel } from '../../../../interfaces/LoanModel';
import { FormGroup } from '@angular/forms';
import { LoanTypeService } from '../../services/loan-type.service';
import { LoanService } from '../../services/loan.service';
import { Component, OnInit } from '@angular/core';
import { SimpleSnackBar, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-available-loans',
  templateUrl: './view-available-loans.component.html',
  styleUrls: ['./view-available-loans.component.css']
})
export class ViewAvailableLoansComponent implements OnInit {

  loanTypes: LoanTypeModel[];
  loanTypeModel: LoanTypeModel;
  loanFormGroup: FormGroup;
  loanModel: LoanModel;
  isFormOpened: boolean = false;

  HOME = "https://cdn2.iconfinder.com/data/icons/app-ui-outline/64/home_house_app._technology_website_ui-512.png";
  TWO_WHEELER = "https://cdn1.iconfinder.com/data/icons/vehicle-10/210/1232-256.png";
  FOUR_WHEELER = "https://cdn4.iconfinder.com/data/icons/transportation-volume-ii/128/car-small-2-128.png";
  constructor(private snackbar: MatSnackBar, private loanTypeService: LoanTypeService, private loanService: LoanService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loanTypeService.getAllLoanTypes().subscribe(
      (data) => {
        console.log(data);
        this.loanTypes = data;
      },
      (error) => {
        console.log("error occured");
        console.log(error);
      }
    );


  }

  onSubmit() {
    if (this.loanFormGroup.valid) {
      this.loanModel = this.loanFormGroup.value;
      console.log(this.loanModel)
      this.loanService.createLoan(this.loanModel).subscribe(
        (data) => {
          console.log(data);
          this.snackbar.open("Successfully applied loan", "OK", { duration: 3000 });
        },
        (error) => {
          console.log(error);
          this.snackbar.open("Something Went wrong apply after some time", "OK", { duration: 3000 });
        }
      )
    } else {
      this.snackbar.open("Please Fill Required Fields", "OK", { duration: 3000 });

    }

  }

  loadImage(name: string) {
    if (name === "HOME") {
      return this.HOME;
    }
    else if (name === "TWO_WHEELER") {
      return this.TWO_WHEELER;
    }
    else {
      return this.FOUR_WHEELER;
    }
  }

  applyLoan(loanType: LoanTypeModel) {
    this.loanTypeModel = loanType; this.loanFormGroup = this.formBuilder.group({
      customerModel: this.formBuilder.group({
        accountNo: 11112
      }),
      statusModel: this.formBuilder.group({
        id: 1
      }),
      loanTypeModel: this.formBuilder.group({
        id: this.loanTypeModel.id
      }),
      loanAmount: ["", [Validators.required, Validators.min(this.loanTypeModel.minAmount), Validators.max(this.loanTypeModel.maxAmount)]]
    })
    this.isFormOpened = true;
  }


  getLoanAmountErrors(): string {
    let val = +this.loanFormGroup.get('loanAmount').value;
    console.log(val);
    if (val < this.loanTypeModel.minAmount) {
      return "Minimum loan is: " + this.loanTypeModel.minAmount;
    }
    else if (val > this.loanTypeModel.maxAmount) {
      return "Max loan is: " + this.loanTypeModel.maxAmount;
    }
    else
      return "";
  }
}
