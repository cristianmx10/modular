import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Servicio } from '../../models/servicio.models';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  servicio: Servicio;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }
  //------------------------------------------------------------
  cargarServicios(desde: number = 0) {
    let url = URL_SERVICIOS + '/servicio?desde=' + desde;
    return this.http.get(url);
  }
  cargarServicios2(desde: number = 0) {
    let url = URL_SERVICIOS + '/servicio?desde=' + desde;
    return this.http.get(url)
    .pipe(map((resp:any)=>{
      return resp.servicios;
    }));
  }
  //------------------------------------------------------------
  //-------------------------------------------------------------------------------------------
  buscarServicio(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/servicios/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.usuarios));
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  borrarServicio(id: string) {
    let url = URL_SERVICIOS + '/servicio/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .pipe(map(resp => {
        swal('Usuario Borrado', 'correcto', 'success');
        return true;
      }));
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  obtenerServicio(id: string) {
    let url = URL_SERVICIOS + '/servicio/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.servicio));
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  crearServicio(servicio: Servicio) {
    let url = URL_SERVICIOS + '/servicio';
    if (servicio._id) {
      url += '/' + servicio._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, servicio)
        .pipe(map((resp: any) => {
          swal('Actualizado', servicio.nombre, 'success');
          return resp.servicio;
        }));
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, servicio)
        .pipe(map((resp: any) => {
          swal('Servicio creado', servicio.nombre, 'success');
          return resp.servicio;
        }));
    }
  }
  //-------------------------------------------------------------------------------------------
}
