import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(){}
  items: MenuItem[];
  activeItem: MenuItem;
  activeItem2: MenuItem;


  ngOnInit(): void {

    this.items = [
      {label: 'Kirim', icon: 'pi pi-cloud-upload', routerLink: '/income'},
      {label: 'Chiqim', icon: 'pi pi-cloud-download', routerLink: '/outcome'},
      {label: 'BOM', icon: 'pi pi-book', routerLink: '/bom'},
      {label: 'Liniyalar', icon: 'pi pi-map', routerLink: '/checkpoints'},
      {label: 'Detallar', icon: 'pi pi-list', routerLink: '/components'}
  ];
  this.activeItem = this.items[0];
    
  }
}
