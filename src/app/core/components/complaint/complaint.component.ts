import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplaintModel } from './../../../../interfaces/ComplaintModel';
import { ComplaintService } from './../../services/complaint.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  complaint: ComplaintModel;
  createComplaintForm: FormGroup;
  accountNumber: number;

  constructor(
    private complaintService: ComplaintService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.accountNumber = +localStorage.getItem("accountNumber");
    this.accountNumber = 11119;
    this.createComplaintForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      statusModel: this.formBuilder.group({
        id: [10, [Validators.required]]
      }),
      customerModel: this.formBuilder.group({
        accountNo: [this.accountNumber, [Validators.required]]
      })
    })
  }

  onSubmit() {
    if (this.createComplaintForm.valid) {
      this.complaint = this.createComplaintForm.value;
      console.log(this.complaint);
      this.complaintService.createComplaint(this.complaint).subscribe(
        (data)=>{this.complaint = data;
          this.snackbar.open("Complaint Raised, Reference id: "+this.complaint.id, "OK", { duration: 5000 });
        },
        (error)=>{console.log(error)}
      );
    }
    else
      this.snackbar.open("Please fill the required field", "OK", { duration: 3000 });
  }
}