import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearofertaComponent } from './components/crearoferta/crearoferta.component';
import { BuscarofertaComponent } from './components/valoraroferta/buscaroferta/buscaroferta.component';



@NgModule({
  declarations: [
    CrearofertaComponent,
    BuscarofertaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OfertasModule { }
