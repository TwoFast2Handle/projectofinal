import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent {


  @Input() 
  game : any 


  constructor(private router: Router, private route: ActivatedRoute ) { 
    
  
  }

  navigateToDetails() {
    this.router.navigate([this.game.game.slug], {state : { price : this.game.game.price } })
  }

  
}
