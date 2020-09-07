import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-branch-dialog',
  templateUrl: './branch-dialog.component.html'
})
export class BranchDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
   
  }

}
