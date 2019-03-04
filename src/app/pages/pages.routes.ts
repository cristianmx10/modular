import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { ReservaComponent } from './reserva/reserva.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ServicioComponent } from './servicio/servicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginGuardGuard } from '../services/guards/login-guard.service';
import { NewuserComponent } from './usuario/newuser.component';
import { NewservicioComponent } from './servicio/newservicio.component';
import { NewhabComponent } from './habitaciones/newhab.component';
import { NewcatComponent } from './categoria/newcat.component';
import { NewreservaComponent } from './reserva/newreserva.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'home', component: HomeComponent, data: { titulo: 'Inicio' } },
            { path: 'habitacion', component: HabitacionesComponent, data: { titulo: 'Habitacion' } },
            { path: 'newhab/:id', component: NewhabComponent, data: { titulo: 'newhab' } },
            { path: 'reserva', component: ReservaComponent, data: { titulo: 'Reserva' } },
            { path: 'newreserva/:id', component: NewreservaComponent, data: { titulo: 'newReserva' } },
            { path: 'categoria', component: CategoriaComponent, data: { titulo: 'Categoria' } },
            { path: 'newcat/:id', component: NewcatComponent, data: { titulo: 'newCategoria' } },
            { path: 'servicio', component: ServicioComponent, data: { titulo: 'Servicio' } },
            { path: 'service/:id', component: NewservicioComponent, data: { titulo: 'Nuevoservice' } },
            { path: 'usuario', component: UsuarioComponent, data: { titulo: 'Usuario' } },
            { path: 'user/:id', component: NewuserComponent, data: { titulo: 'nuevouser' } },
            { path: '', redirectTo: '/home', pathMatch: 'full' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);