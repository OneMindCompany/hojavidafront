import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutenticacionService } from '../../../seguridad/services/autenticacion.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  get usuario(){
    return this.autenticacionService.usuario;
  } 
  constructor(private router: Router, private autenticacionService: AutenticacionService) { }
  items: MenuItem[] = [];
  

  ngOnInit() {
    //this.getDatosDeUsuario();
    this.items = [
      // {
      //   label: 'Principal',
      //   icon: 'pi pi-fw pi-home',
      //   routerLink: '/home'

      // },
      // {
      //   label: 'Nosotros',
      //   icon: 'pi pi-fw pi-users',
      //   routerLink: '/nosotros'
      // },
      // {
      //   label: 'Noticias',
      //   icon: 'pi pi-fw pi-globe',
      //   routerLink: '/noticias'
      // }
    ];
  };
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('datosUsuario');
    this.autenticacionService.getTokenDecoded();
    this.router.navigate(['/seguridad/login']).finally(()=>{window.location.reload();});
  };
  getDatosDeUsuario(): void {
    
   
  };

}
