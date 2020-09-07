import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BranchModel } from './../../../../interfaces/BranchModel';
import { MatTableDataSource } from '@angular/material/table';
import { BranchService } from './../../../core/services/branch.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  constructor( private branchService: BranchService) { }

@ViewChild(MatPaginator,{static:true}) paginator :MatPaginator;
@ViewChild(MatSort, {static:true}) sort:MatSort;
  branches:BranchModel[];
  dataSource = new MatTableDataSource();
  ngOnInit() {

    this.branchService.getAllBranches().subscribe(
      (data)=>{ this.branches = data;
      this.dataSource = new MatTableDataSource(this.branches);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
      ,
      (error)=>{console.log(error)}
    )
  }

  customersByBranch(branchCode){

    window.alert(branchCode);
  }

  branchColumns:string[]=['name','branchCode','phoneNo','city','state','country','customers'];
}
