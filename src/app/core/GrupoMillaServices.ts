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
    CreaTransporteEntrega(bandera: string, IdBodega: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modAdminMillaTransporte/' + bandera + '/' + IdBodega, body);
    }
    ConsultaTransporte(CdCons: string, IdSector: string) {
        alert(this.url_servidor + 'consAdMillaDtallOfertaCompra/' + CdCons + '/' + IdSector)
        return this.http.get<any>(this.url_servidor + 'consAdMillaDtallOfertaCompra/' + CdCons + '/' + IdSector);
    }

    ConsultaTransportesCreados(bandera: string, IdGrupo: string) {
        return this.http.get<any>(this.url_servidor + 'consAdminMillaTransportes/' + bandera + '/' + IdGrupo);
    }

    ConsultaEntregasDisponibles(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'consAdmillaEntregDisponible/' + bandera, body);
    }
    ConsultaConductores(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consclistaconductor/' + Bandera + '/' + '0' + '/' + '0')
    }
    ModificaConductor(Bandera: string, Datos: any) {
        return this.http.post<any>(this.url_servidor + 'modctorultmilla/' + Bandera, Datos)
    }


    //ServiciosPolygono
    CreaPolygono(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modAdminMillaSectores/' + bandera, body);
    }
    InsertaCoordenada(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'mosAdminCoordsMilla/' + bandera, body);
    }
    //modAdMillaPoligono
    ModificaPoligoCordenada(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modAdMillaPoligono/' + bandera, body);
    }

    //ConsultaPoligonos
    ConsultaPolygonosGrupoMilla(bandera: string, IdSector: string) {
        return this.http.get<any>(this.url_servidor + 'consAdMillaComprasSector/' + bandera + '/' + IdSector);
    }
    consAdUserMapCalor(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consAdUserMapCalor/' + Bandera);
    }
    ConsSectoresMilla(bandera: string, IdSector: string) {
        return this.http.get<any>(this.url_servidor + 'consAdMillaSectores/' + bandera + '/' + IdSector);
    }
    ConsCoordenadasSectorMilla(bandera: string, IdSector: string) {
        return this.http.get<any>(this.url_servidor + 'consAdMillaCoordSector/' + bandera + '/' + IdSector);
    }
    ValidaEntregasSector(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'ValidaSectorAdmin/' + bandera, body);
    }
    AgregaCompras(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modAdMillaGruposFoco/' + bandera, body);
    }


    //UtimaMilla
    ConsEntregasTransporte(bandera: string, IdGrupo: string) {
        console.log(this.url_servidor + 'consAdMillaGrupos/' + bandera + '/' + IdGrupo)
        return this.http.get<any>(this.url_servidor + 'consAdMillaGrupos/' + bandera + '/' + IdGrupo);
    }
    OrdenEntregas(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'AdmillaOrdenComprasGrupo/' + bandera, body);
    }
    ModEntrega(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modAdmillaPin/' + bandera, body);
    }
}