import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ListHabComponent } from './list-hab/list-hab.component';
import { HabreservaComponent } from './list-hab/habreserva.component';

const appRoutes: Routes = [
    
    { path: 'habitaciones', component: ListHabComponent },
    { path: 'habreserva/:id', component: HabreservaComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NopagefoundComponent }
]
export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});