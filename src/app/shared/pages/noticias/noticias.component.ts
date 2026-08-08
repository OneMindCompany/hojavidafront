import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../../seguridad/services/autenticacion.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styles: [
  ]
})
export class NoticiasComponent {



  constructor(private router: Router,
    private autenticacionService: AutenticacionService
  ) { }
  logout() {
    this.router.navigateByUrl('/seguridad/login')
  }

}
