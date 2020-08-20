import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerModel } from '../../../../interfaces/CustomerModel';

@Component({
  selector: 'app-balance-dialog',
  templateUrl: './balance-dialog.component.html',
  styleUrls: ['./balance-dialog.component.css']
})
export class BalanceDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<BalanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
