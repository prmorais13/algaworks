import { Router } from '@angular/router';
import { Component, Output } from '@angular/core';

import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (
    private toastyConfig: ToastyConfig,
    private router: Router
  ) {
   // this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-right';
  }

  exibindoNavBar() {
    return this.router.url !== '/login';
  }
}
