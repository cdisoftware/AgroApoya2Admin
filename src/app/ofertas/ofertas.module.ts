import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CarruselofertasComponent } from './components/carruselofertas/carruselofertas.component';
import { UltimamillamultientregasComponent } from './components/ultimamillamultientregas/ultimamillamultientregas.component';




@NgModule({
  declarations: [
    CarruselofertasComponent,
    UltimamillamultientregasComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class OfertasModule { }
