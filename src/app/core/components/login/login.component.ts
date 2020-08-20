import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerAuthenticationResponse } from './../../../../interfaces/CustomerAuthenticationResponse';
import { LoginModel } from './../../../../interfaces/LoginModel';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserAuthenticationResponse } from '../../../../interfaces/UserAuthenticationResponse';

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

    constructor(private formBuilder: FormBuilder, private userService: UserService, private snackbar:MatSnackBar) {
    }
    ngOnInit(): void {

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(this.EMAIL_REG_EXP)]],
            password: ['', Validators.required],
            customer: []
        })
    }



    onSubmit() {
        this.login = this.loginForm.value;
        if (localStorage.getItem("isCustomer")!=="false") {
            console.log("i am customer");
            const newEmail = this.loginForm.get('email').value + "cus";
            this.login.email = newEmail;
        }else{
            this.login.customer = false;
            console.log("i am not customer");
        }
        this.userService.login(this.login).subscribe(
            (data) => {

                this.snackbar.open("Login Success","Ok",{duration:2000});
                console.log(data);
                if (data.role == "CUSTOMER") {
                    this.customer = data;
                    console.log(this.customer);
                    localStorage.clear();
                    localStorage.setItem("jwttoken", this.customer.jwt);
                    localStorage.setItem("role", this.customer.role);
                    localStorage.setItem("branchCode", "" + this.customer.branchCode);
                    localStorage.setItem("accountNo", "" + this.customer.accountNo);
                    localStorage.setItem("customerName", this.customer.customerName);
                    localStorage.setItem("customerEmail", this.customer.customerEmail);
                } else {
                    localStorage.clear();
                    this.user = data;
                    localStorage.setItem("jwttoken", this.user.jwt);
                    localStorage.setItem("role", this.user.role);
                    localStorage.setItem("email", "" + this.user.email);
                    localStorage.setItem("userId", "" + this.user.userId);
                    localStorage.setItem("userName", this.user.userName);
                }
            },
            (error) => { console.log(error); this.snackbar.open("Login Failed","Retry",{duration:3000}) })
    }


    getEmailErrors() {
        if (this.loginForm.get('email').hasError('required')) {
            return "Email Required"
        }
        return this.loginForm.get('email').hasError('pattern') ? "Enter Valid Email" : "";
    }
}

















