import { UserService } from './../../../core/services/user.service';
import { BranchService } from './../../../core/services/branch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from './../../../../interfaces/UserModel';
import { BranchModel } from './../../../../interfaces/BranchModel';
import { AddressModel } from './../../../../interfaces/AddressModel';
import { Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';



@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})

export class UpdateUserComponent implements OnInit {

  constructor( private formBuilder: FormBuilder, private userService: UserService,private branchService:BranchService, private snackBar:MatSnackBar) { }


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
  userUpdateForm:FormGroup;
  user: UserModel;
  isValid=true;
  userId:number;

  ngOnInit() {


     //this.userId = +this.router.snapshot.paramMap.get("user-id");
     this.userId = 1;

    this.userUpdateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required]],
      gender: ['', [Validators.required]],
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

    this.branchService.getAllBranches().subscribe((data)=>{ this.branches=data},(error)=>{console.log(error)});
    this.userService.getUserById(this.userId).subscribe(
      (data)=>{ this.user = data; console.log(this.user); this.patchUser()},
      (error)=>{ console.log(error);}
    )
  }

  // getAddressId(value) {
  //   this.addressId = value;
  //   this.userUpdateForm.patchValue({
  //     addressModel: {
  //       id: value
  //     }
  //   });
  // }


  patchUser(){
    this.userUpdateForm.patchValue({
      id:this.userId,
      name:this.user.name,
      email:this.user.email,
      password:this.user.password,
      confirmPassword:this.user.password,
      gender:this.user.gender,
      phone:this.user.phone,
      addressModel:{
        id:this.user.addressModel.id
      },
      roleModel:{
        id:this.user.roleModel.id
      },
      rowStatusModel:{
        id:this.user.rowStatusModel.id
      },
      branchModel:{
        branchCode:this.user.branchModel.branchCode
      }
    })
  }


  getEmailErrors() {
    if (this.userUpdateForm.get('email').hasError('required')) {
      return "Email Required"
    }
    return this.userUpdateForm.get('email').hasError('pattern') ? "Enter Valid Email" : "";
  }
  onSubmit() {
    console.log(this.userUpdateForm.value);
    if(this.userUpdateForm.valid){
      this.user = this.userUpdateForm.value;
      this.userService.updateUser(this.userId,this.user).subscribe(
        (data) => {this.user = data;console.log(this.user);  this.snackBar.open("Update Success","OK",{duration:3000})},
        (error) => { console.log(error)}
        );
    }
    else
      this.snackBar.open("Please Fill All Mandatory Fields","OK",{duration:2000})
  }
}
