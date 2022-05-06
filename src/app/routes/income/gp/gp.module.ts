import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpRoutingModule } from './gp-routing.module';
import { GpComponent } from './gp.component';

import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [
    GpComponent
  ],
  imports: [
    CommonModule,
    GpRoutingModule,
    InputTextModule,
    FormsModule,
    ButtonModule
  ]
})
export class GpModule { }
