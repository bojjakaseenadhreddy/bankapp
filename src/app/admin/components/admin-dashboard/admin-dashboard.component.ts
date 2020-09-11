import { HttpClient } from '@angular/common/http';
import { ChartDataModel } from './../../../../interfaces/ChartDataModel';
import { ComplaintService } from './../../../core/services/complaint.service';
import { CustomerService } from './../../../core/services/customer.service';
import { BranchService } from './../../../core/services/branch.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  customers: number = 0;
  branches: number = 0;
  users: number = 0;
  complaints: number = 0;
  bankBalance: number = 0;


  propTrue: boolean = true;
  porpFalse: boolean = false;

  complaintData: ChartDataModel[] = [
    { name: "Raised", value: 0 },
    { name: "Processing", value: 0 },
    { name: "Resolved", value: 0 }
  ];
  branchBalanceData: ChartDataModel[] = [];

  ui: any[] = [270, 250];
  branchUi: any[] = [270, 250];
  showLegend: boolean = true;
  showLabels: boolean = true;
  legendPosition: string = 'below';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Branches';
  showYAxisLabel = true;
  yAxisLabel = 'Money';


  constructor(
    private branchService: BranchService,
    private customerService: CustomerService,
    private userService: UserService,
    private complaintService: ComplaintService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {

    this.customerService.getCustomersCount().subscribe(
      (data) => { this.customers = data }
    );
    this.userService.getUsersCount().subscribe(
      (data) => { this.users = +data }
    );
    this.branchService.getBranchesCount().subscribe(
      (data) => { this.branches = +data }
    );
    this.complaintService.getComplaintsCount().subscribe(
      (data) => { this.complaints = +data }
    );
    this.customerService.getBankBalance().subscribe(
      (data) => { this.bankBalance = +data }
    );
    this.complaintService.getComplaintsCountByStatusId(10).subscribe(
      (data) => {
        this.complaintData[0].value = +data;
        this.complaintData = [].concat(this.complaintData);
      }
    );
    this.complaintService.getComplaintsCountByStatusId(2).subscribe(
      (data) => {
        this.complaintData[1].value = +data;
        this.complaintData = [].concat(this.complaintData);
      }
    );
    this.complaintService.getComplaintsCountByStatusId(5).subscribe(
      (data) => {
        this.complaintData[2].value = +data;
        this.complaintData = [].concat(this.complaintData);
      }
    );
    this.branchService.getAllBranchesBalance().subscribe(
      (data) => {
        //console.log(data);
        data.forEach((content, index) => { console.log(content); this.branchBalanceData.push({ name: content[2], value: content[1] }) })
        this.branchBalanceData = [].concat(this.branchBalanceData);
      }
    );

  }

  viewCustomers() {
    this.router.navigateByUrl("admin/customers");
  }
  viewUsers() {
    this.router.navigateByUrl("admin/users");
  }
  viewBranches() {
    this.router.navigateByUrl("admin/branches");
  }
  viewLoans() {
    this.router.navigateByUrl("admin/loans");
  }
  viewComplaints() {
    this.router.navigateByUrl("admin/complaints");

  }

}
