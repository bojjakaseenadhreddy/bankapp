import { Component, OnInit, ViewChild } from '@angular/core';
import { LoanService } from '../../../core/services/loan.service';
import { LoanModel } from '../../../../interfaces/LoanModel';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerModel } from '../../../../interfaces/CustomerModel';
import { StatusModel } from '../../../../interfaces/StatusModel';
import { LoanTypeModel } from '../../../../interfaces/LoanTypeModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { count } from '@swimlane/ngx-charts';



@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  displayedColumns: string[] = ['id', 'customerAccountNo', 'loanAmount', 'loanType', 'status', 'action'];
  dataSource = new MatTableDataSource<LoanModel>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  loansModels: LoanModel[];
  loanModel: LoanModel;
  show = false;
  id: number;
  idArray: Array<number> = [];
  previousId: number
  selected: string;
  selectedValue: string;
  statusArray: Array<{ id: number, old: string, current: string }> = [];
  count = 0;
  display = false;
  isReset = false;


  constructor(private loansService: LoanService) { }

  ngOnInit(): void {
    this.loansService.getAllLoans().subscribe((data) => {
      this.loansModels = data;
      this.dataSource = new MatTableDataSource<LoanModel>(this.loansModels);
      this.dataSource.sortingDataAccessor = (item, property) => {
        //  console.log("custom sorting")
        switch (property) {
          case 'customerAccountNo': return item.customerModel.accountNo;
          case 'status': return item.statusModel.name;
          case 'loanType': return item.loanTypeModel.name;
          default: return item[property];
        }
      }
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data, filter: string) => {

        return data.customerModel.accountNo === +filter || data.loanTypeModel.name.toLowerCase().includes(filter) ||
          data.statusModel.name.toLowerCase().includes(filter);
      }
    }, (error) => {
      console.log(error);
    });

  }
  applyFilter(filterValue: string) {
    //const filterValue = (event.target as HTMLInputElement).value;
    console.log("inside apply filter ")
    filterValue = filterValue.trim().toLowerCase(); // Remove whitespace
    // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(filterValue);
  }
  showDropdown(id: number) {
    //console.log("Inside DropDown.." + this.show)

    if (this.idArray.length > 0) {
      if (this.idArray.includes(id))
        return false;
      else
        return true;
    } else {
      return true;
    }
  }
  selectedStatus(id: number, status: string) {
    console.log("status" + status + "" + "id::" + id);
    let value = "";
    this.statusArray.forEach(model => {
      // console.log(model.id == id);
      if (model.id == id) {
        if (status == undefined) {
          value = model.old;
        }
        else {
          value = model.current;
          // value = status;
          // model.current = value;
          // // if (model.current == model.old) {
          // //   value = model.old;
          // //   console.log("inside equal...");
          // //   //return value;
          // // }
          // if (model.old != model.current) {
          //   this.displayUpdate(id);
          // }
          // if (model.old === status) {
          //   value = status;
          // } else {
          //   this.displayUpdate(id);
          // }

        }
      }
    });
    console.log("Value::" + value);
    //  return value;
    return value;
  }
  displayUpdate(id: number): boolean {
    //let isTrue = false;
    if (this.statusArray.length < 0) {
      return false;
    } else {
      this.statusArray.forEach(model => {
        if (model.id == id) {
          return true;
        }
        else { false }
      })
    }


    // if (this.statusArray.length > 0) {
    //   this.statusArray.forEach(model => {
    //     if (model.id == id && model.old != model.current) {
    //       console.log("inside displayupdate::" + id);
    //       isTrue = true;
    //     }
    //   });
    // }
    // // console.log("isTrue::"+isTrue);
    // return isTrue;
  }
  changeSelected(id: number, selected: string) {
    // console.log("inside changeselected selected.." + selected);
    // console.log("id::" + id);
    // this.selectedStatus(id, selected);
    this.statusArray.forEach(model => {
      if (model.id == id) {
        model.current == selected;
      }
    })
    this.statusArray = [].concat(this.statusArray);
  }
  editLoanButton(id: number, status: string) {
    this.idArray.push(id);
    this.statusArray.push({
      id: id,
      old: status,
      current: status
    });
    // this.show = true;
    // this.showDropdown(id);
  }

  updateStatus(id: number) {
    this.statusArray.forEach(model => {
      if (model.id == id) {
        console.log("oldValue::" + model.old);
        console.log("current::" + model.current);
        // this.loansService.updateLoanStatus()
      }
    });
  }
  resetStatus(id: number) {
    console.log("inside reset:...+++++");
    this.isReset = true;

    //   this.statusArray.forEach(model => {
    //     if (model.id == id) {
    //       this.selectedStatus(id, model.old);
    //       //model.current=model.old;
    //     }
    //   });
    //   this.statusArray = [].concat(this.statusArray);
    // }
  }
}
