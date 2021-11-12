import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MoviesService } from '../movies.service';
import { debounceTime  } from 'rxjs/operators';

AuthService
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean=false;
  userInfo:any;
  constructor(private _AuthService:AuthService,
    private _MoviesService:MoviesService,
    private _Router:Router)
    {
    this._AuthService.currentUser.subscribe(()=>{
      if(this._AuthService.currentUser.getValue()!=null)
      {
        this.isLogin=true;
        this.userInfo=this._AuthService.currentUser.getValue()
      }
      else
      {
        this.isLogin=false
      }
    })
  }
  isLogOut()
  {
    this._AuthService.logOut()
  }

  search(term:any){
    const searchTerm=term?.target.value
    if(searchTerm!="")
    {
      this._MoviesService.saveMedia(searchTerm)
      this._Router.navigate(["search",searchTerm])
    }
  }
  ngOnInit(): void {
  }
  
}
