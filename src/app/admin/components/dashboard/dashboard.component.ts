import { UserService } from './../../../core/services/user.service';
import { CustomerService } from './../../../core/services/customer.service';
import { BranchService } from './../../../core/services/branch.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
     private branchService:BranchService,
     private customerService:CustomerService,
     private userService: UserService
    
    ) { }

  ngOnInit() {
  }

}
