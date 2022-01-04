import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  orderID: any

  form: FormGroup = this.fb.group({
    cardName: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    cardNumber: [null, [Validators.required, Validators.minLength(16)]],
    securityCode: [null,[Validators.required, Validators.minLength(3)]],
    expirationDate: [null,[Validators.required, Validators.pattern("^(0[1-9]|1[0-2])\/?([0-9]{2})$")]]
    })

  constructor(private fb: FormBuilder, private router : Router, private route: ActivatedRoute, private cart: CartServiceService, private db: AngularFirestore, private LoginService: LoginService ) {
    this.orderID = ""
   }

  ngOnInit(): void {
  }


  confirmAndPay() {
    let cart = this.cart.getCart()
    this.cart.cart.paymentInfo = this.form.value
    this.LoginService.getUserLogged().subscribe( res => {
      let email = res?.email?.valueOf()
      let orders = this.db.collection("orders")

      let order = {
        items: cart.items.map( item => {
          return "Game ID: " + item.game.id + "|" + " qnt " + item.quantity + "|" + " Price: €" + item.game.price
        }),
        total: cart.totalPrice,
        adress: cart.adressInfo.adress,
        adressOptional: cart.adressInfo.adressOptional,
        city: cart.adressInfo.city,
        country: cart.adressInfo.country,
        lastName: cart.adressInfo.lastName,
        name: cart.adressInfo.name,
        post: cart.adressInfo.post,
        discount: cart.adressInfo.discount ?? 0,
        email: email,
        cardName: cart.paymentInfo.cardName,
        cardNumber: cart.paymentInfo.cardNumber,
        date: new Date().toLocaleDateString("pt-PT")
      }

      orders.add(order).then( docRef => {
        this.orderID = docRef.id
        console.log(docRef.id)
        localStorage.removeItem("Cart")
        this.confirmModal()
      })
    })
    
  }

  confirmModal() {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Your Order Reference is ' + this.orderID 
      
    }).then( res => { 
      if (res.isConfirmed) {
        this.router.navigate([""])
      }
     })
  }
}
