import { Input, Component, OnInit } from '@angular/core';
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
next: string

@Input() 
previous: string

faCaretLeft = faCaretLeft
faCaretRight = faCaretRight

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.next = ""
    this.previous = ""
    this.currentPage = 0
    this.totalCount = 0
    this.totalPages = this.totalCount / 12

    
    

  }


  ngOnInit(): void {
  }

  getTotalPages(){
    this.totalPages = parseInt((this.totalCount / 12).toFixed(0))

    return this.totalPages
  }

  nextPage() {
    this.router.navigate([""],  { queryParams: { next: this.next }})
  }

  previousPage() {
    this.router.navigate([""],  { queryParams: { previous: this.previous }})
  }

}

