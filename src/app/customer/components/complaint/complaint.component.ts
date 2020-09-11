import { IDeactivateComponent } from './../../../../interfaces/IDeactivateComponent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplaintModel } from './../../../../interfaces/ComplaintModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/core/services/complaint.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit, IDeactivateComponent {

  complaint: ComplaintModel;
  createComplaintForm: FormGroup;
  accountNumber: number;

  constructor(
    private complaintService: ComplaintService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) { }


  ngOnInit() {
    this.accountNumber = +localStorage.getItem("accountNo");

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
        (data) => {
          this.complaint = data;
          this.snackbar.open("Complaint Raised, Reference id: " + this.complaint.id, "OK", { duration: 5000 });
        },
        (error) => { console.log(error) }
      );
    }
    else
      this.snackbar.open("Please fill the required field", "OK", { duration: 3000 });
  }
  isSaved(): boolean {
    this.snackbar.open("save method", "OK", { duration: 3000 });

    console.log("checking dirty");
    window.alert("hey i am checking");
    window.confirm("Your changes will not be saved, please save");
    if (this.createComplaintForm.dirty) {
      if (window.confirm("Your changes will not be saved, please save")) {
        return true;
      }
      else
        return false;
    }
    else {
      return true;
    }
  }
}