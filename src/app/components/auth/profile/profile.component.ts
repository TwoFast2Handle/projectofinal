import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
  email: any
  orders: Array<any>

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
    this.orders = []
  }

  ngOnInit(): void {
    this.getData()
  }

  saveData() {
    let users = this.db.collection('users')
    users.doc(this.email).set(this.form.value)
  }

  async getData()  {
    
    this.LoginService.getUserLogged().subscribe( res => {
      if (res != null) {
        let email = res?.email?.valueOf()
        let users = this.db.collection('users')
        users.doc(email).get().subscribe( doc => {
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
          this.email = email
          this.name = data.name
          this.getOrders(this.email)
        })
      }
    })
    
    
    
    

    // let {name, lastName, adress, adressOptional, country, city, post} = users.doc(this.LoginService.getUserLogged
    //this.form.patchValue({name : "hello"}) P@ssw0rd
  }

  getOrders(email : any) {
    this.db.collection("orders", ref => {
      let query = ref.where('email','==', email)
      return query;
    }).get().subscribe( querySnapshot => {
      querySnapshot.forEach((doc) => {
        let order : any = doc.data();
        order.id = doc.id
        this.orders.push(order)
        console.log(this.orders)
      })
    })
  }

}
