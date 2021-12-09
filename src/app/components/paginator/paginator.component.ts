import { Input, Component, OnInit, SimpleChanges } from '@angular/core';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit {

currentPage: number
totalPages: number

@Input() 
totalCount: number

@Input()
genre: string

@Input()
search: string

faCaretLeft = faCaretLeft
faCaretRight = faCaretRight

  constructor(private route: ActivatedRoute, private router: Router) { 

    this.currentPage = 1
    this.totalCount = 0
    this.totalPages = this.totalCount / 12
    this.genre=""
    this.search=""

  }

  ngOnChanges(changes: SimpleChanges) {
        
    console.log(changes)
    if(changes.search){
      this.currentPage = 1
    }

    if(changes.genre){
      this.currentPage = 1
    }
   
    
}


  ngOnInit(): void {
    
  }

  getTotalPages(){
    this.totalPages = parseInt((this.totalCount / 12).toFixed(0))

    return this.totalPages
  }

  nextPage() {
    this.currentPage++
    this.router.navigate([""],  { queryParams: { search: this.search, genre: this.genre, page: this.currentPage }})
    console.log(this.search)
  }

  previousPage() {
    if (this.currentPage <= 1) {
      return
    }
    this.currentPage--
    this.router.navigate([""],  { queryParams: { search: this.search, genre: this.genre, page: this.currentPage }})
    
  }


}

