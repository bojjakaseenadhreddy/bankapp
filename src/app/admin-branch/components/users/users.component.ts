import { MatDialog } from '@angular/material/dialog';
import { UserModel } from './../../../../interfaces/UserModel';
import { UserService } from './../../../core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressDialogComponent } from 'src/app/shared/components/address-dialog/address-dialog.component';
import { BranchDialogComponent } from 'src/app/shared/components/branch-dialog/branch-dialog.component';

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
  userColumns: string[] = ['name', 'phone', 'email', 'gender', 'branch', 'role', 'status'];
  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => { console.log(error) }
    )

  }
  viewAddress(address) {
    this.dialog.open(AddressDialogComponent, { data: address });
  }
  viewBranch(branch) {
    this.dialog.open(BranchDialogComponent, { data: branch });
  }
}
