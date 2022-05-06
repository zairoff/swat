import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface IToken{
  token: string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form: FormGroup
  submitted: boolean = false
  errMessage: string
  errorEvent: boolean = false


  // username: string
  // password: String
  value3: string;

  constructor(public auth: AuthService, public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
    
  }

  async submit(){
    if(this.form.invalid){
      return
    }
    this.submitted = true
    this.errorEvent = false
    this.errMessage = ''

    const user = {
      username: this.form.value.username,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.http.post<IToken>("http://192.168.5.250:4000/auth/login", user)
    .subscribe((res) => {
      console.log(res.token)
      let apiToken: string
      if(!res.token){
        return
      }
      apiToken = res.token.toString()
       this.form.reset
       localStorage.setItem("token", apiToken)

       this.router.navigate(['/'])
       this.submitted = false
      //  location.reload()
    }, (error) => {
        console.log(error)
        this.errorEvent = true
        this.errMessage = error.error.message
        this.submitted = false
    })

   }

}
