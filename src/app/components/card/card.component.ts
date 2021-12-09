import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailComponent } from '../detail/detail.component';
import { Cart } from 'src/app/models/cart';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent {


  @Input() 
  game : any 

  constructor(private router: Router, private route: ActivatedRoute,
    private cartService: CartServiceService) { 
  }

  navigateToDetails() {
    this.router.navigate(["game/" + this.game.game.slug], {state : { price : this.game.game.price } })
  }

  buy() {
    
    this.cartService.addToCart(this.game.game, 1)
  }

  
}
