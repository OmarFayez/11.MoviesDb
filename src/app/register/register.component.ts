import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  constructor(private _AuthService:AuthService,private _Router:Router) { }

  _unsubscribe:Subject<boolean>=new Subject();

  registerForm=new FormGroup({
    first_name:new FormControl(null,[Validators.minLength(3),Validators.maxLength(20),Validators.required]),
    last_name:new FormControl(null,[Validators.minLength(3),Validators.maxLength(20),Validators.required]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.pattern("^[A-Za-z0-9][A-Za-z0-9]{4,29}"),Validators.required]),
    age:new FormControl(null,[Validators.min(15),Validators.max(80),Validators.required])
  })

  error:string=""

  submitRegisterForm(registerForm:FormGroup)
  {
    this._AuthService.submitRegister(registerForm.value).pipe(takeUntil(this._unsubscribe)).subscribe((response)=>
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

  ngOnDestroy(): void {
    this._unsubscribe.next(true)
    this._unsubscribe.complete()
  }
}
