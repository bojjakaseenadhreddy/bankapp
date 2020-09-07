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

  constructor(private complaintService: ComplaintService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sorter: MatSort;
  complaints: ComplaintModel[];
  dataSource: MatTableDataSource<ComplaintModel>;
  columnsToDisplay: string[] = ["id", "user", "description", "raised", "updated", "status"];

  filterId: string = "";
  filterName: string = "";
  filterStatus: string = "";
  filterDescription = "";
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
    this.complaintService.getAllComplaints().subscribe(
      (data) => {
        this.complaints = data;
        this.dataSource = new MatTableDataSource(this.complaints);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sorter;
        this.dataSource.filterPredicate = (data, filterValue: string): boolean => {
          return data.id.toString().includes(this.filterId) &&
            data.statusModel.name.toLowerCase().includes(this.filterStatus) &&
            data.description.toLowerCase().includes(this.filterDescription) &&
            data.customerModel.name.toLowerCase().includes(this.filterName) &&
            this.raisedDateFilter(data);
        }
        console.log(this.complaints);
      },
      (error) => {
        console.log(error)
      }
    )
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
}