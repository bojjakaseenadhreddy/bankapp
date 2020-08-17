import { ACCOUNT_TYPES } from './../../constants/account-type.constant';
import { STATUSES } from './../../constants/status.constant';
import { CustomerService } from './../../services/customer.service';
import { CustomerModel } from './../../../../interfaces/CustomerModel';
import { StatusModel } from './../../../../interfaces/StatusModel';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BranchModel } from '../../../../interfaces/BranchModel';
import { AccountTypeModel } from '../../../../interfaces/AccountTypeModel';
import { BranchService } from '../../services/branch.service';
import { passwordValidate } from '../../validators/password.validators';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})

export class CustomerRegisterComponent implements OnInit {
  
  customerRegisterForm: any;
  addressId: number;
  branches: BranchModel[] = [];
  customer: CustomerModel;
  hide: boolean = true;

  statuses = STATUSES;
  accountTypes = ACCOUNT_TYPES;
  constructor(private formBuilder: FormBuilder,
    private branchService: BranchService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      addressModel: this.formBuilder.group({
        id: ['',[Validators.required]]
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
    },{Validators:passwordValidate})
    this.branchService.getAllBranches().subscribe(
      (data) => { this.branches = data },
       (error) => { console.log(error) }
       );
  }
  getAddressId(value) {
    this.addressId = value;
    this.customerRegisterForm.patchValue({
      addressModel: {
        id: value
      }
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
    return this.customerRegisterForm.controls?.confirmPassword.errors?.passwordMatch ? "Password Not Matched" :"";
  }

   onSubmit() {
    console.log(this.customerRegisterForm.value);
    this.customer = this.customerRegisterForm.value;
    this.customerService.createCustomer(this.customer).subscribe(
      (data) => { this.customer = data; console.log(this.customer) },
      (error) => { console.log(error) }
    )
  }
}
