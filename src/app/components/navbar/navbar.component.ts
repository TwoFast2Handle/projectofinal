import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from 'src/app/web.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  genres: any[]
  @Input()
  search: string

  constructor(private webService: WebService, private router : Router, private route: ActivatedRoute) { 

    this.genres = []
    this.search = ""
  }

  

  ngOnInit(): void {
    this.webService.getGenres().subscribe(
      (genres : any) => {
        
        this.genres = genres.results
        console.log(this.genres)
      })
  }

  navigateToSearch() {
    this.router.navigate([""],  { queryParams: { search: this.search }})
  }

}
