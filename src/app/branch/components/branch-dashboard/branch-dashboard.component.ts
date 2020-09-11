import { LoanService } from './../../../core/services/loan.service';
import { Router } from '@angular/router';
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
  loansCount = 0;
  branchModel: BranchModel;


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
  branchId: number;

  constructor(private branchService: BranchService,
    private customerService: CustomerService,
    private userService: UserService,
    private complaintService: ComplaintService,
    private loanService: LoanService,
    private router: Router
  ) { }

  ngOnInit() {

    this.branchId = +localStorage.getItem("branchId");
    this.branchService.getBranchById(this.branchId).subscribe(
      (data) => { this.branchModel = data; }
    )
    this.customerService.getCustomersCountByBranchId(this.branchId).subscribe(
      (data) => { this.customersCount = data }
    );
    this.userService.getUsersCountByBranchId(this.branchId).subscribe(
      (data) => { this.usersCount = +data }
    );

    this.loanService.getAllLoansCountByBranchId(this.branchId).subscribe(
      (data) => {
        this.loansCount = data;
      }
    )

    this.complaintService.getComplaintsCountByStatusIdAndBranchId(10, this.branchId).subscribe(
      (data) => {
        this.complaintData[0].value = +data;
        this.complaintData = [].concat(this.complaintData);
      }
    );
    this.complaintService.getComplaintsCountByStatusIdAndBranchId(2, this.branchId).subscribe(
      (data) => {
        this.complaintData[1].value = +data;
        this.complaintData = [].concat(this.complaintData);
      }
    );
    this.complaintService.getComplaintsCountByStatusIdAndBranchId(5, this.branchId).subscribe(
      (data) => {
        this.complaintData[2].value = +data;
        this.complaintData = [].concat(this.complaintData);
      }
    );
  }

  viewCustomers() {
    this.router.navigateByUrl("branch/customers");
  }

  viewUsers() {
    this.router.navigateByUrl("branch/users");
  }
  viewComplaints() {
    this.router.navigateByUrl("branch/complaints");
  }
  viewLoans() {
    this.router.navigateByUrl("branch/loans");
  }

}
