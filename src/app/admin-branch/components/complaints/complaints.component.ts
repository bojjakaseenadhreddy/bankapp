import { Router } from '@angular/router';
import { ComplaintService } from './../../../core/services/complaint.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplaintModel } from '../../../../interfaces/ComplaintModel';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  constructor(private complaintService: ComplaintService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sorter: MatSort;
  complaints: ComplaintModel[];
  dataSource: MatTableDataSource<ComplaintModel>;
  columnsToDisplay: string[] = ["id", "user", "description", "raised", "updated", "status", "action"];
  isAdmin: boolean = false;

  filterId: string = "";
  filterName: string = "";
  filterStatus: string = "";
  filterDescription: string = "";
  filterRaisedDate = "";

  maxDate: Date = new Date();
  filterColumns = [
    false,
    false,
    false,
    false,
    false,
    false
  ];

  ngOnInit() {
    console.log("calling complaints");
    if (localStorage.getItem("role").toLowerCase() === "admin") {
      this.isAdmin = true;
    }

    if (this.isAdmin) {
      this.complaintService.getAllComplaints().subscribe(
        (data) => {
          this.assignRemoteData(data);
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      const branchId = +localStorage.getItem("branchId");
      this.complaintService.getComplaintsByBranchId(branchId).subscribe(
        (data) => {
          this.assignRemoteData(data);
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
  assignRemoteData(data) {
    this.complaints = data;
    this.dataSource = new MatTableDataSource(this.complaints);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sorter;

    this.dataSource.sortingDataAccessor = (data, header) => {
      switch (header) {
        case 'status': return data.statusModel.name;
        case 'user': return data.customerModel.name;
        case 'raised': return new Date(data.raisedDate);
        case 'updated': return new Date(data.updatedDate);
        default: return data[header];
      }
    }

    this.dataSource.filterPredicate = (data, filterValue: string): boolean => {
      return data.id.toString().includes(this.filterId) &&
        data.statusModel.name.toLowerCase().includes(this.filterStatus) &&
        data.description.toLowerCase().includes(this.filterDescription) &&
        data.customerModel.name.toLowerCase().includes(this.filterName) &&
        this.raisedDateFilter(data);
    }
    console.log(this.complaints);
  }

  filterByRaisedDate(startDate, endDate) {
    console.log()
    let value = startDate.length + endDate.length == 0 ? "" : startDate + "#" + endDate;
    this.filterRaisedDate = value;
    this.invokeFilter();
  }


  filterById(value) {
    value = value.length == 0 ? "" : value;
    this.filterId = value;
    this.invokeFilter();

  }

  filterByName(value) {
    value = value.length == 0 ? "" : value;
    this.filterName = value;
    this.invokeFilter();

  }
  filterByDescription(value) {
    value = value.length == 0 ? "" : value;
    this.filterDescription = value;
    this.invokeFilter();

  }
  filterByStatus(event) {
    let value = event.target.value;
    value = value.length == 0 ? "" : value;
    this.filterStatus = value;
    this.invokeFilter();
  }

  invokeFilter() {
    this.dataSource.filter = "data";
  }

  raisedDateFilter(data) {
    if (this.filterRaisedDate.length >= 9 && this.filterRaisedDate.length <= 11) {
      console.log("checked only start date" + this.filterRaisedDate.slice(0, this.filterRaisedDate.indexOf("#")));
      return (new Date(data.raisedDate.toString()) >= new Date(this.filterRaisedDate.slice(0, this.filterRaisedDate.indexOf("#"))));
    }
    else if (this.filterRaisedDate.length >= 17) {
      return ((new Date(data.raisedDate.toString()) >= new Date(this.filterRaisedDate.slice(0, this.filterRaisedDate.indexOf("#")))) && (new Date(data.raisedDate.toString().slice(0, 10)) <= new Date(this.filterRaisedDate.slice(this.filterRaisedDate.indexOf("#") + 1))));
    }
    else
      return true;
  }

  updateComplaint(id: number) {
    if (this.isAdmin) {
      this.router.navigateByUrl('admin/update-complaint/' + id);
    }
    else {
      this.router.navigate(['branch', 'update-complaint', id]);
    }
  }
}