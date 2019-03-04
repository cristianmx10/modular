import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/service.index';
import { Servicio } from '../../models/servicio.models';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newservicio',
  templateUrl: './newservicio.component.html',
  styles: []
})
export class NewservicioComponent implements OnInit {
  servicio: Servicio = new Servicio();
  constructor(
    public _servicioService: ServicioService,
    public activateRoute: ActivatedRoute
  ) {
    activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.obtenerServicio(id);
      }
    });
   }

  ngOnInit() {
  }
  guardarServicio(f:NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._servicioService.crearServicio(this.servicio)
      .subscribe(servicio => {
        console.log(servicio);

      });
  }
  obtenerServicio(id: string) {
    this._servicioService.obtenerServicio(id)
      .subscribe(servicio => this.servicio = servicio);
  }
}
