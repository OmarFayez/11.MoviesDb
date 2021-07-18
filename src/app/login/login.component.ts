import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.pattern("^[A-Za-z0-9][A-Za-z0-9]{4,29}"),Validators.required])
  })
  error:string=""
  constructor(private _AuthService:AuthService,private _Router:Router) { }

  submitLoginForm(loginForm:FormGroup)
  {
    this._AuthService.submitLogin(loginForm.value).subscribe((response)=>
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
  ngOnInit(): void {
  }

}
