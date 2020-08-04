import { Component } from "@angular/core";
import { FormBuilder, Validators, RequiredValidator } from "@angular/forms";

@Component({
    selector: 'login',
    styleUrls :['./login.component.css'],
    templateUrl: './login.component.html'
})


export class LoginComponent {

    EMAIL_REG_EXP: string = "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
    hide: boolean = true;

    constructor(private formBuilder: FormBuilder) {
    }
    loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(this.EMAIL_REG_EXP)]],
        password: ['', Validators.required]
    })
    onSubmit() {
        console.log(this.loginForm.value)
    }
    getEmailErrors() {
        if (this.loginForm.get('email').hasError('required')) {
            return "Email Required"
        }
        return this.loginForm.get('email').hasError('pattern') ? "Enter Valid Email" : "";
    }
}