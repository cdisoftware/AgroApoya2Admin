import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';



@NgModule({
  declarations: [
    LoginComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { }
