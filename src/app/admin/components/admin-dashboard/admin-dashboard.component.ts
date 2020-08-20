import { ComplaintService } from './../../../core/services/complaint.service';
import { CustomerService } from './../../../core/services/customer.service';
import { BranchService } from './../../../core/services/branch.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

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

  constructor(
    private branchService: BranchService,
    private customerService: CustomerService,
    private userService: UserService,
    private complaintService: ComplaintService
  ) { }

  ngOnInit() {
  }

}
