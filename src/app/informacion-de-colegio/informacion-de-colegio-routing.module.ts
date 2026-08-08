import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ColegioComponent } from './pages/colegio/colegio.component';
import { ApoderadosComponent } from './pages/apoderados/apoderados.component';
const routes:Routes=[
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'colegio',
        component:ColegioComponent
      },
      {
        path:'apoderados',
        component:ApoderadosComponent
      },
      {
        path:'**',
        redirectTo:'colegio'
      }
    ]
}
]



@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class InformacionDeColegioRoutingModule { }
