import { MatDialog } from '@angular/material/dialog';
import { UserModel } from './../../../../interfaces/UserModel';
import { UserService } from './../../../core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressDialogComponent } from 'src/app/shared/components/address-dialog/address-dialog.component';
import { BranchDialogComponent } from 'src/app/shared/components/branch-dialog/branch-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource();
  users: UserModel[];
  isAdmin: boolean = false;
  userColumns: string[] = ['name', 'phone', 'email', 'gender', 'branch', 'role', 'status', 'action'];
  constructor(private userService: UserService, private dialog: MatDialog, private route: Router) { }

  ngOnInit() {
    if (localStorage.getItem('role').toLowerCase() === "admin") {
      this.isAdmin = true;
    }
    if (this.isAdmin) {
      this.userService.getAllUsers().subscribe(
        (data) => {
          this.assignRemoteData(data);
        },
        (error) => { console.log(error) }
      )
    } else {
      const branchId = +localStorage.getItem('branchId');
      this.userService.getAllUsersByBranchId(branchId).subscribe(
        (data) => {
          this.assignRemoteData(data);
        },
        (error) => { console.log(error) }
      )
    }

  }
  viewAddress(address) {
    this.dialog.open(AddressDialogComponent, { data: address });
  }
  viewBranch(branch) {
    this.dialog.open(BranchDialogComponent, { data: branch });
  }

  addUser() {
    if (this.isAdmin)
      this.route.navigateByUrl(`admin/register-user`);
    else
      this.route.navigateByUrl(`branch/register-user`);
  }
  assignRemoteData(data) {
    this.users = data;
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editUser(userId: number) {
    if (this.isAdmin)
      this.route.navigateByUrl(`admin/update-user/${userId}`);
    else
      this.route.navigateByUrl(`branch/update-user/${userId}`);
  }
}