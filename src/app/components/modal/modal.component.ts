import { Component, OnInit } from '@angular/core';
import { SubirarchivoService } from '../../services/subirArchivo/subirarchivo.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {
  
  imagenSubir: File;
  imagenTemp: string;
  constructor(
    public _subirarchivoService : SubirarchivoService,
    public _modalservice: ModalService
  ) { }

  ngOnInit() {
  }
  //--------------------------------------------------------
  seleccionImage(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0){
      swal('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
    //console.log(event);
  }
  //--------------------------------------------------------
  subirImagen() {
    this._subirarchivoService.subirArchivo(this.imagenSubir, this._modalservice.tipo, this._modalservice.id)
      .then(resp => {
        
        this._modalservice.notificacion.emit(resp);
        this.cerrarmodal();
      })
      .catch(err => {
        console.log('Error en la carga');
      });
  }
  //--------------------------------------------------------
cerrarmodal(){
  this.imagenTemp = null;
  this.imagenSubir = null;
  this._modalservice.ocultarmodal();
}
  //--------------------------------------------------------
}
