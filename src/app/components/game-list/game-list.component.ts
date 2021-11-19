import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { Observable } from 'rxjs';
import { Game } from 'src/app/game';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  public games: any[] 
  public numberRecords : number
  public page: number
  public genre: string
  public search: string
  public isLoading: boolean
  public sort: string
  public reverse: boolean
  public gamesPerPage: number
  faArrowDown = faArrowDown
  faArrowUp = faArrowUp
  public ascDesc : boolean 

  constructor (
    public webService: WebService, 
    private router: Router, 
    private route: ActivatedRoute
    ) 
  {
    this.games = []
    this.numberRecords = 0
    this.genre = ""
    this.search = ""
    this.page=1
    this.isLoading = false
    this.sort = ""
    this.reverse = false
    this.gamesPerPage = 0
    this.ascDesc = false
    
  }

  ngOnInit(): void {
    

    this.route.queryParams.subscribe(
      ({ genre, search, page, sort, gamesPerPage, SortUp}) => {  

        this.isLoading = true

        //console.log(this.gamesPerPage)
    
        
        this.webService.getGames(genre, search, page, sort, gamesPerPage, SortUp === '1' ? true : false).subscribe(
          (games : any) => {
            this.isLoading = false
            //console.log(games)
            this.games = games.results
            this.numberRecords = games.count
            this.search = search
            this.genre = genre
            this.sort = sort
            this.gamesPerPage = gamesPerPage
            this.ascDesc = SortUp === '1' ? true : false
            this.games.forEach( g => g.price =((Math.floor(Math.random() * (60 - 30) + 30)) - 0.01).toFixed(2))
            console.log(games.results)
          }
        )
    })
  }

  sortUpDown() {
    //console.log(this.ascDesc)

    this.ascDesc = !this.ascDesc
    this.filterAction()
  }

  filterAction() {
    //console.log(this.sort)
    this.router.navigate([""],  { queryParams: { search: this.search, genre: this.genre, sort: this.sort, gamesPerPage: this.gamesPerPage, SortUp: this.ascDesc == true ? 1 : 0 }})
  }
}
