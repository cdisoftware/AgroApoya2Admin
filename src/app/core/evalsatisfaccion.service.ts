import { HttpClient } from '@angular/common/http';
import { MetodosglobalesService } from './metodosglobales.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvalsatisfaccionService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaOfertas(Bandera: string, Usucodig: string, Cd_cnctvo: string, idsector: string){
    return this.http.get<any>(this.url_servidor+'conscnuevasofertas/' + Bandera + '/' + Usucodig + '/' + Cd_cnctvo + '/' + idsector)
  }

  ConsultaTipoPreguntas(bandera:string){
    return this.http.get<any>(this.url_servidor+'consctipopregunta/'+bandera)
  }

  ConsultaPreguntasOferta(bandera:string, bodyConsulta:any){
    return this.http.post<any>(this.url_servidor+'conscagropreguntofert/'+bandera, bodyConsulta)
  }

  ModificacionPregunta(bandera:string, Bodymodifica:any){
    return this.http.post<any>(this.url_servidor+'modagropreguntofert/'+bandera, Bodymodifica)
  }
  
  ModificaOrden(bandera:string, Bodypost:any){
    return this.http.post<any>(this.url_servidor+'modagropregunta/'+bandera, Bodypost)
  }
}
