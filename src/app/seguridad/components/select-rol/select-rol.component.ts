import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from '../../models/Rol';
import { AutenticacionService } from '../../services/autenticacion.service';


@Component({
  selector: 'app-select-rol',
  templateUrl: './select-rol.component.html',
  styleUrls: ['./select-rol.component.css']
})
export class SelectRolComponent implements OnInit {

  private _rolId: string = '';
  roles: Rol[] = [];
  rolesFiltrados: Rol[] = [];
  rolesSeleccionados: Rol = new Rol();


  @Input() set rolIdInput(valor: string) {
    if (valor != '') {
      this._rolId = valor;
      this.rolPorDefecto();
    }
  }
  @Output() rolId: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup = this.fb.group({
    rol: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private autentidacionService: AutenticacionService
  ) {
    this.autentidacionService.obtenerRoles().subscribe(resp => { this.roles = resp; this.rolPorDefecto(); })
  }

  ngOnInit(): void {
    this.form.get("rol")?.valueChanges.subscribe(rol => {
      this.rolId.emit(rol.id);
    })
  }

  rolPorDefecto(): void {
    let rol = this.roles.find(rol => rol.id == this._rolId);
    if (rol) {
      this.form.reset({
        rol: rol,
      });

    }

  }
  filtrarRol(event: any) {
    let filtered: Rol[] = [];
    let query = event.query;
    for (let i = 0; i < this.roles.length; i++) {
      let rol = this.roles[i];
      if (rol.name.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().search(query.toLowerCase()) != -1) {
        filtered.push(rol);
      }
    }
    this.rolesFiltrados = filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

}
