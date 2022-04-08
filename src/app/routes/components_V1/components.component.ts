import { Component, OnInit } from '@angular/core';

import { IComponent, Representative } from '../../models/component.model';
import { ICheckpoint } from '../../models/checkpoint.model'
import { ITypes } from 'src/app/models/types.model';

import { ProductionapiService } from '../../services/productionapi.service';





@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css'],
  providers: []
})


export class ComponentsComponent implements OnInit {
  checkpoints: ICheckpoint[];
  checkpoint: ICheckpoint;
  components: IComponent[];
  component: IComponent;
  types: ITypes[];

  

  representatives: Representative[];

  loading: boolean = true;

  productDialog: boolean;

    submitted: boolean;

    statuses: any[];
  dt: any;

  constructor(public api: ProductionapiService) { }

  async ngOnInit(): Promise<void> {
    this.checkpoints = await this.api.getCheckPoints();
    console.log('checkpoints: ', this.checkpoints)
    this.types = await this.api.getTypes()
    console.log('types: ', this.types)
    this.components = await this.api.getComponentsAll()
    console.log('components: ', this.components)
    
    this.checkpoint = {}

    this.loading = false
    
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}


