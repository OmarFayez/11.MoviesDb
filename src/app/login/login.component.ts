import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  constructor(private _AuthService:AuthService,private _Router:Router) { }

  loginForm=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.pattern("^[A-Za-z0-9][A-Za-z0-9]{4,29}"),Validators.required])
  })

  _unsubscribe:Subject<boolean>=new Subject();

  error:string=""

  submitLoginForm(loginForm:FormGroup)
  {
    this._AuthService.submitLogin(loginForm.value).pipe(takeUntil(this._unsubscribe)).subscribe((response)=>
    {
      if(response.message=="success")
      {
      localStorage.setItem("token",response.token);
      this._Router.navigate(["/home"]);
      this._AuthService.saveCurrentUser()
      }
      else
      {
        this.error=response.message
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true)
    this._unsubscribe.complete()
  }

}
