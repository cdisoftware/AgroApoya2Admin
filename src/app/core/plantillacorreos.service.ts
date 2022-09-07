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
}
