import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColegioComponent } from './pages/colegio/colegio.component';
import { ApoderadosComponent } from './pages/apoderados/apoderados.component';
import { HomeComponent } from './pages/home/home.component';
import { InformacionDeColegioRoutingModule } from './informacion-de-colegio-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ColegioComponent,
    ApoderadosComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    InformacionDeColegioRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedModule 
  ]
})
export class InformacionDeColegioModule { }
