import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(
    public _sidebar: SidebarService
  ) { }

  ngOnInit() {
  }

}
