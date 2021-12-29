import { Component, Input, OnInit } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : any
  name: string
  @Input() fileInput : any
  email: string

  form: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    lastName: [null, [Validators.required, Validators.minLength(3)]],
    adress: [null,[Validators.required, Validators.minLength(15)]],
    adressOptional: null,
    country: [null, [Validators.required]],
    city: [null, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]*')]],
    post: [null, [Validators.required, Validators.minLength(3), Validators.pattern("^\\d{4}-\\d{3}$")]]
  })

  constructor(private fb: FormBuilder, private db: AngularFirestore, private LoginService : LoginService) { 
    this.user = {}
    this.name = "Name"
    this.fileInput = null
    this.email = ""
  }

  ngOnInit(): void {
    
    this.getData()
  }

  saveData() {
    console.log("call save")
    let users = this.db.collection('users')
    users.doc(this.email).set(this.form.value)
  }

  async getData()  {
    
    this.LoginService.getUserLogged().subscribe( res => {
      if (res != null) {
        let email = res?.email?.valueOf()
        let users = this.db.collection('users')
        users.doc(email).get().subscribe( doc => {
          console.log(doc.data())
          let data : any = doc.data()
          this.form.setValue({
            name : data.name,
            lastName: data.lastName,
            adress: data.adress,
            adressOptional: data.adressOptional,
            country: data.country,
            city: data.city,
            post: data.post
          })
          this.email = data.email
          this.name = data.name
        })
      
      }
      
      
    })
    
    // let {name, lastName, adress, adressOptional, country, city, post} = users.doc(this.LoginService.getUserLogged
    //this.form.patchValue({name : "hello"}) P@ssw0rd
  }

}
