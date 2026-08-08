import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProblemaDeSalud } from '../../interfaces/problemaDeSalud';
import { ProblemasDeSaludService } from '../../services/problemas-de-salud.service';

@Component({
  selector: 'app-select-problemas-de-salud',
  templateUrl: './select-problemas-de-salud.component.html',
  styles: [
  ]
})
export class SelectProblemasDeSaludComponent implements OnInit {


  problemasDeSalud: ProblemaDeSalud[] = [];
  @Input() set problemasInput(valor: ProblemaDeSalud[]) {
    if(valor){
      this.form.patchValue({problemasDeSaludSeleccionados:valor
  })
  }}
  
 @Output() problemas:EventEmitter<ProblemaDeSalud[]>=new EventEmitter<ProblemaDeSalud[]>();

  form: FormGroup = this.fb.group({
    problemasDeSaludSeleccionados: [""],
  });
  constructor(
    private fb: FormBuilder,
    private problemasDeSaludService:ProblemasDeSaludService
  ) { 
    this.problemasDeSaludService.obtenerProblemasDeSalud().subscribe(resp=>{this.problemasDeSalud=resp;})
  }
  ngOnInit(): void {
    this.form.get("problemasDeSaludSeleccionados")?.valueChanges.subscribe(problemasDeSalud=>{
      this.problemas.emit(problemasDeSalud);
    })
  }

}
