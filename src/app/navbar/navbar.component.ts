import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { MoviesService } from '../movies.service';

AuthService
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private _AuthService:AuthService,
    private _MoviesService:MoviesService,
    private _Router:Router)
    {
    this._AuthService.currentUser.pipe(takeUntil(this._unsubscribe)).subscribe(()=>{
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

  _unsubscribe:Subject<boolean>=new Subject();

  isLogin:boolean=false;
  userInfo:any;
 
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
  
}
