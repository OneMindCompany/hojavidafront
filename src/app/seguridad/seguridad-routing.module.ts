import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
// import { DecodificarTokenGuard } from '../guards/decodificar-token.guard';

const routes:Routes=[
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent,
        //canActivate:[DecodificarTokenGuard]
      },
      {
        path:'**',
        redirectTo:'login'
      }
    ]
}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SeguridadRoutingModule { }
