import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  providers: [MessageService],
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  items: MenuItem[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.items = [{
      label: 'DATOS DE MATRÍCULA',
      routerLink: '/fichadematricula/nueva',
    },
    {
      label: 'DATOS DEL ALUMNO',
      routerLink: '/fichadematricula/alumno'
    },
    {
      label: 'DATOS COMPLEMENTARIOS',
      routerLink: '/fichadematricula/informacioncomplementaria'
    },
    {
      label: 'APOD. TITULAR',
      routerLink: '/fichadematricula/apoderadot'
    },
    {
      label: 'APOD. SUPLENTE',
      routerLink: '/fichadematricula/apoderados'
    },
    {
      label: 'ENC. RETIRO',
      routerLink: '/fichadematricula/encargado'
    },
    {
      label: 'IMPRIMIR',
      routerLink: '/fichadematricula/resumen'
    }
    ];
  }

}
