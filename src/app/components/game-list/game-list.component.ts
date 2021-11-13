import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { Observable } from 'rxjs';
import { Game } from 'src/app/game';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  public games: any[] 
  constructor (
    public webService: WebService, 
    private router: Router, 
    private route: ActivatedRoute
    ) 
  {
    this.games = []
  }

  ngOnInit(): void {
    

    this.route.queryParams.subscribe(
      ({ search }) => {        
        
        this.webService.getGames(undefined,search).subscribe(
          (games : any) => {
            this.games = games.results
            this.games.forEach( g => g.price =((Math.floor(Math.random() * (60 - 30) + 30)) - 0.01).toFixed(2))
            console.log(games.results)
          }
        )
    })
  }
}
