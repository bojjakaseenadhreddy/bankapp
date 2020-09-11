import { Router } from '@angular/router';
import { CustomerModel } from './../../../../interfaces/CustomerModel';
import { CustomerService } from './../../../core/services/customer.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { config } from 'rxjs';
import { AddressDialogComponent } from 'src/app/shared/components/address-dialog/address-dialog.component';
import { BranchDialogComponent } from 'src/app/shared/components/branch-dialog/branch-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomersComponent implements OnInit {

  customers: CustomerModel[];
  customerColumns: string[] = ['accountNo', 'name', 'DOB', 'email', 'branch', 'account', 'status', 'action'];

  dataSource = new MatTableDataSource<CustomerModel>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sorting: MatSort;

  constructor(private customerService: CustomerService, private dialog: MatDialog, private router: Router) { }
  ngOnInit() {

    this.customerService.getAllCustomers().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<CustomerModel>(data);
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = function (data, filterValue: string): boolean {
          return data.accountTypeModel.name.toLowerCase().includes(filterValue);
        }

        this.dataSource.sortingDataAccessor = (item, property) => {
          console.log(item);
          console.log(property);
          switch (property) {
            case 'DOB': return new Date(item.dob);
            case 'status': return item.statusModel.name;
            default: return item[property]
          }
        }
        this.dataSource.sort = this.sorting;
        this.customers = data;
        console.log(this.customers);
      },
      (error) => { console.log(error) }
    )
    console.log(this.dataSource.paginator);
  }

  customerEdit(accountNumber) {
    this.router.navigateByUrl(`branch/update-customer/${accountNumber}`);

  }

  viewAddress(address) {
    this.dialog.open(AddressDialogComponent, { data: address })
  }
  viewBranch(branch) {
    this.dialog.open(BranchDialogComponent, { data: branch })
  }

  filterData(value) {
    this.dataSource.filter = value;
  }
}