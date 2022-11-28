import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaUsuario(Bandera: string, Datos: any){
    return this.http.post<any>(this.url_servidor + 'consusuarioadmin/' + Bandera, Datos)
  }
  ConsultaMenu(Bandera: string, IdTipoUsuario: string, usucodig: string){
    return this.http.get<any>(this.url_servidor + 'consmenu/' + Bandera + '/' + IdTipoUsuario + '/' + usucodig);
  }
  constsubmenu(Bandera: string, IdTipoUsuario: string, usucodig: string){
    return this.http.get<any>(this.url_servidor + 'constsubmenu/' + Bandera + '/' + IdTipoUsuario + '/' + usucodig);
  }
}
