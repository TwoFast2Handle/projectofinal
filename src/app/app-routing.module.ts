import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DetailComponent } from './components/detail/detail.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { ProfileComponent } from './components/auth/profile/profile.component';

const routes: Routes = [
  {path: "", component: GameListComponent},
  {path: "game/:slug", component: DetailComponent },
  {path: "genre/:genre", component: GameListComponent},
  {path: "cart", component: CartComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: "login", component: LoginPageComponent},
  {path: "profile", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
