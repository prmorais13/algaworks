import { Component, OnInit } from '@angular/core';

import { ItemService } from '../item/item.service';

@Component({
  selector: 'app-item-cadastro',
  templateUrl: './item-cadastro.component.html',
  styleUrls: ['./item-cadastro.component.css']
})
export class ItemCadastroComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  itens: any = [];

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.itemService.lista()
      .subscribe(dados => this.itens = dados);
  }
}
