import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class datosBasicosService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaDatos(Bandera: string){
    return this.http.get<any>(this.url_servidor + 'constmoddatosbasicos/' + Bandera)
  }

  ConsultaBasicos(Bandera: string, idModulo: string){
    return this.http.get<any>(this.url_servidor + 'constdatosbasicos/' + Bandera +'/' + idModulo)
  }

  ConsultaUsuario(Bandera: string, idDato: string,  Datos: any){
    return this.http.post<any>(this.url_servidor + 'consusuarioadmin/' + Bandera+'/' + idDato, Datos)
  }

}
