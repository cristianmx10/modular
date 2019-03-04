import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styles: []
})
export class NewuserComponent implements OnInit {

  imagenSubir: File;
  usuario: Usuario = new Usuario();
  constructor(
    public _usuarioService: UsuarioService,
    public activateRoute: ActivatedRoute
  ) {
    activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.obtenerUsuario(id);
      }
    });
  }

  ngOnInit() {
  }

  obtenerUsuario(id: string) {
    this._usuarioService.obtenerUsuario(id)
      .subscribe(usuario => this.usuario = usuario);
  }

  seleccionImagen(event) {
    console.log(event);

  }
  guardarUsuario(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._usuarioService.crearUsuario(this.usuario)
      .subscribe(usuario => {
        console.log(usuario);
      });

  }


}
