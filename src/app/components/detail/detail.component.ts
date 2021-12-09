import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from 'src/app/services/web.service';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})




export class DetailComponent implements OnInit {
  
  
  gameDetails: any
  price: number
  images: any[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webService: WebService, private cartService: CartServiceService
  ) { 
    this.images = []
    this.price = parseFloat(this.router.getCurrentNavigation()?.extras.state?.price)
    if(!this.price)
      this.price = ((Math.floor(Math.random() * (60 - 30) + 30)) - 0.01)
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      ({ slug }) => {        
        
        this.webService.getImages(slug).subscribe(
          (images : any) => {
            this.images = images.results
            console.log(images.results)
          }

          

        )

        this.webService.getDataById(slug).subscribe(
          (gameDetails: any) => {
            this.gameDetails = gameDetails
            console.log(this.gameDetails)
          })
      }
    );

    

    console.log(this.route.params)
  }

  buy() {
    this.gameDetails.price = this.price
    this.cartService.addToCart(this.gameDetails, 1)
    console.log(this.gameDetails)
  }

}
