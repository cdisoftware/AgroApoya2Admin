import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
    providedIn: 'root'
})
export class GrupoMillaServices {
    constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

    url_servidor = this.metodosglobales.SeleccionAmbiente();

    ConsultaGruposMilla(IdSector: string, CdCons: string) {
        return this.http.get<any>(this.url_servidor + 'conscGrupoMilla/1/' + IdSector + '/' + CdCons);
    }

    modgrupoMilla(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modcgrupomilla/' + bandera, body);
    }
    modpinmilla(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modcpinmilla/' + bandera, body);
    }
    ModificaOrdenEntregas(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modCOrdenUltimaMilla/' + bandera, body);
    }
    ModificaFechaEntrega(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'ModCFechaTrans/' + bandera, body);
    }
}