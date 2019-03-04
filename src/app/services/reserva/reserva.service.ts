import { Injectable } from '@angular/core';
import { Reserva } from '../../models/reserva.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  reserva: Reserva;
  constructor(
    public http: HttpClient,
  ) { }
  crearReserva(reserva: Reserva) {
    let url = URL_SERVICIOS + '/reserva';
    return this.http.post(url, reserva)
      .pipe(map((resp: any) => {
        swal('Reserva creada', 'correctamente', 'success');
        return resp.reserva;
      }));
  }
}
