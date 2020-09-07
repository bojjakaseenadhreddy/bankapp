import { Component, OnInit, ViewChild } from '@angular/core';
import { WithdrawService } from '../../../core/services/withdraw.service';
import { WithdrawModel } from '../../../../interfaces/WithdrawModel';
import { map, combineLatest, tap, mergeMap } from 'rxjs/operators';
import { filter } from 'minimatch';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DepositService } from '../../../core/services/deposit.service';
import { TransferService } from '../../../core/services/transfer.service';
import { TransactionModel } from '../../../../interfaces/TransactionModel';
import { TransferModel } from '../../../../interfaces/TransferModel';
import { DepositModel } from '../../../../interfaces/DepositModel';

import { Observable, timer, forkJoin, range } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['money', 'date', 'name'];
  dataSource = new MatTableDataSource();
  withdrawModels: WithdrawModel[];
  depositModels: DepositModel[];
  transferModels: TransferModel[];
  transactionModels: TransactionModel[] = [];
  selected: any;
  type: any;
  startDate: any;
  endDate: any;
  value: any;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(private withdrawService: WithdrawService, private depositService: DepositService, private transferService: TransferService) {
    // console.log("inside construtor");
    this.endDate = "";
    this.startDate = "";
    this.selected = "";
    this.type = "";
    this.value = "";
  }
  get fromDate() {
    this.startDate = this.range.get('start').value
    return this.range.get('start').value;
  }
  get toDate() {
    this.endDate = this.range.get('end').value;
    return this.range.get('end').value;
  }

  ngOnInit(): void {
    // console.log("ngon init");
    const withdraws = this.withdrawService.getAllWithdraws();
    const deposits = this.depositService.getAllDeposits();
    const transfers = this.transferService.getAllTransfers();

    forkJoin([withdraws, deposits, transfers]).subscribe(results => {
      //tap(results=>console.log(results));
      results.forEach((result: Array<any>, index) => {
        result.forEach((model) => {
          if (index === 0) {
            this.transactionModels.push({
              date: model.withdrawDate,
              money: model.withdrawAmount,
              status: model.statusModel,
              type: 'withdraw'
            })

          }
          else if (index === 1) {
            this.transactionModels.push({
              date: model.transactionDate,
              money: model.depositAmount,
              status: model.statusModel,
              type: 'deposit'
            })
          }
          else if (index == 2) {
            this.transactionModels.push({
              date: model.transferDate,
              money: model.amount,
              status: model.statusModel,
              type: 'transfer'
            })
          }
        });
      });

      this.dataSource = new MatTableDataSource(this.transactionModels);
      /* this.dataSource.sortingDataAccessor = (item: TransactionModel, property) => {
         //  console.log("custom sorting")
         switch (property) {
           case 'name': return item.status.name;
           case 'money': return item.money;
           case 'date': return item.date;
           default: return item[property];
         }
       }
       this.dataSource.sort = this.sort;*/
      this.dataSource.filterPredicate = (data: TransactionModel, filter: string) => {
        console.log("inside filter predicate");
        var year = new Date(data.date).getFullYear();
        var month = new Date(data.date).getMonth();


        //moment().format('L');\




        //         return data.status.name.toLowerCase().includes(this.selected) && data.type.toLowerCase().includes(this.type) && money.includes(this.value)
        // &&( (moment(data.date).format('L') <= moment(this.toDate).format('L')&&
        // moment(data.date).format('L') >= moment(this.fromDate).format('L')));
        if (this.toDate && this.fromDate) {

          console.log(moment(this.toDate).format('L'));
          console.log("09/15/2020" >= "09/14/2020")
          console.log(moment(data.date).format('L'));
          //  console.log("lessthan::  data.date"+moment(data.date).format('L')+"data.toDate:: "+moment(this.toDate).format('L') +"  "+ moment(data.date).format('L') <= moment(this.toDate).format('L'));
          //  console.log("greaterthan::  data.date"+moment(data.date).format('L')+"data.fromDate:: "+moment(this.fromDate).format('L') +"  "+ moment(data.date).format('L')>= moment(this.fromDate).format('L'));

          return moment(this.fromDate).format('L') <= moment(data.date).format('L') && moment(data.date).format('L') <= moment(this.toDate).format('L');
        }

        console.log((moment(data.date).format('L') <= moment(this.toDate).format('L')));
        var money = +data.money + "";
        money.toString();
        console.log(this.selected);
        console.log("category::" + data.status.name.toLowerCase().includes(this.selected));
        console.log("type::" + data.type.toLowerCase().includes(this.type));
        console.log("money::" + money.toString().includes(this.value));
        console.log("month::" + moment().month(month).format('MMM').concat("" + year).toLowerCase().includes(this.value));
        if (this.selected === undefined) {
          console.log("this.selected");
        }
        return data.status.name.toLowerCase().includes(this.selected) && data.type.toLowerCase().includes(this.type) && money.trim().includes(this.value)


      }
    },
      (error) => {
        console.log(error);
      });
  }
  applyFilter(filterValue: string) {
    // this.range.reset();
    //const filterValue = (event.target as HTMLInputElement).value;
    console.log("inside apply filter ")
    filterValue = filterValue.trim().toLowerCase(); // Remove whitespace
    this.value = filterValue; // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    // filterValue='';
    console.log(filterValue);
  }
  
  applyDateFilter() {
    //console.log("inside apply date filter");
    //console.log("Math.random()"+Math.random());
    this.dataSource.filter = '' + 0;
  }
  changeSelected(selected) {
    console.log("selected value ::" + selected);
    this.dataSource.filter = selected;
    // this.selected='';
  }
  applyCategory(type: string) {
    console.log("category value::" + type);
    this.dataSource.filter = type;
    //this.type='';
  }
}
