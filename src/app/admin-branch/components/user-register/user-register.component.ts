import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../../../interfaces/UserModel';
import { BranchModel } from '../../../../interfaces/BranchModel';
import { AddressModel } from '../../../../interfaces/AddressModel';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

import { Component, OnInit, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UserService } from '../../../core/services/user.service';
import { BranchService } from '../../../core/services/branch.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})

export class UserRegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private branchService: BranchService, private snackBar: MatSnackBar, private router: Router, private location: Location) { }

  @ViewChild('stepper') matStepper: MatStepper;
  addressId: number;
  branches: BranchModel[] = [];
  rowStatuses: any = [
    { id: 1, status: "ACTIVE" },
    { id: 2, status: "INACTIVE" },
    { id: 3, status: "DELETED" }
  ]

  roles: any = [
    { id: 1, role: "ADMIN" },
    { id: 2, role: "MANAGER" },
    { id: 3, role: "EMPLOYEE" }
  ]
  address: AddressModel;
  hide: boolean = true;
  userRegisterForm;
  user: UserModel;
  isValid = true;

  ngOnInit() {
    this.userRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required]],
      gender: ['MALE', [Validators.required]],
      addressModel: this.formBuilder.group({
        id: ['']
      }),
      roleModel: this.formBuilder.group({
        id: ['', [Validators.required]]
      }),
      branchModel: this.formBuilder.group({
        branchCode: ['', [Validators.required]]
      }),
      rowStatusModel: this.formBuilder.group({
        id: ['', [Validators.required]]
      })
    })
    this.branchService.getAllBranches().subscribe((data) => { this.branches = data }, (error) => { console.log(error) });
  }

  getAddressId(value) {
    this.addressId = value;
    this.matStepper.next();
    this.userRegisterForm.patchValue({
      addressModel: {
        id: value
      }
    });
  }
  getEmailErrors() {
    if (this.userRegisterForm.get('email').hasError('required')) {
      return "Email Required"
    }
    return this.userRegisterForm.get('email').hasError('pattern') ? "Enter Valid Email" : "";
  }
  onSubmit() {
    console.log(this.userRegisterForm.value);
    if (this.userRegisterForm.valid) {
      this.user = this.userRegisterForm.value;
      this.userService.createUser(this.user).subscribe(
        (data) => {
          this.user = data; console.log(this.user);
          this.snackBar.open("User Registration success", "OK", { duration: 3000 });
          this.location.back();
        },
        (error) => { console.log(error) }
      );
    }
    else
      this.snackBar.open("Please Fill All Mandatory Fields", "OK", { duration: 2000 })
  }
}
