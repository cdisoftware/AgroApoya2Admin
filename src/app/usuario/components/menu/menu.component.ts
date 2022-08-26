import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public rutas: Router,) {

  }

  ngOnInit(): void {
  }
  Home() {
    this.rutas.navigateByUrl('/home');
  }

  CrearOferta() {
    this.rutas.navigateByUrl('/home/crearoferta');
  }

  ValorarOferta() {
    this.rutas.navigateByUrl('/home/buscaroferta');
  }

  CerrarSession() {
    this.rutas.navigateByUrl('');
  }


}
