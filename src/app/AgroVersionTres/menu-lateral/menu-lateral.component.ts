import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  isMenuOpen: boolean = true;
  subMenuVisible: number | null = null;
  isMobileView: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.actualizarMenuSegunTamañoDeVentana();
  }

  @HostListener('window:resize', ['$event'])
  manejarCambioDeTamaño() {
    this.actualizarMenuSegunTamañoDeVentana();
  }

  actualizarMenuSegunTamañoDeVentana() {
    this.isMobileView = window.innerWidth <= 720;
    this.isMenuOpen = !this.isMobileView; // Abierto en pantallas grandes, cerrado en móviles
  }

  alternarMenuLateral() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  alternarVisibilidadSubMenu(index: number) {
    this.subMenuVisible = this.subMenuVisible === index ? null : index;
  }
  navegarA(ruta: string) {
    this.router.navigate([ruta]);
    if (this.isMobileView) {
      this.isMenuOpen = false;
    }
  }
}
