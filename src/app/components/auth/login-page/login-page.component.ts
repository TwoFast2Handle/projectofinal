import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    password: [null, [Validators.required, Validators.minLength(3)]],

  })

  errorMessage : string

  constructor(private fb: FormBuilder, private LoginService: LoginService,private router : Router, private route: ActivatedRoute) { 
    this.errorMessage = ""
  }


  ngOnInit(): void {
  }

  login() {
    const {email, password} = this.form.value
    this.LoginService.login(email, password).then(res =>{
        if (res == true) {
          this.router.navigate([""])
        } else {
          this.errorMessage = "Login failed"
        }
        
     
    })
  }

  register() {
    this.router.navigate(["register"])
  }

}
