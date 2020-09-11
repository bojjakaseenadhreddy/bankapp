import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintModel } from '../../../../interfaces/ComplaintModel';
import { STATUSES } from '../../constants/status.constant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-complaint',
  templateUrl: './update-complaint.component.html',
  styleUrls: ['./update-complaint.component.css']
})
export class UpdateComplaintComponent implements OnInit {
  statusId: number;
  complaintId: number;
  complaintModel: ComplaintModel;
  updateComplaintForm:FormGroup;
  isUpdated=false;
  statuses=[
    {id:2,name:'PROCESSING'},
    {id:5,name:'RESOLVED'},{id:10 ,name:'RAISED'}
  ]

  constructor(private formBuilder: FormBuilder,private complaintService:ComplaintService,private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    this.updateComplaintForm=this.formBuilder.group({
      id:[''],
      description:[''],
      customerModel:this.formBuilder.group({
        accountNo:['',[Validators.required]]
      }),
      rowStatusModel:this.formBuilder.group({
        id:['',Validators.required]
      })
    })

    this.complaintService.getComplaintById(1).subscribe((data)=>{
      this.complaintModel=data;
      this.complaintData();
    }
    ),(error)=>{
      console.log(error)
    }
  }


 complaintData(){
  this.updateComplaintForm.patchValue({
    id:this.complaintModel.id,
    description:this.complaintModel.description,
    customerModel:{
      accountNo:this.complaintModel.customerModel.accountNo
    },
    rowStatusModel:{
      id:this.complaintModel.statusModel.id
    }
  });
 }

 openSnackBar() {
  this.snackBar.open(`Status Updated successfully`, "close", {
    duration: 2000,
    verticalPosition: 'top',
    panelClass: 'notif-success'
  });
}

 onSubmit(){
   console.log("inside submit..");
   console.log(this.updateComplaintForm);
   this.complaintModel=this.updateComplaintForm.value;
   this.statusId=this.updateComplaintForm.controls['rowStatusModel'].value.id;
  //  this.Form.get(['user','name']).value;
   console.log(this.statusId);
   //this.complaintId
  this.complaintService.updateComplaintStatusById(this.statusId,this.complaintModel.id,this.complaintModel).subscribe(
    (data)=>{
      console.log(data);
      if(data==1){
        this.complaintService.getComplaintById(this.complaintModel.id).subscribe((data)=>{
          this.complaintModel=data;
          this.complaintData();
        }
        ),(error)=>{
          console.log(error)
        }
        this.openSnackBar() ;
      }

    },(error)=>{
      console.log(error);
    }
  );
 }
}
