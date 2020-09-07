import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bank-app';
  // constructor(private snackBar:MatSnackBar){
  //   //snackBar.open("Hello snackbar","Ok",{duration:3000})
  // }
}
