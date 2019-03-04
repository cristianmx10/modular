import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.models';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-newcat',
  templateUrl: './newcat.component.html',
  styles: []
})
export class NewcatComponent implements OnInit {
  categoria: Categoria = new Categoria();
  constructor(
    public _categoriaService: CategoriaService,
    public activateRoute: ActivatedRoute,
  ) {
    activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.obtenerCategoria(id);
      }
    });
  }

  ngOnInit() {
  }
  //------------------------------------------------------------------

  guardarCategoria(f:NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._categoriaService.crearCategoria(this.categoria)
    .subscribe();
  }

  //------------------------------------------------------------------

  //------------------------------------------------------------------
  obtenerCategoria(id: string) {
    this._categoriaService.obtenerCategoria(id)
      .subscribe(categoria => this.categoria = categoria);
  }
  //------------------------------------------------------------------
}
