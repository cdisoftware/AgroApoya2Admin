import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class EmbajadoresService {

  url_servidor: string;

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) {
    this.url_servidor = this.metodosglobales.SeleccionAmbiente();
  }

  consEmbajadorConjuntosReporte(Bandera: string, UsucodigEmbajador: string, CorreoEmbajador: string, TelefonoEmbajador: string, UsucodigVecino: string, CorreoVecino: string, TelefonoVecino: string) {
    return this.http.get<any>(this.url_servidor + 'consEmbajadorConjuntosReporte/' + Bandera + '/' + UsucodigEmbajador + '/' + CorreoEmbajador + '/' + TelefonoEmbajador + '/' + UsucodigVecino + '/' + CorreoVecino + '/' + TelefonoVecino)
  }

}
