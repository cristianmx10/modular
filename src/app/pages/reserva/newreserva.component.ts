import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-newreserva',
  templateUrl: './newreserva.component.html',
  styles: []
})
export class NewreservaComponent implements OnInit {

  constructor(
    public activateRoute: ActivatedRoute
  ) {
    activateRoute.params.subscribe(params => {
      let id = params['id'];
    });
   }

  ngOnInit() {
  }

}
