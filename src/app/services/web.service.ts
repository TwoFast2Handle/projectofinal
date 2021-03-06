import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  
  baseUrl: string = "https://api.rawg.io/api/"
  token: string = "eff94eui1nqnxzmos7b4ism7sxee2o"
  clientId: string ="6nx5w7h0yep2azszp1asntug9a7f8n"
  key: string = "2471f43d09814574a40872acb66949f1"
  defaultHeader : HttpHeaders = new HttpHeaders()
  

  constructor(private http: HttpClient) {
    this.defaultHeader.append("Authorization", `Bearer ${this.token}`)
    this.defaultHeader.append("Client-ID", this.clientId)

  }


  authorization: object = {}


  

  getGames(genres?:string, search?:string, page?:number, sort?:string, gamesPerPage?:number, sortUp?: boolean) {
    
    let url = this.baseUrl +"games?" + `key=${this.key}` 

  
    if (genres) {
      url += `&genres=${genres}`
    }

    if (search) {
      url += `&search=${search}`
    }

    if (page) {
      url+= `&page=${page}`
    }


    let sorturl = ''
    if(sort) {
      sorturl = sort;
    }
    if(!sortUp){
        sorturl = '-'+sorturl;
    }

    url+=`&ordering=${sorturl}`

    // url+="&ordering=-metacritic"
    if (gamesPerPage) {
      url+= `&page_size=${gamesPerPage}`
    }



    return this.http.get(url) 
  }

  getDataById(slugOrId : any) {
    return this.http.get(this.baseUrl + `games/${slugOrId}` + `?key=${this.key}`  )
  }

  getGenres() {
    return this.http.get(this.baseUrl + `genres?` + `key=${this.key}`  )
  }

  getImages(slugOrId: any) {
    return this.http.get(this.baseUrl +"games/" + slugOrId + `/screenshots?key=${this.key}` )
  }



}


  
  


