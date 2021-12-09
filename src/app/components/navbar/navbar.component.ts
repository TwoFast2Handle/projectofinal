import { Component, Input, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from 'src/app/services/web.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'; 
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged} from "rxjs/operators"
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  genres: any[]
  loggedUser : any

  @Input()
  search: string
  searchUpdate = new Subject<string>()
  
  @Input()
  category: string
  faShoppingCart = faShoppingCart
  faUser = faUser
  


  constructor(private webService: WebService, private router : Router, private route: ActivatedRoute, private LoginService: LoginService) { 

    this.genres = []
    this.search = ""
    this.category=""
    this.loggedUser = null

    this.searchUpdate.pipe(
      debounceTime(300),
      distinctUntilChanged()).subscribe( (value: string) => {
        console.log(value)
      this.search = value
      this.filterAction()
      })
    

  }

  

  ngOnInit(): void {
    this.webService.getGenres().subscribe(
      (genres : any) => {
        
        this.genres = genres.results
        //console.log(this.genres)
      })

      this.LoginService.getUserLogged().subscribe( res => {
        this.loggedUser = res
      })

  }

  filterAction() {
    this.router.navigate([""],  { queryParams: { search: this.search, genre: this.category }})
  }
  
  navigateToCart() {
    this.router.navigate(["cart"])
  }

  navigateToLogin() {
    this.router.navigate(["login"])
  }

  navigateToProfile() {
    this.router.navigate(["profile"])
    //this.LoginService.getUserLogged().subscribe( res => console.log(res))
  }

  logout() {
    this.LoginService.logout()
  }
}
