import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome: string = 'Paulo Roberto';
  dataAniversario: Date = new Date(1961, 1, 14);
  preco: number = 13855.32;
  troco: number = 0.53;
}
