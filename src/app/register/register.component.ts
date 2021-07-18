import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm=new FormGroup({
    first_name:new FormControl(null,[Validators.minLength(3),Validators.maxLength(20),Validators.required]),
    last_name:new FormControl(null,[Validators.minLength(3),Validators.maxLength(20),Validators.required]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.pattern("^[A-Za-z0-9][A-Za-z0-9]{4,29}"),Validators.required]),
    age:new FormControl(null,[Validators.min(15),Validators.max(80),Validators.required])
  })
  error:string=""
  constructor(private _AuthService:AuthService,private _Router:Router) { }

  submitRegisterForm(registerForm:FormGroup)
  {
    this._AuthService.submitRegister(registerForm.value).subscribe((response)=>
    {
      if(response.message=="success")
      {
       this._Router.navigate(["login"])
      }
      else
      {
       this.error=response.errors?.email?.message;
      }
    })
  }

  ngOnInit(): void {
  }

}
