import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/services/web.service';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Filter } from 'src/app/models/filter';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  public filter : Filter
  public games: any[] 
  public numberRecords : number
  public isLoading: boolean
  faArrowDown = faArrowDown
  faArrowUp = faArrowUp

  constructor (
    public webService: WebService, 
    private router: Router, 
    private route: ActivatedRoute
    ) 
  {
    this.filter = new Filter()
    this.games = []
    this.numberRecords = 0
    this.isLoading = false
    
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
            this.filter.search = search
            this.filter.genre = genre
            this.filter.sort = sort
            this.filter.itemsPerPage = gamesPerPage
            this.filter.ascDesc = SortUp === '1' ? true : false
            this.games.forEach( g => g.price =((Math.floor(Math.random() * (60 - 30) + 30)) - 0.01))
            console.log(games.results)
          }
        )
    })
  }

  sortUpDown() {
    //console.log(this.ascDesc)

    this.filter.ascDesc = !this.filter.ascDesc
    this.filterAction()
  }

  filterAction() {
    //console.log(this.sort)
    this.router.navigate([""],  { queryParams: { search: this.filter.search, genre: this.filter.genre, sort: this.filter.sort, gamesPerPage: this.filter.itemsPerPage, SortUp: this.filter.ascDesc == true ? 1 : 0 }})
  }
}
