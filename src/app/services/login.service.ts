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

  async login(email: string, password: string) {
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
  }

  getCurrentUser() {
    const user = firebase.auth().currentUser
    
    if (user) {
      return true
    } else {
      return false
    }
    
  }

}
