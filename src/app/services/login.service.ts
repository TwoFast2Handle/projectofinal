import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth"
import firebase from '@firebase/app-compat';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

// npm install firebase , npm install @angular/fire, npm install @firebase/auth

  constructor(private afauth: AngularFireAuth) { }

  async register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password)
    } catch (err) {
      console.log("Error", err)
      return null
    }
  }

  login(email : string, password: string) {
    return this.internalLogin(email,password).then( res => {
      console.log(res)
      if(res != null){
        localStorage.setItem('refreshToken', JSON.stringify(res.user?.refreshToken))
        return true
      } 
      return false
      
    })
  }

  async internalLogin(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.log("Error", err)
      return null
    }
  }

  async loginWithGoogle( email: string, password: string) {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    } catch (err) {
      console.log("Error" , err)
      return null
    }
  }

  getUserLogged() {
    return this.afauth.authState
  }

  getLogged() {
    return this.afauth.authState.toPromise()

  }

  logout() {
    
    this.afauth.signOut()
    localStorage.removeItem("refreshToken")
  }

  getCurrentUser() {
    console.log("call getcurrentuser", firebase)
    const user = firebase.auth().currentUser
    console.log(user)
    if (user) {
      return true
    } else {
      return false
    }
    
  }

}
