import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';
  public notificacion = new EventEmitter<any>();
  constructor() {
    console.log('listo!!!');
  }
  ocultarmodal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }
  mostrarmodal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
