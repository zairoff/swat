import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gp',
  templateUrl: './gp.component.html',
  styleUrls: ['./gp.component.css']
})
export class GpComponent implements OnInit {

  serial: string;

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    console.log('submit')
    this.serial = ''
  }

  change(){
    if(this.serial.includes('clear'))
    this.serial = ''
    if(this.serial.length == 13)
    this.submit()
  }

}
