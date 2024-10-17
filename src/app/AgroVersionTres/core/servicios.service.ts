import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
    providedIn: 'root'
})

export class ServiciosService {

    constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

    url_servidor = this.metodosglobales.SeleccionAmbiente();

    EjemploGet(IdSector: string, CdCons: string) {
        return this.http.get<any>(this.url_servidor + 'EjemploGet/' + IdSector + '/' + CdCons);
    }

    EjemploPost(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'EjemploPost/' + bandera, body);
    }

    //subir imagenen del sector al servidor
    public uploadFile(imagenParaSubir: File) {
        const formData = new FormData();
        formData.append('file', imagenParaSubir, imagenParaSubir.name);
        return this.http.post(this.url_servidor + 'uploadFile', formData);
    }

    //Subir imagenes al servidor para sectores o localidades
    public uploadImgSector(imagenParaSubir: File) {
        const formData = new FormData();
        formData.append('file', imagenParaSubir, imagenParaSubir.name);
        return this.http.post(this.url_servidor + 'uploadImgSector', formData);
    }


    // CREACION DE LA OFERTA

    consTipoOferta(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consTipoOferta/' + Bandera);
    }

    consZTipoDomicilio(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consZTipoDomicilio/' + Bandera);
    }

    conszOfertaActivaProductosCo(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'conszOfertaActivaProductosCo/' + Bandera);
    }

    modOfertaActivaInfo(bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modOfertaActivaInfo/' + bandera, body);
    }

    conszImgAsociadosSectorOferta(Bandera: string, IdOferta: string) {
        return this.http.get<any>(this.url_servidor + 'conszImgAsociadosSectorOferta/' + Bandera + '/' + IdOferta);
    }

    modImgAsociadasSectorOfertas(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modImgAsociadasSectorOfertas/' + Bandera, body);
    }

    consTipoLocalidad(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consTipoLocalidad/' + Bandera);
    }

    consRelacionLocalidadZona(Bandera: string, IdLocalidad: string) {
        return this.http.get<any>(this.url_servidor + 'consRelacionLocalidadZona/' + Bandera + '/' + IdLocalidad);
    }

    modZonaOferta(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modZonaOferta/' + Bandera, body);
    }

    consTipoRegalo(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consTipoRegalo/' + Bandera);
    }

    consPersonasAplicaRegalo(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consPersonasAplicaRegalo/' + Bandera);
    }

    modOfertaRegalos(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modOfertaRegalos/' + Bandera, body);
    }
}

