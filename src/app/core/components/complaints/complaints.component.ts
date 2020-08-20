import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintModel } from '../../../../interfaces/ComplaintModel';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  constructor(private complaintService: ComplaintService) { }
  complaints: ComplaintModel[];

  ngOnInit() {
    console.log("calling complaints");
    this.complaintService.getAllComplaints().subscribe(
      (data) => {
        this.complaints = data;
        console.log(this.complaints);
      },
      (error) => {
        console.log(error)
      }
    )
  }
}