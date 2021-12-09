import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : any

  form: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    lastName: [null, [Validators.required, Validators.minLength(3)]],
    adress: [null,[Validators.required, Validators.minLength(15)]],
    adressOptional: null,
    country: [null, [Validators.required]],
    city: [null, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]*')]],
    post: [null, [Validators.required, Validators.minLength(3), Validators.pattern("^\\d{4}-\\d{3}$")]]
  })

  constructor(private fb: FormBuilder) { 
    this.user = {}
  }

  ngOnInit(): void {
  }

}
