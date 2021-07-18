import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit  {

currentUser=new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem("token")!=null)
    {
       this.saveCurrentUser();
    }
  }
    ngOnInit(): void {
     
    }

  saveCurrentUser()
  {
    let token:any =localStorage.getItem("token")
    this.currentUser.next(jwtDecode(token))
    // console.log( this.currentUser.getValue())
  }

  submitRegister(registerData:any):Observable<any>
  {
    return this._HttpClient.post("https://route-egypt-api.herokuapp.com/signup",registerData)
  }

  submitLogin(loginData:any):Observable<any>
  {
    return this._HttpClient.post("https://route-egypt-api.herokuapp.com/signin",loginData)
  }

  logOut()
  {
    this.currentUser.next(null)
    localStorage.removeItem("token")
    this._Router.navigate(["login"])
  }
  
}
