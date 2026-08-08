import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { MenuComponent } from './pages/menu/menu.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { MenuAsideComponent } from './pages/menu-aside/menu-aside.component';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';

import { SelectPaisComponent } from './components/select-pais/select-pais.component';
import { ErrorMsgDirective } from './directives/error-msg.directive';
import { SelectEtniaComponent } from './components/select-etnia/select-etnia.component';
import { SelectGeneroComponent } from './components/select-genero/select-genero.component';
import { SelectReligionComponent } from './components/select-religion/select-religion.component';
import { SelectRegionComponent } from './components/select-region/select-region.component';
import { SelectComunaComponent } from './components/select-comuna/select-comuna.component';
import { SelectColegioComponent } from './components/select-colegio/select-colegio.component';
import { SelectAnioComponent } from './components/select-anio/select-anio.component';
import { SelectCursoColegioComponent } from './components/select-curso-colegio/select-curso-colegio.component';
import { SelectPrevisionComponent } from './components/select-prevision/select-prevision.component';
import { SelectProblemasDeSaludComponent } from './components/select-problemas-de-salud/select-problemas-de-salud.component';
import { SelectParentescoComponent } from './components/select-parentesco/select-parentesco.component';
import { SelectEstadoCivilComponent } from './components/select-estado-civil/select-estado-civil.component';
import { SelectTenenciaDeViviendaComponent } from './components/select-tenencia-de-vivienda/select-tenencia-de-vivienda.component';
import { SelectNivelEducacionalComponent } from './components/select-nivel-educacional/select-nivel-educacional.component';
import { SelectProfesionComponent } from './components/select-profesion/select-profesion.component';



@NgModule({
  declarations: [
    ErrorPageComponent,
    MenuComponent,
    MenuAsideComponent,
    HomeComponent,
    NosotrosComponent,
    NoticiasComponent,

    SelectPaisComponent,
    ErrorMsgDirective,
    SelectEtniaComponent,
    SelectGeneroComponent,
    SelectReligionComponent,
    SelectRegionComponent,
    SelectComunaComponent,
    SelectColegioComponent,
    SelectAnioComponent,
    SelectCursoColegioComponent,
    SelectPrevisionComponent,
    SelectProblemasDeSaludComponent,
    SelectParentescoComponent,
    SelectEstadoCivilComponent,
    SelectTenenciaDeViviendaComponent,
    SelectNivelEducacionalComponent,
    SelectProfesionComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuComponent,
    MenuAsideComponent,

    SelectPaisComponent,
    SelectEtniaComponent,
    SelectGeneroComponent,
    SelectReligionComponent,
    SelectRegionComponent,
    SelectComunaComponent,
    SelectColegioComponent,
    SelectAnioComponent,
    SelectCursoColegioComponent,
    SelectPrevisionComponent,
    SelectProblemasDeSaludComponent,
    SelectParentescoComponent,
    SelectEstadoCivilComponent,
    SelectTenenciaDeViviendaComponent,
    SelectNivelEducacionalComponent,
    SelectProfesionComponent,
    ErrorMsgDirective
  ]
})
export class SharedModule { }
