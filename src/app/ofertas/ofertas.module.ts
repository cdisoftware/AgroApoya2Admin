import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CarruselOfertasComponent } from './components/carrusel-ofertas/carrusel-ofertas.component';
import { CarruselofertasComponent } from './components/carruselofertas/carruselofertas.component';



@NgModule({
  declarations: [

   CarruselOfertasComponent,
       CarruselofertasComponent    
  ],
  imports: [
    CommonModule,
  ]
})
export class OfertasModule { }
