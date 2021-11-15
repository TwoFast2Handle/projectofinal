import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit {

currentPage: number
totalPages: number

  constructor() { 
    this.currentPage = 0
    this.totalPages = 0
  }


  ngOnInit(): void {
  }

}
