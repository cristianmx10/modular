import { Component, OnInit } from '@angular/core';
import { HabitacionService } from 'src/app/services/service.index';
import { Habitacion } from '../../models/habitacion.model';
import { ModalService } from 'src/app/components/modal/modal.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styles: []
})
export class HabitacionesComponent implements OnInit {
habitaciones: Habitacion[]=[];
totalHabitaciones:number =0;
desde:number = 0;
  constructor(
    public _habitacionService: HabitacionService,
    public _modalservice: ModalService
  ) { }

  ngOnInit() {
    this.cargarHabitaciones();
    this._modalservice.notificacion
    .subscribe(resp=>this.cargarHabitaciones());
  }
cargarHabitaciones(){
  this._habitacionService.cargarHabitaciones(this.desde)
  .subscribe((resp:any)=>{
  this.totalHabitaciones = resp.total;
  this.habitaciones=resp.habitacion;
  });
}
cambiarDesde(valor: number) {
  let desde = this.desde + valor;
  if (desde >= this.totalHabitaciones) {
    return;
  }
  if (desde < 0) {
    return;
  }
  this.desde += valor;
  this.cargarHabitaciones();
}
//====================================================================
borrarHabitacion(habitacion: Habitacion) {
  this._habitacionService.borrarHabitacion(habitacion._id)
    .subscribe(() => this.cargarHabitaciones());
}
//====================================================================
}
