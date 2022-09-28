import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class PlantillacorreosService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaCorreoIndividual(bandera: string, IdPlantilla: string, usucodig: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'enviocorreoindividual/' + bandera + '/' + IdPlantilla + '/' + usucodig, Body)
  }

  ConsultaCorreosMasivos(bandera: string, IdPlantilla: string, IdTipoUsuario: string) {
    return this.http.get<any[]>(this.url_servidor + 'enviocorreomasivo/' + bandera + '/' + IdPlantilla + '/' + IdTipoUsuario)
  }
  
  ConsultaTipoPlatilla(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consctipoplantilla/' + Bandera)
  }

  ConsultaCorreoMomentoEnvio(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscorreomomentoenvio/' + Bandera)
  }

  ConsultaPlatillaCorreo(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'consaplantillacorreo/' + Bandera, Body)
  }

  ModPlantillaCorreo(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'modcaplantillacorreo/' + Bandera, Body)
  }

  ConsultaTipoCamposCorreo(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscatipocamposcorreo/' + Bandera)
  }
}
