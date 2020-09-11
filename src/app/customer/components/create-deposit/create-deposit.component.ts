import { Component, OnInit } from '@angular/core';
import { DepositModel } from '../../../../interfaces/DepositModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepositService } from './../../../core/services/deposit.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.component.html',
  styleUrls: ['./create-deposit.component.css']
})
export class CreateDepositComponent implements OnInit {

  deposits: DepositModel[];
  depositModel: DepositModel;
  createDepositForm: FormGroup;
  isSaving = false;
  isSaved = false;
  constructor(private depositService: DepositService, private fb: FormBuilder, private snackBar: MatSnackBar) { }
  accountNumber=localStorage.getItem('accountNo')
  ngOnInit(): void {
    this.createDepositForm = this.fb.group({
      depositAmount: ['', Validators.required],
      customerModel: this.fb.group({
        accountNo: [this.accountNumber, Validators.required]
      })
    })

  }
  onSubmit() {
    console.log(this.createDepositForm.value);
    if (!this.createDepositForm.errors) {
      this.isSaving = true;
      this.depositModel = this.createDepositForm.value;
      this.depositService.createDeposit(this.depositModel).subscribe((data) => {
        this.depositModel = data;
        console.log("Data " + data)
        this.isSaving = false;
        this.isSaved = true;
      }, (error) => {
        console.log(error)
      });
    }
    if(this.isSaved) {
        this.openSnackBar();
    }
  }
  openSnackBar() {
    this.snackBar.open("Deposit Success", "close", {
      duration: 2000,
    });
  }


/*
  videoList = [
    {
      'id':1,
      'title':'Lower Extremities',
      'nodes': [
          {
            'id':11,
            'title':'first node',
            'nodes': "[]"
          },
          {
            'id':12,
            'title':'Second node',
            'nodes': "[]"
          }
      ]
    },
    {
      'id':2,
      'title':'hellloooo e',
      'nodes': [
        {
          'id':13,
          'title':'three',
          'nodes': "[]"
        },
        {
          'id':14,
          'title':'four',
          'nodes': "[]"
        }
      ]
    },
    {
      'id':3,
      'title':'third node',
      'nodes': [
        {
          'id':15,
          'title':'five',
          'nodes': "[]"
        },
        {
          'id':16,
          'title':'six',
          'nodes': "[]"
        }
      ]
    }
  ];
*/



projects = [
  {
  projectName:"TitanDataMart",
  dbName:"titandatamart",
  schemaName:"titanqa",
  tables: [
  "dim_member",
  "dim_sponsor",
  "dim_product",
  "dim_avaproduct",
  "dim_monthlycc",
  "dim_yearlycc",
  "dim_operatingcompany",
  "dim_productcategeory",
  "dim_location",
  "dim_status",
  "dim_shipping",
  "fact_orderdetails"]
  },
  {
  projectName:"Nextivo",
  dbName:"nextivodatamart",
  schemaName:"nextivoqa",
  tables: [
  "dim_member",
  "dim_sponsor",
  "dim_product",
  "dim_avaproduct",
  "dim_monthlycc"]
  }
  ]

}





