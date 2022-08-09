import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../../core/metodosglobales.service'

@Component({
  selector: 'app-buscaroferta',
  templateUrl: './buscaroferta.component.html',
  styleUrls: ['./buscaroferta.component.css']
})
export class BuscarofertaComponent implements OnInit {
  Producto: string = '';
  IdProducto: string = '0';
  ValidaBusqueda: string = '0'

  constructor(
    private SeriviciosGenerales: MetodosglobalesService
  ) { }


  ngOnInit(): void {
  }

  Buscar(){
    this.ValidaBusqueda = '1';
  }

  Limpiar(){
    this.ValidaBusqueda = '0';
  }

  

}
