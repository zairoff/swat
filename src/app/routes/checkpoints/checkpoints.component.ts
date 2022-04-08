import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ICheckpoint } from 'src/app/models/checkpoint.model';
import { ProductionapiService } from 'src/app/services/productionapi.service';

@Component({
  selector: 'app-checkpoints',
  templateUrl: './checkpoints.component.html',
  styleUrls: ['./checkpoints.component.css']
})
export class CheckpointsComponent implements OnInit {

  checkpoints: ICheckpoint[];
  checkpoint: ICheckpoint;
  
  selectedCheckpoint: ICheckpoint

  submitted: boolean;
  productDialog: boolean;

  statuses: any;
  loading: boolean = true;


  constructor(public api: ProductionapiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  async ngOnInit(): Promise<void> {
    this.checkpoints = await this.api.getCheckPoints();
    console.log('checkpoints: ', this.checkpoints)

    this.loading = false;
    
  }

  openNew() {
    this.checkpoint = {};
    this.submitted = false;
    this.productDialog = true;
}


editProduct(checkpoint: ICheckpoint) {
    this.checkpoint = {...checkpoint};
    this.productDialog = true;
    this.selectedCheckpoint.id = this.checkpoint.id
    this.selectedCheckpoint.name = this.checkpoint.name
    

}

async deleteProduct(checkpoint: ICheckpoint) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + checkpoint.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            let result = await this.api.deleteCheckpoint(checkpoint.id)
            // if (result.result == 'error'){
            //     alert('ERROR')
            // }
            console.log(result)
            if(result.result == 'error')
            alert('ERROR')
            // location.reload();
            this.loading = true
            this.checkpoints = await this.api.getCheckPoints();
            this.loading = false

        }
        
    });
}
hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    
}
async saveProduct() {
    this.submitted = true;

    console.log(this.checkpoint)
    let result =  await this.api.sendCheckpointData(this.checkpoint)
    if (result.result == 'error')
    alert('ERROR')
    console.log('result', result)
    this.productDialog = false;
    // location.reload();
    this.loading = true
    this.checkpoints = await this.api.getCheckPoints();
    this.loading = false

    
}

findIndexById(id: string): string {
    let index = -1;
    for (let i = 0; i < this.checkpoints.length; i++) {
        if (Number(this.checkpoints[i].id) === Number(id)) {
            index = i;
            break;
        }
    }

    return String(index);
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}


}
