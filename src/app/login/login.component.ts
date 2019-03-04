import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  auth2:any;
  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.googleInit();
  }
//-----------------------------------------------------------------------------------------
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '617741036821-kcpb6gjpm97d6lan1be37tdrv8lps4c5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let token = googleUser.getAuthResponse().id_token;

      this.zone.run(() => {
        this._usuarioService.loginGoogle(token)
        .subscribe( isLogado => this.router.navigate(['/home']));
      });
      //let profile = googleUser.getBasicProfile();
      //console.log(token);
    });
  }

//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario)
      .subscribe(correcto => this.router.navigate(['/home']));

  }
//-----------------------------------------------------------------------------------------
}
