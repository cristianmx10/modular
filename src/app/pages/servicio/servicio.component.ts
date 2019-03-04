import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../models/servicio.models';
import { ServicioService } from '../../services/service.index';
declare var swal:any;

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styles: []
})
export class ServicioComponent implements OnInit {
  totalServicios: number = 0;
  servicios: Servicio[] = [];
  desde: number = 0;
  constructor(
    public _servivioService: ServicioService
  ) { }

  ngOnInit() {
    this.cargarServicios();
  }

  //------------------------------------------------------------------
  cargarServicios() {
    this._servivioService.cargarServicios(this.desde)
      .subscribe((resp: any) => {
        this.totalServicios = resp.total;
        this.servicios = resp.servicios;
      });
  }
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalServicios) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarServicios();
  }
  //------------------------------------------------------------------

  //------------------------------------------------------------------
  borrarServicio(servicio: Servicio) {
    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + servicio.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
  
      if (borrar) {
        this._servivioService.borrarServicio(servicio._id)
        .subscribe(resp=>{
          console.log(resp);
          
          this.cargarServicios();
        });
      }
    });
  }
  //------------------------------------------------------------------

}
