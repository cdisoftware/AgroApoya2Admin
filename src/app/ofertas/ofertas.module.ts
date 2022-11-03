import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ComprasComponent } from './components/compras/compras.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

@NgModule({
  declarations: [
  
    ComprasComponent,
       UsuariosComponent
  ],
  imports: [
    CommonModule,
    AutocompleteLibModule
  ]
})
export class OfertasModule { }
