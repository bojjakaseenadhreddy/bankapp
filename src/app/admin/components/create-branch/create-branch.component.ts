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
  rowStatuses:RowStatusModel[] = ROW_STATUSES;
  isSaving:boolean = false;
  addressId:number;
  isExpanded:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private branchService: BranchService,
    private addressService: AddressService
  ) { }

  ngOnInit() {

     this.createBranchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      addressModel: this.formBuilder.group({
        id: ['', [Validators.required]]
      }),
      rowStatusModel:this.formBuilder.group({
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
        (data) => { this.branchModel = data; console.log(this.branchModel);this.isSaving = false;},
        (error) => { console.log(error) }
      )
    }
  }

  getAddressId(value){
    this.addressId = value;
    this.isExpanded = false;
    this.createBranchForm.patchValue({
      addressModel:{
        id:value
      }
    })
  }
}
