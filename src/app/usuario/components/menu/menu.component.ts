import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './../../../core/login.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  IdUsuario: string = '';
  NombreUsuario: string = '';

  constructor(public rutas: Router,
    public cookies: CookieService,
    private servicioslogin: LoginService,) {

  }
  //cookies nombre usuario
  NombreUsu: string = this.cookies.get('nombreuser');
  idusua33: string = this.cookies.get('IDU');

  ListaMenu: any[];
  ListaSubMenu: any[];

  ngOnInit(): void {
    this.IdUsuario = this.cookies.get('IDU');
    this.NombreUsuario = this.cookies.get('nombreuser');
    if (this.IdUsuario == '') {
      this.rutas.navigateByUrl('');

    } else {
      this.Cargar();
    }
  }

  Cargar() {
    this.servicioslogin.ConsultaMenu('1', '4', this.IdUsuario).subscribe(Resultado => {
      this.ListaMenu = Resultado;
      this.servicioslogin.constsubmenu('1', '4', this.IdUsuario).subscribe(Respu => {
        this.ListaSubMenu = Respu;
      });
    })
  }

  toggleSidebar() {
    let elemento = document.getElementById('sidebar') as HTMLElement;
    if (elemento.getAttribute('class')) {
      this.mostrarSideBar();
    } else {
      elemento.setAttribute('class', 'active')
    }
  }

  mostrarSideBar() {
    let elemento = document.getElementById('sidebar') as HTMLElement;
    elemento.removeAttribute('class')
  }
}
