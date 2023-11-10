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
    ConsultaTransportes(CdCons: string, IdSector: string) {
        return this.http.get<any>(this.url_servidor + 'consCTransporte/1/' + CdCons + '/' + IdSector);
    }
    ModificaFechaEntrega(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'ModCFechaTrans/' + bandera, body);
    }


    //Servicios nueva etapa
    CreaTransporteEntrega(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modAdminMillaTransporte/' + bandera, body);
    }
    ConsultaTransporte(CdCons: string, IdSector: string) {
        return this.http.get<any>(this.url_servidor + 'consAdMillaDtallOfertaCompra/' + CdCons + '/' + IdSector);
    }
    ConsultaTransportesCreados(bandera: string, IdGrupo: string) {
        return this.http.get<any>(this.url_servidor + 'consAdminMillaTransportes/' + bandera + '/' + IdGrupo);
    }

    ConsultaEntregasDisponibles(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'consAdmillaEntregDisponible/' + bandera, body);
    }


    //ServiciosPolygono
    CreaPolygono(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modAdminMillaSectores/' + bandera, body);
    }
    InsertaCoordenada(bandera: string, body: any){
        return this.http.post<any>(this.url_servidor + 'mosAdminCoordsMilla/' + bandera, body);
    }
    //modAdMillaPoligono
    ModificaPoligoCordenada(bandera: string, body: any){
        return this.http.post<any>(this.url_servidor + 'modAdMillaPoligono/' + bandera, body);
    }

    //ConsultaPoligonos
    ConsultaPolygonosGrupoMilla(bandera: string, IdSector: string){
        return this.http.get<any>(this.url_servidor + 'consAdMillaComprasSector/' + bandera + '/' + IdSector);
    }
}