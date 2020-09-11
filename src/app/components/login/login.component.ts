import { LoginModel } from './../../../interfaces/LoginModel';
import { CustomerAuthenticationResponse } from './../../../interfaces/CustomerAuthenticationResponse';
import { UserAuthenticationResponse } from './../../../interfaces/UserAuthenticationResponse';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserService } from 'src/app/core/services/user.service';


@Component({
    selector: 'login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    EMAIL_REG_EXP: string = "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
    hide: boolean = true;
    login: LoginModel;
    loginForm: FormGroup;
    customer: CustomerAuthenticationResponse;
    user: UserAuthenticationResponse;
    isCustomer: boolean = true;
    constructor(private formBuilder: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) {
    }

    ngOnInit(): void {
        if (this.router.url.includes("user-login")) {
            this.isCustomer = false;
        }
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(this.EMAIL_REG_EXP)]],
            password: ['', Validators.required],
            customer: [this.isCustomer]
        })
    }

    onSubmit() {
        this.login = this.loginForm.value;
        if (this.isCustomer) {
            console.log("i am customer");
            const newEmail = this.loginForm.get('email').value + "cus";
            this.login.email = newEmail;
        } else {
            this.login.customer = false;
            console.log("i am not customer");
        }

        this.userService.login(this.login).subscribe(
            (data) => {
                this.snackbar.open("Login Success", "Ok", { duration: 2000 });
                console.log(data);
                if (data.role == "CUSTOMER") {
                    this.customer = data;
                    localStorage.clear();
                    localStorage.setItem("jwttoken", this.customer.jwt);
                    localStorage.setItem("role", this.customer.role);
                    localStorage.setItem("accountNo", "" + this.customer.accountNo);
                    localStorage.setItem("customerName", this.customer.customerName);
                    localStorage.setItem("customerEmail", this.customer.customerEmail);
                    localStorage.setItem("branchId", "" + this.customer.branchCode);

                } else {
                    localStorage.clear();
                    this.user = data;
                    localStorage.setItem("jwttoken", this.user.jwt);
                    localStorage.setItem("role", this.user.role);
                    localStorage.setItem("email", "" + this.user.email);
                    localStorage.setItem("userId", "" + this.user.userId);
                    localStorage.setItem("userName", this.user.userName);
                    localStorage.setItem("branchId", "" + this.user.branchCode);
                }
                console.log(data.role);
                this.redirectUser(data.role);
            },
            (error) => { console.log(error); this.snackbar.open("Login Failed", "Retry", { duration: 3000 }) })
    }

    getEmailErrors() {
        if (this.loginForm.get('email').hasError('required')) {
            return "Email Required"
        }
        return this.loginForm.get('email').hasError('pattern') ? "Enter Valid Email" : "";
    }

    redirectUser(role: string) {
        if (role == "ADMIN") {
            this.router.navigateByUrl("/admin");
        }
        if (role == "MANAGER") {
            this.router.navigateByUrl("/branch");
        }
        if (role == "CUSTOMER") {
            this.router.navigateByUrl("/customer");
        }
    }

}
