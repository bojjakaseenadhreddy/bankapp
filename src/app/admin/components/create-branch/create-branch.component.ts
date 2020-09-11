import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ROW_STATUSES } from './../../../core/constants/row-status.constant';
import { RowStatusModel } from './../../../../interfaces/RowStatusModel';
import { BranchModel } from './../../../../interfaces/BranchModel';
import { AddressService } from '../../../core/services/address.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BranchService } from './../../../core/services/branch.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.css']
})
export class CreateBranchComponent implements OnInit {

  branchModel: BranchModel;
  createBranchForm: FormGroup;
  rowStatuses: RowStatusModel[] = ROW_STATUSES;
  isSaving: boolean = false;
  addressId: number;
  isExpanded: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private branchService: BranchService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {

    this.createBranchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      addressModel: this.formBuilder.group({
        id: ['', [Validators.required]]
      }),
      rowStatusModel: this.formBuilder.group({
        id: ['', [Validators.required]]
      })
    })
  }


  onSubmit() {

    console.log(this.createBranchForm.value)
    if (this.createBranchForm.valid) {
      this.isSaving = true;
      this.branchModel = this.createBranchForm.value;
      this.branchService.createBranch(this.branchModel).subscribe(
        (data) => {
          this.branchModel = data;
          console.log(this.branchModel);
          this.isSaving = false;
          this.snackbar.open("Branch added successfully", "OK", { duration: 3000 });
          this.router.navigateByUrl("admin/branches");
        },
        (error) => {
          console.log(error);
          this.snackbar.open("Something went wrong, please try again", "OK", { duration: 4000 });
          this.router.navigateByUrl("admin/branches");
        }
      )
    } else {
      this.snackbar.open("Please fill required fields", "OK", { duration: 3000 });
    }
  }

  getAddressId(value) {
    this.addressId = value;
    this.isExpanded = false;
    this.createBranchForm.patchValue({
      addressModel: {
        id: value
      }
    })
  }
}
