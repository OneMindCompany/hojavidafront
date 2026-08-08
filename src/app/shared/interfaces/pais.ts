export interface Pais {
    id:number;
    codigo:string;
    nombre: string;
    nacionalidadM: string;
    idioma: string;
    nacionalidadF: string;
}
export class PaisBase{
    id:number=0;
    nombre: string='';
}
