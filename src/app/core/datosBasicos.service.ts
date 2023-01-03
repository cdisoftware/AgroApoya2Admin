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

  ConsultaItem(Bandera: string, idDato: string,  Datos: any){
    return this.http.post<any>(this.url_servidor + 'conscdatosbasicositem/' + Bandera+'/' + idDato, Datos)
  }

  AgregarItem(Bandera: string, Datos: any){
    return this.http.post<any>(this.url_servidor + 'modcdatosbasicossubitem/' + Bandera, Datos)
  }

  ConsultaLabel(Bandera: string, idModulo: string){
    return this.http.get<any>(this.url_servidor + 'conscmascaradatbasic/' + Bandera +'/' + idModulo)
  }

  CosultaRelacion(){
    return this.http.get<any>(this.url_servidor + 'conscrelaciondatosbasicos/1/1')
  }

  ConsultaRelacionItem(idDatoBasico:string, idDatoRelacion:string, idSubItem:string){
    console.log(this.url_servidor + 'conscrelaciondbasicossubitem/1/' + idDatoBasico +'/'+ idDatoRelacion+'/'+idSubItem)
    return this.http.get<any>(this.url_servidor + 'conscrelaciondbasicossubitem/1/1/'+ idDatoRelacion+'/'+idSubItem)

  }

  modificarRelacion(bandera:string, Datos: any){
    return this.http.post<any>(this.url_servidor + 'conscdatosbasicositem/' + bandera, Datos)
  }


}
