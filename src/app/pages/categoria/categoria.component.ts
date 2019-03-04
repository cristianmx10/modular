import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/service.index';
import { Categoria } from '../../models/categoria.models';
declare var swal:any;

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styles: []
})
export class CategoriaComponent implements OnInit {
  desde: number = 0;
  categorias: Categoria[] = [];
  totalCategorias: number = 0;
  constructor(
    public _serviceCategoria: CategoriaService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }
  //------------------------------------------------------------------
  cargarCategorias() {
    this._serviceCategoria.cargarCategorias(this.desde)
      .subscribe((resp: any) => {
        this.totalCategorias = resp.total;
        this.categorias = resp.categorias;
      });
  }
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalCategorias) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarCategorias();
  }
  //------------------------------------------------------------------

  //------------------------------------------------------------------
borrarCategoria(categoria:Categoria){
  swal({
    title: 'Esta seguro?',
    text: 'Esta a punto de borrar a ' + categoria.nombre,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((borrar) => {

    if (borrar) {
      this._serviceCategoria.borrarCategoria(categoria._id)
      .subscribe(resp=>{
        console.log(resp);
        
        this.cargarCategorias();
      });
    }
  });
}
  //------------------------------------------------------------------
}
