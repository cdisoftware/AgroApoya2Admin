import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class PublicidadService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();


  ConsultaVistasPublic(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'constvistaspublic/' + Bandera)
  }

  ConsultaAccionPubli(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'constaccionpubli/' + Bandera)
  }

  ModCModulo(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'modcmodulo/' + Bandera, Body)
  }

  ModCPubli(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'modcpubli/' + Bandera, Body)
  }

  ModCPublicidad(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'modcpublicidad/' + Bandera, Body)
  }

  ConsultaCPublicidad(Bandera: string, Id: string, IdVista: string, Usucodig: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscpublicidad/' + Bandera + '/' + Id + '/' + IdVista + '/' + Usucodig)

  }

  public postImgPublicidad(imagenParaSubir: File) {
    const formData = new FormData();
    formData.append('file', imagenParaSubir, imagenParaSubir.name);
    return this.http.post(this.url_servidor + 'uploadImgPublicidad', formData);
  }

}
