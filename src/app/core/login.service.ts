import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaUsuario(Bandera: string, Datos: any) {
    return this.http.post<any>(this.url_servidor + 'consusuarioadmin/' + Bandera, Datos)
  }
  ConsultaMenu(Bandera: string, IdTipoUsuario: string, usucodig: string){
    return this.http.get<any>(this.url_servidor + 'consmenu/' + Bandera + '/' + IdTipoUsuario + '/' + usucodig);
  }
  constsubmenu(Bandera: string, IdTipoUsuario: string, usucodig: string) {
    return this.http.get<any>(this.url_servidor + 'constsubmenu/' + Bandera + '/' + IdTipoUsuario + '/' + usucodig);
  }
  consLoginCliente(Bandera: string, cuerpoService: any) {
    console.log(this.url_servidor + 'conslogincliente/' + Bandera)
    console.log(cuerpoService)
    return this.http.post<any>(this.url_servidor + 'conslogincliente/' + Bandera, cuerpoService)
  }

  send(cuerpoService: any) {
    return this.http.post<any>(this.url_servidor + 'send', cuerpoService)
  }

  modtokenpersona(Bandera: string, cuerpoService: any) {
    return this.http.post<any>(this.url_servidor + 'modtokenpersona/' + Bandera, cuerpoService)
  }

    //ValidaEmail
    EmailValido(email: string): boolean {
      let mailValido = false;
      'use strict';
  
      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
      if (email.match(EMAIL_REGEX)) {
        mailValido = true;
      }
      return mailValido;
    }
}
