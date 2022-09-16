import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-costeo',
  templateUrl: './costeo.component.html',
  styleUrls: ['./costeo.component.css']
})
export class CosteoComponent implements OnInit {

  Producto: string = 'Papa pastusa fina';
  Unidades: string = '800';
  Empaque: string = '25 libras';
  constructor() { }

  ngOnInit(): void {
  }

}
