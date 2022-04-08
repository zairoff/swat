import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutcomeRoutingModule } from './outcome-routing.module';
import { OutcomeComponent } from './outcome.component';


@NgModule({
  declarations: [
    OutcomeComponent
  ],
  imports: [
    CommonModule,
    OutcomeRoutingModule
  ]
})
export class OutcomeModule { }
