import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CarruselofertasComponent } from './components/carruselofertas/carruselofertas.component';



@NgModule({
  declarations: [
    CarruselofertasComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class OfertasModule { }
