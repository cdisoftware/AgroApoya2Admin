import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearofertaComponent } from './components/crearoferta/crearoferta.component';
import { BuscarofertaComponent } from './components/valoraroferta/buscaroferta/buscaroferta.component';
import { SectorizacionComponent } from './components/valoraroferta/sectorizacion/sectorizacion.component';
import { TransportistaComponent } from './components/valoraroferta/transportista/transportista.component';
import { ConsiliacionComponent } from './components/valoraroferta/consiliacion/consiliacion.component';
import { ValoracionComponent } from './components/valoraroferta/valoracion/valoracion.component';



@NgModule({
  declarations: [
    CrearofertaComponent,
    BuscarofertaComponent,
    SectorizacionComponent,
    TransportistaComponent,
    ConsiliacionComponent,
    ValoracionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OfertasModule { }
