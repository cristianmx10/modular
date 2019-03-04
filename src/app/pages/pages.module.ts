import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';

import { HomeComponent } from './home/home.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { ReservaComponent } from './reserva/reserva.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ServicioComponent } from './servicio/servicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { NewuserComponent } from './usuario/newuser.component';
import { NewservicioComponent } from './servicio/newservicio.component';
import { NewhabComponent } from './habitaciones/newhab.component';
import { NewcatComponent } from './categoria/newcat.component';
import { ModalComponent } from '../components/modal/modal.component';
import { NewreservaComponent } from './reserva/newreserva.component';

@NgModule({
    declarations: [
        HomeComponent,
        HabitacionesComponent,
        ReservaComponent,
        CategoriaComponent,
        ServicioComponent,
        UsuarioComponent,
        PagesComponent,
        NewuserComponent,
        NewservicioComponent,
        NewhabComponent,
        NewcatComponent,
        ModalComponent,
        NewreservaComponent
    ],
    exports: [
        HomeComponent,
        HabitacionesComponent,
        ReservaComponent,
        CategoriaComponent,
        ServicioComponent,
        UsuarioComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule,
        ChartsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PagesModule { }