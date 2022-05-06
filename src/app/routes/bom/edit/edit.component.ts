import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductionapiService } from 'src/app/services/productionapi.service';

import { ConfirmationService, FilterService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { IComponent } from '../../../models/component.model';
import { ICheckpoint } from '../../../models/checkpoint.model'
import { IBom } from '../../../models/bom.model'

import * as FileSaver from 'file-saver';

// import * as faker from 'faker'; 
declare var jsPDF: any;


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: any
  modelInfo: any

  allComponents: IComponent[]
  selectedComponent: IComponent

  quantity: number | null
  comment: string

  components: IBom[];
  component: IBom;
  
  selectedComponents: IComponent[]

  submitted: boolean;
  productDialog: boolean;

  statuses: any;
  loading: boolean = true;

  cols: any[];

  exportColumns: any[];

  constructor(
    private route: ActivatedRoute, 
    public api: ProductionapiService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private filterService: FilterService) { }

  async ngOnInit(): Promise<void> {
    // this.quantity = 0
    this.id = this.route.snapshot.paramMap.get('id');
    this.components = await this.api.getModelBomComponents(this.id)
    this.modelInfo = await this.api.getModelInfo(this.id)
    this.allComponents = await this.api.getComponentsAll()
    console.log(this.components)


    console.log(this.components)
    this.loading = false
  }

  async add(){
    console.log('selectedComponent: ', this.selectedComponent)
    console.log('quantity: ', this.quantity)
    let sendData = {
      model: this.id,
      component: this.selectedComponent.id,
      quantity: this.quantity,
      comment: this.comment
    }

    let result = await this.api.addModelBomComponents(sendData)
    console.log(result)
    if(result.result == 'error')
    alert('ERROR: ' + result.error.code)
    this.components = await this.api.getModelBomComponents(this.id)
    this.selectedComponent = {}
    this.quantity = null
    this.comment = ''
  }
  
  deleteProduct(component: IComponent) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + component.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: async () => {
            console.log(component)
            let info = `${this.id}/${component.id}`
              let result = await this.api.deleteModelBomComponents(info)
              console.log(result)
              if(result.result == 'error')
              alert('ERROR: ' + result.error.code)
              // location.reload();
              this.loading = true
              this.components = await this.api.getModelBomComponents(this.id)
              this.loading = false
          }
      });
  }
  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
      
  }
  
  findIndexById(id: string): string {
      let index = -1;
      for (let i = 0; i < this.components.length; i++) {
          if (Number(this.components[i].id) === Number(id)) {
              index = i;
              break;
          }
      }
  
      return String(index);
  }
  exportPdf() {
      let year = new Date().getFullYear()
      let month = new Date().getMonth()
      let day = new Date().getDay()
      let hour = new Date().getHours()
      let minut = new Date().getMinutes()
      import("jspdf").then(jsPDF => {
          import("jspdf-autotable").then(x => {
              const doc = new jsPDF.default('portrait', 'mm');
              //@ts-ignore
              doc.autoTable(this.exportColumns, this.components);
              doc.save(`components_export_${year}_${month}_${day}-${hour}_${minut}.pdf`);
          })
      })
  }
  
  exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.components);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "components");
      });
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
      let year = new Date().getFullYear()
      let month = new Date().getMonth()
      let day = new Date().getDay()
      let hour = new Date().getHours()
      let minut = new Date().getMinutes()
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      FileSaver.saveAs(data, fileName + '_export_' + `${year}_${month}_${day}-${hour}_${minut}` + EXCEL_EXTENSION);
  }
  
    

  }


