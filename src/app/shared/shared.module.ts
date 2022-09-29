import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutprincipalComponent } from './layoutprincipal/layoutprincipal.component';
import { MenuComponent } from './../usuario/components/menu/menu.component'
import { AppRoutingModule } from './../app-routing.module'

@NgModule({
  declarations: [
    LayoutprincipalComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],bootstrap: [SharedModule]
})
export class SharedModule { }
