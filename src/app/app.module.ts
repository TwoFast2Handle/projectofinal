import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { CardComponent } from './components/card/card.component';
import { DetailComponent } from './components/detail/detail.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './components/cart/cart.component';
import { CardItem } from './models/card-item';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterPageComponent } from './components/auth/register-page/register-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';




const firebaseConfig = {
  apiKey: "AIzaSyDcv2fCqxsVr-70GD-XrnfkZV-LPIpNG9I",
  authDomain: "store-7deb3.firebaseapp.com",
  projectId: "store-7deb3",
  storageBucket: "store-7deb3.appspot.com",
  messagingSenderId: "42911799019",
  appId: "1:42911799019:web:dd5cc3484cba84269710ae"
};

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    CardComponent,
    DetailComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    PaginatorComponent,
    CartComponent,
    CheckoutComponent,
    LoginPageComponent,
    ProfileComponent,
    RegisterPageComponent,
    PaymentComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [CartComponent, AngularFirestoreModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
