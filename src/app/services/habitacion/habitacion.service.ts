import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Habitacion } from '../../models/habitacion.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  habitacion: Habitacion;
  constructor(
    public http: HttpClient,
    public _serviceUsuario: UsuarioService
  ) { }
  //------------------------------------------------------------------------
  cargarHabitaciones(desde: number = 0) {
    let url = URL_SERVICIOS + '/habitacion?desde' + desde;
    return this.http.get(url);
  }

  cargarHabitacion(desde: number = 0) {
    let url = URL_SERVICIOS + '/habitacion?desde' + desde;
    return this.http.get(url)
    .pipe(map((resp:any)=>{
      return resp.habitacion;
    }))
  }
  //------------------------------------------------------------------------

  //------------------------------------------------------------------------
  obtenerHabitacion(id: string) {
    let url = URL_SERVICIOS + '/habitacion/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.habitacion));
  }
  //------------------------------------------------------------------------

  //------------------------------------------------------------------------
  crearHabitacion(habitacion: Habitacion) {
    let url = URL_SERVICIOS + '/habitacion';
    if (habitacion._id) {
      url += '/' + habitacion._id;
      url += '?token=' + this._serviceUsuario.token;
      return this.http.put(url, habitacion)
        .pipe(map((resp: any) => {
          swal('Habitacion Actualizado', habitacion.numero, 'success');
          return resp.habitacion;
        }));
    } else {
      url += '?token=' + this._serviceUsuario.token;
      return this.http.post(url, habitacion)
        .pipe(map((resp: any) => {
          swal('Habitacion creado', habitacion.numero, 'success');
          return resp.habitacion
        }));
    }
  }
  //------------------------------------------------------------------------

  //------------------------------------------------------------------------
    borrarHabitacion(id:string){
      let url = URL_SERVICIOS + '/habitacion/' + id;
      url += '?token=' + this._serviceUsuario.token;
      return this.http.delete(url)
      .pipe(map(resp=>{
        swal('Habitacion borrado', 'Correctamente', 'success');
        return true;
      }));
    }
  //------------------------------------------------------------------------
}
