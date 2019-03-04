import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';

declare var swal:any;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalUsuarios: number = 0;


  imagenSubir: File;
  usuario: Usuario = new Usuario();

  constructor(
    public _usuarioService: UsuarioService
  ) {
   }


  ngOnInit() {
    this.cargarUsuario();
   

  }
  //------------------------------------------------------------------
  cargarUsuario() {
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalUsuarios = resp.total;
        this.usuarios = resp.usuarios;
      });
  }
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalUsuarios) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuario();
  }
  //------------------------------------------------------------------

  //------------------------------------------------------------------
  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuario();
      return;
    }
    this._usuarioService.buscarUsuario(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      });

  }
  //------------------------------------------------------------------

  //------------------------------------------------------------------
  borrarUsuario(usuario:Usuario) {
  if (usuario._id=== this._usuarioService.usuario._id) {
    swal('No puede Borrar este usuario','no se puede borrar a si mismo','error');
    return;
  }

  swal({
    title: 'Esta seguro?',
    text: 'Esta a punto de borrar a ' + usuario.nombre,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((borrar) => {

    if (borrar) {
      this._usuarioService.borrarUsuario(usuario._id)
      .subscribe(resp=>{
        console.log(resp);
        
        this.cargarUsuario();
      });
    }
  });

  }
  //------------------------------------------------------------------

  //------------------------------------------------------------------
  actualiazarUsuario(usuario:Usuario){
    this._usuarioService.actualizarUsuario(usuario)
    .subscribe();
  }
  //------------------------------------------------------------------
}
