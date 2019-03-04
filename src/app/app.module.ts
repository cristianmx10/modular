import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//RUTAS
import { APP_ROUTES } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modulos
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ServiceModule } from './services/service.module';
import { ListHabComponent } from './list-hab/list-hab.component';
import { PipesModule } from './pipes/pipes.module';
import { HabreservaComponent } from './list-hab/habreserva.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListHabComponent,
    HabreservaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
