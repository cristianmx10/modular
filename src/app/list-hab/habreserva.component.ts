import { Component, OnInit } from '@angular/core';
import { Habitacion } from '../models/habitacion.model';
import { Categoria } from '../models/categoria.models';
import { HabitacionService, CategoriaService } from '../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from '../models/servicio.models';
import { ServicioService } from '../services/servicio/servicio.service';
import { Reserva } from '../models/reserva.models';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservaService } from '../services/reserva/reserva.service';

@Component({
  selector: 'app-habreserva',
  templateUrl: './habreserva.component.html',
  styles: []
})
export class HabreservaComponent implements OnInit {


  forma: FormGroup;
  habitacion: Habitacion = new Habitacion();
  habitaciones: Habitacion[] = [];
  servicios: Servicio[] = [];
  servicio: Servicio = new Servicio();
  habrese = {};
  reserva: Reserva = new Reserva();
  constructor(
    public _habitacionService: HabitacionService,
    public activatedRouter: ActivatedRoute,
    public router: Router,
    public _categiriaService: CategoriaService,
    public _servicioService: ServicioService,
    public _reserva: ReservaService
  ) {
    activatedRouter.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarHabitacion(id);
        console.log(id);
        this.habrese = this._habitacionService.obtenerHabitacion(params['id']);
      }
    });
  }

  ngOnInit() {

   
    this._habitacionService.cargarHabitacion()
      .subscribe(habitacion => this.habitaciones = habitacion);
      
    this._servicioService.cargarServicios2()
      .subscribe(servicios =>{
        this.servicios = servicios;
        console.log(servicios);
      } );

    this.forma = new FormGroup({

      dni: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.required),
      fechainicio: new FormControl(null, Validators.required),
      fechafin: new FormControl(null, Validators.required),
      habitacion: new FormControl(this.habrese, Validators.required),
      total: new FormControl(80, Validators.required),
      servicio: new FormControl(null,Validators.required)
    });

  }
  //------------------------------------------------------------------
  cargarHabitacion(id: string) {
    this._habitacionService.obtenerHabitacion(id)
      .subscribe(habitacion => {
        this.habitacion = habitacion;
      });
  }
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  obtenerHabitacion(id: string) {
    this._habitacionService.obtenerHabitacion(id)
      .subscribe(habitacion => this.habitacion = habitacion);
  }
  //------------------------------------------------------------------

  //------------------------------------------------------------------
  

  guardarReserva() {

    if (this.forma.invalid) {
      console.log('dsfsdf');
      return;
    }
    let newreserva = new Reserva(
      this.forma.value.dni,
      this.forma.value.nombre,
      this.forma.value.apellidos,
      this.forma.value.numero,
      this.forma.value.fechainicio,
      this.forma.value.fechafin,
      this.forma.value.habitacion,
      this.forma.value.total,
      this.forma.value.servicio
    );

    this._reserva.crearReserva(newreserva)
      .subscribe(reserva => {
        console.log(reserva);

      });
  }
  //------------------------------------------------------------------

}
