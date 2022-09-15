import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class CrearofertaService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaProductos(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consproductos/' + Bandera)
  }

  ConsultaEmpaque(IdProducto: string) {
    return this.http.get<any[]>(this.url_servidor + 'conslistempaque/' + IdProducto)
  }

  ConsultaCondicion(IdProducto: string) {
    return this.http.get<any[]>(this.url_servidor + 'conslistcondicion/' + IdProducto)
  }

  ConsultaTamano(IdProducto: string) {
    return this.http.get<any[]>(this.url_servidor + 'conslistamano/' + IdProducto)
  }

  ConsultaDepartamento(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consciudadesactivs/' + Bandera)
  }

  ConsultaCiudad(CodRegion: string) {
    return this.http.get<any[]>(this.url_servidor + 'consultmncpio/' + CodRegion)
  }

  CrearOferta(bandera: string, IdEmpaque: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'cofertamod/' + bandera + '/' + IdEmpaque, Body)
  }

  public postFileImagen(imagenParaSubir: File) {
    const formData = new FormData();
    formData.append('file', imagenParaSubir, imagenParaSubir.name);
    return this.http.post(this.url_servidor + 'uploadFile', formData);
  }
}
