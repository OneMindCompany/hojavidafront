import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperRoutingModule } from './super-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NuevosColegiosComponent } from './pages/nuevos-colegios/nuevos-colegios.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    NuevosColegiosComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SuperRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class SuperModule { }
