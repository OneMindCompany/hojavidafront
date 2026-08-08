import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectRolComponent } from './components/select-rol/select-rol.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';





@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SelectRolComponent,
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SeguridadModule { }
