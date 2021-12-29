import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import firebase from '@firebase/app-compat';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authenticated : boolean
  
  constructor(private router: Router, private LoginService: LoginService) {

    this.authenticated = false

    // this.LoginService.getUserLogged().subscribe( res => {
    //   this.authenticated = res == null ? false : true
    // })


  }
  
  canActivate() : boolean {

    console.log('canActivate call');
    //console.log(this.LoginService.getCurrentUser())
    
    // return this.LoginService.getCurrentUser()
    
    if(localStorage.getItem("refreshToken")){
      console.log('estou logado');
      return true
    } else {
      console.log('nao estou logado');
      this.router.navigate(["login"])
      return false
      
    }
    
  }
}
