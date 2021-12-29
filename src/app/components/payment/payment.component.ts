import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  form: FormGroup = this.fb.group({
    cardName: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    cardNumber: [null, [Validators.required, Validators.minLength(16)]],
    securityCode: [null,[Validators.required, Validators.minLength(3)]],
    expirationDate: [null,[Validators.required, Validators.pattern("^(0[1-9]|1[0-2])\/?([0-9]{2})$")]]
    })

  constructor(private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  send() {

  }
  autofillData() {

  }
}
