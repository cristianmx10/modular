import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }
  //-------------------------------------------------------------------------------------------
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  login(usuario: Usuario) {

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  buscarUsuario(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.usuarios));
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .pipe(map(resp => {
        swal('Usuario Borrado', 'correcto', 'success');
        return true;
      }));
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .pipe(map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          let usuarioBD: Usuario = resp.usuario;
          this.guardarStorage(usuarioBD._id, this.token, usuarioBD);

        }
        swal('Usuario Actualizado', usuario.nombre, 'success');
        return true;
      }));
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';
    if (usuario._id) {
      url += '/'+usuario._id;
      url +='?token=' + this.token;
      return this.http.put(url, usuario)
      .pipe(map((resp:any)=>{
      swal('Actualizado',usuario.nombre,'success');
      return resp.usuario;
      }));
    }else{
      return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));
    }
    
  }
  //-------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------
  obtenerUsuario(id:string){
  let url = URL_SERVICIOS + '/usuario/' + id;
  return this.http.get(url)
  .pipe(map((resp:any)=>resp.usuario));
  }
  //-------------------------------------------------------------------------------------------



}
