import { Component, OnInit } from '@angular/core';
import { FichaDeMatriculaReporte } from '../../models/matricula';
import { MatriculaService } from '../../services/matricula.service';
import { AutenticacionService } from 'src/app/seguridad/services/autenticacion.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  cargando: boolean = false;
  fichaDeMatriculaReporte: FichaDeMatriculaReporte = new FichaDeMatriculaReporte();
  get usuario() {
    return this.autenticacionService.usuario;
  }

  constructor(private matriculaService: MatriculaService, 
    private autenticacionService: AutenticacionService) {
    if (localStorage.getItem('nuevaMatricula')) {
      const { matriculaId } = JSON.parse(localStorage.getItem('nuevaMatricula')!);
      this.matriculaService.obtenerFichaDeMatriculaReporte(matriculaId).subscribe(resp => {
        if (resp.estado == "ok" && resp.valor.apellidoPAlumno) {
          this.fichaDeMatriculaReporte = resp.valor;
        }
      })
    }

  }

  ngOnInit(): void {
  }
  generarMatriculaPDF():void{
    this.cargando = true;
    let nombre="Plantilla_de_Matrícula.pdf"
    if(localStorage.getItem('nuevaMatricula')){
      let { matriculaId } = JSON.parse(localStorage.getItem('nuevaMatricula')!);
      nombre=this.fichaDeMatriculaReporte.apellidoPAlumno+ '_'+this.fichaDeMatriculaReporte.apellidoMAlumno+ '_'+this.fichaDeMatriculaReporte.nombreAlumno+ '_'+this.fichaDeMatriculaReporte.gestion+'.pdf';
      this.matriculaService.obtenerFichaDeMatriculaReportePDF(matriculaId,nombre).subscribe( resp=>{
        this.cargando=false;
      }
      );
    }else{
      this.matriculaService.obtenerFichaDeMatriculaReportePDF(0,nombre).subscribe( resp=>{
        this.cargando=false;
      }
      );
    }
    
  }
 
}
