import { BranchModel } from './../../../../interfaces/BranchModel';
import { ComplaintService } from './../../../core/services/complaint.service';
import { UserService } from './../../../core/services/user.service';
import { CustomerService } from './../../../core/services/customer.service';
import { BranchService } from './../../../core/services/branch.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataModel } from 'src/interfaces/ChartDataModel';

@Component({
  selector: 'app-branch-dashboard',
  templateUrl: './branch-dashboard.component.html',
  styleUrls: ['./branch-dashboard.component.css']
})
export class BranchDashboardComponent implements OnInit {

  customersCount = 0;
  usersCount = 0;
  branchBalance = 0;
  branchModel: BranchModel;
  branchId = 1;

  complaintData: ChartDataModel[] = [
    { name: "Raised", value: 0 },
    { name: "Processing", value: 0 },
    { name: "Resolved", value: 0 }
  ];

  ui: any[] = [270, 250];
  showLegend: boolean = true;
  showLabels: boolean = true;
  legendPosition: string = 'below';
  gradient = false;

  constructor(private branchService: BranchService, private customerService: CustomerService, private userService: UserService, private complaintService: ComplaintService) { }

  ngOnInit() {

    //this.branchId = +localStorage.getItem("branchId");
    this.branchService.getBranchById(this.branchId).subscribe(
      (data) => { this.branchModel = data; }
    )
    this.customerService.getCustomersCount().subscribe(
      (data) => { this.customersCount = data }
    );
    this.userService.getUsersCount().subscribe(
      (data) => { this.usersCount = +data }
    );
    this.complaintService.getComplaintsCountByStatusIdAndBranchId(10, this.branchId).subscribe(
      (data) => { this.complaintData[0].value = +data; }
    );
    this.complaintService.getComplaintsCountByStatusIdAndBranchId(2, this.branchId).subscribe(
      (data) => { this.complaintData[1].value = +data; }
    );
    this.complaintService.getComplaintsCountByStatusIdAndBranchId(5, this.branchId).subscribe(
      (data) => { this.complaintData[2].value = +data; this.complaintData = [].concat(this.complaintData); }
    );
  }

  viewCustomers() {

  }

  viewUsers() {

  }

}
