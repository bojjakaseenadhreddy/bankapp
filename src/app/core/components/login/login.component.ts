import { LoginModel } from './../../../../interfaces/LoginModel';
import { UserService } from './../../services/user.service';
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'login',
    styleUrls :['./login.component.css'],
    templateUrl: './login.component.html'
})


export class LoginComponent {

    EMAIL_REG_EXP: string = "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
    hide: boolean = true;
    login:LoginModel;

    constructor(private formBuilder: FormBuilder, private userService:UserService) {
    }
    loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(this.EMAIL_REG_EXP)]],
        password: ['', Validators.required],
        customer:['false']
    })
    onSubmit() {
        this.login = this.loginForm.value;
        console.log(this.login.customer);
       this.userService.login(this.login).subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
    }
    getEmailErrors() {
        if (this.loginForm.get('email').hasError('required')) {
            return "Email Required"
        }
        return this.loginForm.get('email').hasError('pattern') ? "Enter Valid Email" : "";
    }
}
