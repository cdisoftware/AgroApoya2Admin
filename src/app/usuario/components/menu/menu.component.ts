import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  IdUsuario: string = '';
  constructor(public rutas: Router, public cookies: CookieService) {

  }

  ngOnInit(): void {
    this.IdUsuario = this.cookies.get('IDU');
    if(this.IdUsuario == ''){
      this.rutas.navigateByUrl('');
    }
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
    this.cookies.deleteAll();
    this.rutas.navigateByUrl('');
  }


}
