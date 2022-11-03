import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ComprasComponent } from './components/compras/compras.component';


@NgModule({
  declarations: [



  
    UsuariosComponent,
             ComprasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { }
