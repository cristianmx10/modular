import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any=[
    {titulo: 'Menu',icon: 'fa fa-home', url:'/home' },
    {titulo: 'categoria', url:'/categoria', icon:'fa fa-list'},
    {titulo: 'habitacion', url: '/habitacion', icon:'fa fa-bed'},
    {titulo: 'servicio', url: '/servicio', icon:'fa fa-cube'},
    {titulo: 'usuario', url: '/usuario', icon:'fa fa-users',},
    {titulo: 'reserva', url: '/reserva', icon:'fa fa-calendar',}
  ]
  constructor() { }
}
