import { Routes, Route, ActivatedRoute } from '@angular/router';
import { BranchModel } from './../../../../interfaces/BranchModel';
import { BranchService } from './../../../core/services/branch.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ROW_STATUSES } from '../../../core/constants/row-status.constant';
import { RowStatusModel } from '../../../../interfaces/RowStatusModel';

@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.css']
})
export class UpdateBranchComponent implements OnInit {

  updateBranchForm: FormGroup;
  branchModel: BranchModel;
  branchCode: number;
  rowStatuses:RowStatusModel[] = ROW_STATUSES;
  isSaving:boolean = false;

  constructor(private formBuilder: FormBuilder, private branchService: BranchService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.updateBranchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      addressModel: this.formBuilder.group({
        id: ['', [Validators.required]]
      }),
      rowStatusModel: this.formBuilder.group({
        id: ['', [Validators.required]]
      })
    })
   // this.branchCode = +this.route.snapshot.paramMap.get('code');
    this.branchCode = 1;
    this.branchService.getBranchById(this.branchCode).subscribe(
      (data) => { this.branchModel = data; this.patchData() },
      (error) => { console.log(error) }
    )
  }

  patchData(){
    this.updateBranchForm.patchValue({
     branchCode:this.branchModel.branchCode,
     name:this.branchModel.name,
     phoneNo:this.branchModel.phoneNo,
     rowStatusModel:{ id: this.branchModel.rowStatusModel.id},
     addressModel:{id:this.branchModel.addressModel.id}
    })
  }

  onSubmit(){
    if(this.updateBranchForm.valid){
      this.isSaving = true;
      this.branchModel = this.updateBranchForm.value;
      console.log(this.branchModel);
      this.branchService.updateBranch(this.branchCode,this.branchModel).subscribe(
        (data)=>{ console.log(data); this.isSaving=false;},
        (error)=>{console.log(error)}
      )
    }
  }
}