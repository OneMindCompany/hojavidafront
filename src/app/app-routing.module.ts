import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { NosotrosComponent } from './shared/pages/nosotros/nosotros.component';
import { NoticiasComponent } from './shared/pages/noticias/noticias.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { DecodificarTokenGuard } from './guards/decodificar-token.guard';

const routes:Routes=[
  {
    path:'seguridad',
    loadChildren:()=>import('./seguridad/seguridad.module').then(m=>m.SeguridadModule),
    canActivate:[DecodificarTokenGuard],
    canLoad:[DecodificarTokenGuard],
  },
  {
    path:'fichadematricula',
    loadChildren:()=>import('./ficha-de-matricula/ficha-de-matricula.module').then(m=>m.FichaDeMatriculaModule),
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  {
    path:'informaciondecolegio',
    loadChildren:()=>import('./informacion-de-colegio/informacion-de-colegio.module').then(m=>m.InformacionDeColegioModule),
    // canActivate:[ValidarTokenGuard],
    // canLoad:[ValidarTokenGuard]
  },
  {
    path:'super',
    loadChildren:()=>import('./super/super.module').then(m=>m.SuperModule),
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[DecodificarTokenGuard],
    canLoad:[DecodificarTokenGuard]
  },
  {
    path:'nosotros',
    component:NosotrosComponent
  },
  {
    path:'noticias',
    component:NoticiasComponent
  },
  {
      path:'404',
      component:ErrorPageComponent
  },
  {
    path:'**',
    redirectTo:'home'
  }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
