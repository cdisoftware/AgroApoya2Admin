import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class ValorarofertaService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaProductos(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consproductos/' + Bandera)
  }

  ConsultaEstado(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consestadosofertas/' + Bandera)
  }

  ConsultaProductor(Bandera: string, tipopersona: string, datos: any) {
    return this.http.post<any[]>(this.url_servidor + 'conscpersons/' + Bandera + '/' + tipopersona, datos)
  }

  ConsultaOferta(Bandera: string, idOferta: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscoferta/' + Bandera + '/' + idOferta)
  }

  CerrarOferta(bandera: string, datos: any) {
    return this.http.post<any[]>(this.url_servidor + 'aestadofertamod/' + bandera, datos)
  }

  EditaOferta(Bandera: string, datos: any) {
    return this.http.post<any[]>(this.url_servidor + 'conscpersons/' + Bandera, datos)
  }

  BusquedaOferta(bandera: string, cnctivoOferta: string, IdProducto: string, IdProductor: string, datos: any) {
    return this.http.post<any[]>(this.url_servidor + 'consaofertas/' + bandera + '/' + cnctivoOferta + '/' + IdProducto + '/' + IdProductor, datos)
  }

  ConsultaJornada(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consjorndofertas/' + Bandera)
  }

  EditarOfertaBusqueda(Bandera: string, idempaque: string, datos: any) {
    return this.http.post<any[]>(this.url_servidor + 'cofertamod/' + Bandera + '/' + idempaque, datos)
  }

}
