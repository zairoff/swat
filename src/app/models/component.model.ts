export interface IComponent {
    id?:number;
    code?:string,
    name?:string,
    checkpoint_id?:number,
    checkpoint?:string
    unit?:string,
    specs?:string,
    weight?:number;
    photo?: string,
    time?:string,
    type?:string,
    type_id?:number,
    available?: number

}