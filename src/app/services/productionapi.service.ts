import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service'
import { HttpClient } from '@angular/common/http';

import { ICheckpoint } from '../models/checkpoint.model'
import { IComponent } from '../models/component.model'
import { ITypes } from '../models/types.model'
import { IModels } from '../models/ref.model';
import { IBom } from '../models/bom.model';



@Injectable({
  providedIn: 'root'
})
export class ProductionapiService {

  constructor(public config: ConfigService, public http: HttpClient) { }

  public async addComponentWarehouse(body:any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName+'/income', body).subscribe(e=>{
          resolve(e);
        })
      })
    }

  public async addModelBomComponents(body:any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName+'/bom/components/add', body).subscribe(e=>{
          resolve(e);
        })
      })
    }

  public async deleteModelBomComponents(body:any){
    return new Promise<any>((resolve) => {
      this.http.delete<any>(this.config.serverDomenName+'/bom/components/delete/' + body).subscribe(e=>{
          resolve(e);
        })
      })
    }
  public async getModelBomComponents(body:any){
    return new Promise<IBom[]>((resolve) => {
      this.http.get<IBom[]>(this.config.serverDomenName+'/bom/components/'+body).subscribe(e=>{
          resolve(e);
        })
      })
    }

  public async deleteModels(body: any){
    return new Promise<any>((resolve) => {
      console.log('delete: ', body)
      this.http.delete<any>(this.config.serverDomenName+'/models/'+body).subscribe(e=>{
          resolve(e);
        })
      })
    }

    public async getModelInfo(body: any){
      return new Promise<any[]>((resolve) => {
        this.http.get<any[]>(this.config.serverDomenName+'/models/'+body).subscribe(e=>{
            resolve(e);
          })
        })
      }

  public async getModels(){
    return new Promise<IModels[]>((resolve) => {
      this.http.get<IModels[]>(this.config.serverDomenName+'/models').subscribe(e=>{
          resolve(e);
        })
      })
    }

  public async sendNewModel(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName+'/models', body).subscribe(e=>{
          resolve(e);
        })
      })
    }

  public async sendComponentData(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName+'/components', body).subscribe(e=>{
          resolve(e);
        })
      })
    }

    public async sendCheckpointData(body: any){
      return new Promise<any>((resolve) => {
        this.http.post<any>(this.config.serverDomenName+'/checkpoints', body).subscribe(e=>{
            resolve(e);
          })
        })
      }

    public async deleteCheckpoint(body: any){
      return new Promise<any>((resolve) => {
        console.log('delete: ', body)
        this.http.delete<any>(this.config.serverDomenName+'/checkpoints/'+body).subscribe(e=>{
            resolve(e);
          })
        })
      }

    public async deleteComponent(body: any){
      return new Promise<any>((resolve) => {
        console.log('delete: ', body)
        this.http.delete<any>(this.config.serverDomenName+'/components/'+body).subscribe(e=>{
            resolve(e);
          })
        })
      }

  public async getCheckPoints(){
    return new Promise<ICheckpoint[]>((resolve) => {
      this.http.get<ICheckpoint[]>(this.config.serverDomenName+'/checkpoints').subscribe(e=>{
          resolve(e);
        })
      })
    }

    public async getTypes(){
      return new Promise<ITypes[]>((resolve) => {
        this.http.get<ITypes[]>(this.config.serverDomenName+'/types').subscribe(e=>{
            resolve(e);
          })
        })
      }

    public async getComponentsAll(){
    return new Promise<IComponent[]>((resolve) => {
      this.http.get<IComponent[]>(this.config.serverDomenName+'/components').subscribe(e=>{
          resolve(e);
        })
      })
    }
    
    public async getComponent(id:number){
      return new Promise<IComponent[]>((resolve) => {
        this.http.get<IComponent[]>(this.config.serverDomenName+`/components/${id}`).subscribe(e=>{
            resolve(e);
          })
        })
      }
}
