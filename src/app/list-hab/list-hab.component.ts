import { Component, OnInit } from '@angular/core';
import { Habitacion } from '../models/habitacion.model';
import { HabitacionService } from '../services/service.index';

@Component({
  selector: 'app-list-hab',
  templateUrl: './list-hab.component.html',
  styles: []
})
export class ListHabComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  totalHabitaciones:number=0;
  desde:number = 0;
  constructor(
    public _habitacionService: HabitacionService
  ) { }

  ngOnInit() {
    this.cargarHabitaciones();
  }
  cargarHabitaciones() {
    this._habitacionService.cargarHabitaciones(this.desde)
    .subscribe((resp:any)=>{
      this.totalHabitaciones = resp.total;
      this.habitaciones = resp.habitacion;
    })
  }
}
