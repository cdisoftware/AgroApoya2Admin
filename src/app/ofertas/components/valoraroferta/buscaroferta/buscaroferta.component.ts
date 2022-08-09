import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../../core/metodosglobales.service'

@Component({
  selector: 'app-buscaroferta',
  templateUrl: './buscaroferta.component.html',
  styleUrls: ['./buscaroferta.component.css']
})
export class BuscarofertaComponent implements OnInit {
  Producto: string = '';
  Productor: string = '';
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

  keyword = 'name';
  data = [
    {
      id: 1,
      name: 'Georgia'
    },
     {
       id: 2,
       name: 'Usa'
     },
     {
       id: 3,
       name: 'England'
     }
  ];

  selectProducto(item: any) {
    // do something with selected item
    console.log(item)
  }

  selectProductor(item: any) {
    // do something with selected item
    console.log(item)
  }


  

}
