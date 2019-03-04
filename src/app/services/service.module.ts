import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './service.index';
import { SubirarchivoService } from './subirArchivo/subirarchivo.service';
import { ModalService } from '../components/modal/modal.service';

import {
  SidebarService,
  SharedService,
  UsuarioService,
  HabitacionService,
  CategoriaService,
  ServicioService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    HabitacionService,
    SubirarchivoService,
    CategoriaService,
    ServicioService,
    ModalService
  ],
  declarations: []
})
export class ServiceModule { }