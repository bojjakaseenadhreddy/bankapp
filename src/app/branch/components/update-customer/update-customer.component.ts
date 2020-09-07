import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BranchModel } from '../../../../interfaces/BranchModel';
import { CustomerModel } from '../../../../interfaces/CustomerModel';
import { STATUSES } from '../../../core/constants/status.constant';
import { ACCOUNT_TYPES } from '../../../core/constants/account-type.constant';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BranchService } from '../../../core/services/branch.service';
import { CustomerService } from '../../../core/services/customer.service';
import { passwordValidate } from '../../../core/validators/password.validators';
import { notEqual } from 'assert';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  updateCustomerForm: FormGroup;
  addressId: number;
  branches: BranchModel[] = [];
  customer: CustomerModel;
  accountNumber: number;
  hide: boolean = true;

  statuses = STATUSES;
  accountTypes = ACCOUNT_TYPES;
  constructor(private formBuilder: FormBuilder,
    private branchService: BranchService,
    private customerService: CustomerService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {

    this.accountNumber = +this.router.snapshot.paramMap.get("account-number");
    this.customerService.getCustomerByAccountNumber(this.accountNumber).subscribe(
      (data) => {
        this.customer = data;
        console.log(this.customer);
        this.patchCustomer();
      },
      (error) => { console.log(error) }
    )

    this.updateCustomerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
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
  }
  // getAddressId(value) {
  //   this.addressId = value;
  //   this.updateCustomerForm.patchValue({
  //     addressModel: {
  //       id: value
  //     }
  //   });
  // }
  getEmailErrors() {
    if (this.updateCustomerForm.get('email').hasError('required')) {
      return "Email Required"
    }
    return this.updateCustomerForm.get('email').hasError('pattern') ? "Enter Valid Email" : "";
  }

  getPasswordErrors() {

    if (this.updateCustomerForm.get('confirmPassword').hasError('required')) {
      return "Confirm Password Required"
    }
    if (this.updateCustomerForm.get('confirmPassword') != this.updateCustomerForm.get('password')) {
      this.updateCustomerForm.get('confirmPassword').setErrors(notEqual);
      return "Password Not Matched";
    }
    else
      return "";
  }

  patchCustomer() {
    this.addressId = this.customer.addressModel.id;
    this.updateCustomerForm.patchValue({
      name: this.customer.name,
      email: this.customer.email,
      dob: this.customer.dob,
      password: this.customer.password,
      confirmPassword: this.customer.password,
      addressModel: {
        id: this.customer.addressModel.id
      }
      ,
      accountTypeModel: {
        id: this.customer.accountTypeModel.id
      }
      ,
      branchModel: {
        branchCode: this.customer.branchModel.branchCode
      }
      ,
      statusModel: {
        id: this.customer.statusModel.id
      }
    })
  }

  onSubmit() {
    console.log(this.updateCustomerForm.value);
    if (this.updateCustomerForm.valid) {
      this.customer = this.updateCustomerForm.value;
      this.customer.accountNo = this.accountNumber;
      this.customerService.updateCustomer(this.accountNumber, this.customer).subscribe(
        (data) => { this.customer = data; console.log(this.customer); },
        (error) => { console.log(error) }
      )
    }
    else {

    }

  }
}
