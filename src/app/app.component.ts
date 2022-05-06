import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { ProductionapiService } from './services/productionapi.service'
import { AuthService } from './services/auth.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public api: ProductionapiService, public auth: AuthService, private router: Router){}
  items: MenuItem[];
  activeItem: MenuItem;
  activeItem2: MenuItem;

  admin: boolean = false
  ware: boolean = false
  results: boolean = false

  logout(){
      localStorage.clear()
      this.router.navigate(['/'])
      // location.reload()
  }


  ngOnInit(): void {

    

  //   let auth = this.auth.getToken()

  //   if (auth){
      this.items = [
        {label: 'Kirim', icon: 'pi pi-cloud-upload', routerLink: '/income'},
        {label: 'Chiqim', icon: 'pi pi-cloud-download', routerLink: '/outcome'},
        {label: 'BOM', icon: 'pi pi-book', routerLink: '/bom'},
        {label: 'Liniyalar', icon: 'pi pi-map', routerLink: '/checkpoints'},
        {label: 'Detallar', icon: 'pi pi-list', routerLink: '/components'},
        // {label: "Logout", icon: 'pi pi-cog', routerLink: '/logout'}
        
    ];
  //   }else{
  //     this.items = [
  //       {label: 'Login', icon: 'pi pi-map', routerLink: '/auth'},
  //   ];
  //   }


  this.activeItem = this.items[0];
    
  }
}
