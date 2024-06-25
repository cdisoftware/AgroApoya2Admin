import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselofertasComponent } from './components/carruselofertas/carruselofertas.component';
import { MapacompraofertasComponent } from './components/reportes/mapacompraofertas/mapacompraofertas.component';


@NgModule({
  declarations: [
    CarruselofertasComponent,
    MapacompraofertasComponent
  ],

  imports: [
    CommonModule,
  ]
})
export class OfertasModule { }
