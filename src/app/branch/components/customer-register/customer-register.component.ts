import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Location } from '@angular/common';
import { CustomerModel } from './../../../../interfaces/CustomerModel';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BranchModel } from '../../../../interfaces/BranchModel';
import { STATUSES } from 'src/app/core/constants/status.constant';
import { ACCOUNT_TYPES } from 'src/app/core/constants/account-type.constant';
import { BranchService } from 'src/app/core/services/branch.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { passwordValidate } from 'src/app/core/validators/password.validators';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})

export class CustomerRegisterComponent implements OnInit {

  customerRegisterForm: FormGroup;
  addressId: number;
  branches: BranchModel[] = [];
  customer: CustomerModel;
  hide: boolean = true;

  @ViewChild('stepper') matStepper: MatStepper;

  statuses = STATUSES;
  accountTypes = ACCOUNT_TYPES;
  constructor(private formBuilder: FormBuilder,
    private branchService: BranchService,
    private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private location: Location

  ) { }

  ngOnInit() {
    this.customerRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      balance: ['', [Validators.required]],
      addressModel: this.formBuilder.group({
        id: ['', [Validators.required]]
      }),
      accountTypeModel: this.formBuilder.group({
        id: ['', [Validators.required]]
      }),
      branchModel: this.formBuilder.group({
        branchCode: ['', [Validators.required]]
      }),
      statusModel: this.formBuilder.group({
        id: ['', [Validators.required]]
      })
    }, { Validators: passwordValidate })
    this.branchService.getAllBranches().subscribe(
      (data) => { this.branches = data },
      (error) => { console.log(error) }
    );
  }
  getAddressId(value) {
    this.addressId = value;
    this.matStepper.next();
    this.customerRegisterForm.patchValue({
      addressModel: {
        id: value
      },
      balance: 0
    });
  }
  getEmailErrors() {
    if (this.customerRegisterForm.get('email').hasError('required')) {
      return "Email Required"
    }
    return this.customerRegisterForm.get('email').hasError('pattern') ? "Enter Valid Email" : "";
  }

  getPasswordErrors() {

    if (this.customerRegisterForm.get('confirmPassword').hasError('required')) {
      return "Confirm Password Required"
    }
    return this.customerRegisterForm.controls?.confirmPassword.errors?.passwordMatch ? "Password Not Matched" : "";
  }

  onSubmit() {
    console.log(this.customerRegisterForm.value);

    if (this.customerRegisterForm.valid) {
      this.customer = this.customerRegisterForm.value;
      this.customerService.createCustomer(this.customer).subscribe(
        (data) => {
          this.customer = data;
          console.log(this.customer);
          this.snackbar.open("Registred successfully ", "OK", { duration: 3000 });
          this.location.back();
        },
        (error) => {
          console.log(error);
          this.snackbar.open("Something went wrong try after some time", "OK", { duration: 4000 });
          this.location.back();
        }
      )
    } else {
      this.snackbar.open("Please fill all required fields", "OK", { duration: 3000 });
    }

  }
}
