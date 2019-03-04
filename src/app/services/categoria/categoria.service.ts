import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, withLatestFrom } from 'rxjs/operators';
import { Categoria } from '../../models/categoria.models';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoria: Categoria;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }
  //------------------------------------------------------------------
  cargarCategorias(desde: number = 0) {
    let url = URL_SERVICIOS + '/categoria?desde=' + desde;
    return this.http.get(url);
  }

  cargarCategorias2(desde: number = 0) {
    let url = URL_SERVICIOS + '/categoria?desde=' + desde;
    return this.http.get(url)
    .pipe(map((resp:any)=>{
      return resp.categorias;
    }));
  }
  //------------------------------------------------------------------

  //------------------------------------------------------------------
  obtenerCategoria(id: string) {
    let url = URL_SERVICIOS + '/categoria/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.categoria));
  }
  //------------------------------------------------------------------

  //------------------------------------------------------------------
  crearCategoria(categoria: Categoria) {
    let url = URL_SERVICIOS + '/categoria';
    if (categoria._id) {
      url += '/' + categoria._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, categoria)
        .pipe(map((resp: any) => {
          swal('Actualizado', categoria.nombre, 'success');
          return resp.categoria;
        }));
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, categoria)
        .pipe(map((resp: any) => {
          swal('Categoria creado', categoria.nombre, 'success');
          return resp.categoria;
        }));
    }
  }
  //------------------------------------------------------------------

  //------------------------------------------------------------------
  borrarCategoria(id:string){
    let url = URL_SERVICIOS + '/categoria/'+ id;
    url += '?token=' +this._usuarioService.token;
    return this.http.delete(url)
    .pipe(map(resp=>{
        swal('Categoria Borrado','correctamente','success');
        return true;
    }));
  }
  //------------------------------------------------------------------
}
