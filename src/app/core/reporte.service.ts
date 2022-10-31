import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaUsuario(Bandera: string){
    return this.http.get<any>(this.url_servidor + 'consctipousuario/' + Bandera)
  }
  ReporteUsuarios(Bandera: string, Datos: any ){
    return this.http.post<any>(this.url_servidor + 'conscreporteusuarios/' + Bandera, Datos)
  }
  ConsultaTipoCliente(Bandera: string, usuCodigo: string){
    return this.http.get<any>(this.url_servidor + 'consctipocliente/' + Bandera + '/' + usuCodigo)
  }
  ConsultaTipoConductor(Bandera: string, usuCodigo: string){
    return this.http.get<any>(this.url_servidor + 'consctipoconductor/' + Bandera + '/' + usuCodigo)
  }
  ConsultaTipoTranspor(Bandera: string, usuCodigo: string){
    return this.http.get<any>(this.url_servidor + 'consctipotransport/' + Bandera + '/' + usuCodigo)
  }

}
