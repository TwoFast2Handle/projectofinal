import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from 'src/app/web.service';

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
    private webService: WebService
  ) { 
    this.images = []
    this.price = this.router.getCurrentNavigation()?.extras.state?.price
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

}
