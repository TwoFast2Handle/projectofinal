import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authenticated : boolean
  
  constructor(private router: Router, private LoginService: LoginService) {

    this.authenticated = false

    this.LoginService.getUserLogged().subscribe( res => {
      this.authenticated = res == null ? false : true
    })


  }
  
  canActivate() : boolean {

    console.log('canActivate call');

    if(this.authenticated){
      console.log('estou logado');
      return true
    } else {
      console.log('nao estou logado');
      this.router.navigate(["login"])
      return false
      
    }
    
  }
}
