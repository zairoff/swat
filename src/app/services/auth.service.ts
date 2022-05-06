import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public config: ConfigService, public http: HttpClient) { }

  public async loginUser(body:any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.loginDomain+'/auth/login', body).subscribe(e=>{
          resolve(e);
        })
      })
    }

  public getToken(){
    return localStorage.getItem('token')
  }

  public setToken(){
    localStorage.clear()
  }

  public isAuth(){
    return !!this.getToken
  }
}
