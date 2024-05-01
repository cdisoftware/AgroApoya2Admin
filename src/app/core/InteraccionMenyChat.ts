import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MetodosglobalesService } from './metodosglobales.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InteraccionMenyChat {

    private header = new HttpHeaders({
        "Content-Type": "Application/json"
      });

    constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

    url_servidor = this.metodosglobales.SeleccionAmbiente();

    infoUserManyChat(Body: any) {
        return this.http.post<any>(this.url_servidor + 'ConsultaUsucodigManychat', Body)
    }
    modmanychatcreateuser(Body: any) {
        return this.http.post<any>(this.url_servidor + 'modmanychatcreateuser', Body)
    }
    ActualizaIdManyChat(Bandera: string, Body: any) {
        return this.http.post<any>(this.url_servidor + 'ActualizaIdManyChat/' + Bandera, Body)
    }
    AsignarUsucodigUserManyChat(Body: any) {
        return this.http.post<any>(this.url_servidor + 'AsignarUsucodigUserManyChat', Body)
    }
    modLogsRegManychat(Bandera: string, Body: any) {
        return this.http.post<any>(this.url_servidor + 'modLogsRegManychat/' + Bandera, Body)
    }
    AsignaCampoManyChat(Body: any) {
        return this.http.post<any>(this.url_servidor + 'AsignarCampoUserManyChat', Body)
    }
    BuscaUserCorreoTelefono(Body: any) {
        return this.http.post<any>(this.url_servidor + 'buscarUserManychat', Body)
    }
    AsignaEtiquetaUser(Body: any) {
        return this.http.post<any>(this.url_servidor + 'AddTagUserManyChat', Body)
    }
    ConsultaSubscriberId(Body: any): Observable<any> {
        return this.http.post(this.url_servidor + 'ConsultaSubscriberId', Body, {
          headers: this.header
        })
      }
}