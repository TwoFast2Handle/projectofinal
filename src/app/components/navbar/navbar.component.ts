import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/web.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  genres: any[]

  constructor(private webService: WebService) { 

    this.genres = []
  }

  

  ngOnInit(): void {
    this.webService.getGenres().subscribe(
      (genres : any) => {
        
        this.genres = genres.results
        console.log(this.genres)
      })
  }

}
