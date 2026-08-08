import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[d-error-msg]'
})
export class ErrorMsgDirective implements OnInit {

  private _color:string ="var(--pink-700)";
  private _mensaje:string="Este campo es obligatorio!";

  htmlElement: ElementRef<HTMLElement>;

  @Input() set color(valor: string) {
      this.color=valor;
      this.setColor();
  }
  @Input() set mensaje(valor: string) {
      this._mensaje=valor;
      this.setMensaje();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }
  ngOnInit(): void {
    this.setClase();
    this.setColor();
    this.setMensaje();
  }
  setClase(): void{
    this.htmlElement.nativeElement.classList.add("p-0");
    this.htmlElement.nativeElement.classList.add("m-0");
  }
  setColor(): void {
    this.htmlElement.nativeElement.style.color = this._color;
  }
  setMensaje(): void {
    this.htmlElement.nativeElement.innerText = this._mensaje;
  }
}
