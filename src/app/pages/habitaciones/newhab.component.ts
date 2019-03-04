import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../../services/habitacion/habitacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitacion } from '../../models/habitacion.model';
import { NgForm } from '@angular/forms';
import { Categoria } from '../../models/categoria.models';
import { CategoriaService } from '../../services/service.index';
import { ModalService } from '../../components/modal/modal.service';

@Component({
  selector: 'app-newhab',
  templateUrl: './newhab.component.html',
  styles: []
})
export class NewhabComponent implements OnInit {
  habitacion: Habitacion = new Habitacion();
  categorias: Categoria[] = [];
  categoria: Categoria = new Categoria();
  constructor(
    public _habitacionService: HabitacionService,
    public activatedRouter: ActivatedRoute,
    public router: Router,
    public _categiriaService: CategoriaService,
    public _modalservice: ModalService
  ) {
    activatedRouter.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarHabitacion(id);
      }
    });
  }

  ngOnInit() {

    this._categiriaService.cargarCategorias2()
      .subscribe(categorias => this.categorias = categorias);
      this._modalservice.notificacion
      .subscribe((resp:any)=> this.cargarHabitacion(this.habitacion._id))
  }
  mostrarmodal(id: string) {
    this._modalservice.mostrarmodal('habitaciones', id);
  }
  //------------------------------------------------------------------
  cargarHabitacion(id: string) {
    this._habitacionService.obtenerHabitacion(id)
      .subscribe(habitacion => {
        this.habitacion = habitacion;
        this.habitacion.categoria = habitacion.categoria._id;
        this.cambioCategoria(this.habitacion.categoria);
      });
  }
  //------------------------------------------------------------------

  //------------------------------------------------------------------
  guardarHabitacion(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._habitacionService.crearHabitacion(this.habitacion)
      .subscribe(habitacion => {
        this.habitacion._id = habitacion._id;
        this.router.navigate(['/newhab', habitacion._id])
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
  cambioCategoria(id: string) {
    this._categiriaService.obtenerCategoria(id)
      .subscribe(categoria => this.categoria = categoria);
  }

  //------------------------------------------------------------------

}


