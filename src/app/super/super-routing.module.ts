import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NuevosColegiosComponent } from './pages/nuevos-colegios/nuevos-colegios.component';

const routes:Routes=[{
  path:'',
  component:HomeComponent,
  children:[
    {
      path:'nuevocolegio',
      component:NuevosColegiosComponent
    },
    {
      path:'**',
      redirectTo:'home'
    }
  ]
}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class SuperRoutingModule { }
