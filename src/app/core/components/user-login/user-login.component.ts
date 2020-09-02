import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.clear();
    localStorage.setItem("isCustomer", "false");
  }



}
