import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula.service';
import { FilaPreMatricuala, NuevaMatricula } from '../../models/matricula';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pre-matriculas',
  templateUrl: './lista-pre-matriculas.component.html',
  styles: [
  ]
})
export class ListaPreMatriculasComponent implements OnInit {

  cargando:boolean=false;
  generandoPDF:boolean=false;


  preMatriculas:FilaPreMatricuala[]=[]
  constructor(
    private matriculaService: MatriculaService,
    private router:Router
    ) { 
    
  }
  ngOnInit(): void {
    this.cargando=true;
    this.matriculaService.obtenerPreMatriculas().subscribe(resp=>{
      if(resp.estado==='ok'&&resp.valor.length>0){
        this.preMatriculas=resp.valor;
        this.cargando=false;
      
      }else{
        this.cargando=false;
 
      }
    });
  }
  editar(matriculaId:number){
    const matricula= this.preMatriculas.find(pm=>pm.matriculaId==matriculaId);
    if(matricula){
      const { colegioId, anio,rut,matriculaId,cursoId,tipoDeEnsenanza} = matricula;
      let nuevaMatricula=new NuevaMatricula();
      nuevaMatricula={colegioId,anio,rut,cursoId,tipoDeEnsenanza,matriculaId};
    localStorage.setItem('nuevaMatricula',JSON.stringify(nuevaMatricula));
    this.router.navigateByUrl("/fichadematricula/nueva")
  }
   
  }
 
  generarMatriculaPDF(matriculaId:number):void{
    this.cargando=true;
    const matricula= this.preMatriculas.find(pm=>pm.matriculaId==matriculaId);
    const nombre=matricula?.nombre+ '_'+matricula?.anio+'.pdf';
    this.matriculaService.obtenerFichaDeMatriculaReportePDF(matriculaId,nombre).subscribe( resp=>{
      this.cargando=false;
    }       
    );
  }
}
