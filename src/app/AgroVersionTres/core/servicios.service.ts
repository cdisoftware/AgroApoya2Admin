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

    //Subir imagenes al servidor para sectores o localidades
    uploadImgSector(imagenParaSubir: File) {
        const formData = new FormData();
        formData.append('file', imagenParaSubir, imagenParaSubir.name);
        return this.http.post(this.url_servidor + 'uploadImgSector', formData);
    }

    postImgToppings(imagenParaSubir: File) {
        const formData = new FormData();
        formData.append('file', imagenParaSubir, imagenParaSubir.name);
        return this.http.post(this.url_servidor + 'uploadImgToppings', formData);
    }

    RecuperarRutasOtrasImagenes(tipoimagen: string): string {
        const rutaBase = 'https://api.apptotrip.com/ImagenesAgroapoya2/';
        switch (tipoimagen) {
            case '1':
                return rutaBase + 'ImagenesEvidencia/';
            case '2':
                return rutaBase + 'ImagenesConductores/';
            case '3':
                return rutaBase + 'ImagenesPlantillaCorreo/';
            case '4':
                return rutaBase + 'ImagenesToppings/';
            case '5':
                return rutaBase + 'ImagenesPublicidad/';
            case '6':
                return rutaBase + 'ImagenesUsuarios/';
            case '7':
                return rutaBase + 'ImagenesSectores/';
            default:
                return 'no se encontro la imagen';
        }
    }

    // CREACION DE LA OFERTA
    consTipoOferta(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consTipoOferta/' + Bandera);
    }

    consZTipoDomicilio(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consZTipoDomicilio/' + Bandera);
    }

    conszOfertaActivaProductosCo(Bandera: string, IdOferta: string) {
        return this.http.get<any>(this.url_servidor + 'conszOfertaActivaProductosCo/' + Bandera + '/' + IdOferta);
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

    consOfertaRegalos(Bandera: string, IdOferta: string) {
        return this.http.get<any>(this.url_servidor + 'consOfertaRegalos/' + Bandera + '/' + IdOferta);
    }

    consProductosActivosOferta(Bandera: string, IdOferta: string) {
        return this.http.get<any>(this.url_servidor + 'consProductosActivosOferta/' + Bandera + '/' + IdOferta);
    }

    consOfertaActivaZonas(Bandera: string, IdOferta: string) {
        return this.http.get<any>(this.url_servidor + 'consOfertaActivaZonas/' + Bandera + '/' + IdOferta);
    }

    modProductosActivosOferta(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modProductosActivosOferta/' + Bandera, body);
    }

    consRelacionProductoPresentacion(Bandera: string, IdProducto: string) {
        return this.http.get<any>(this.url_servidor + 'consRelacionProductoPresentacion/' + Bandera + '/' + IdProducto);
    }

    consOfertaActivaProductosDetalles(Bandera: string, IdProducto: string, IdOferta: string) {
        return this.http.get<any>(this.url_servidor + 'consOfertaActivaProductosDetalles/' + Bandera + '/' + IdProducto + '/' + IdOferta);
    }

    modOfertaActivaProductosDetalles(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modOfertaActivaProductosDetalles/' + Bandera, body);
    }

    consTipoRegaloReglaje(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consTipoRegaloReglaje/' + Bandera);
    }

    modOfertaActivaInfoAdicional(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modOfertaActivaInfoAdicional/' + Bandera, body);
    }

    consOfertaActivaInfoAdicional(Bandera: string, IdOferta: string) {
        return this.http.get<any>(this.url_servidor + 'consOfertaActivaInfoAdicional/' + Bandera + '/' + IdOferta);
    }

    consTipoVentaProducto(Bandera: string) {
        return this.http.get<any>(this.url_servidor + 'consTipoVentaProducto/' + Bandera);
    }

    modTipoProducto(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modTipoProducto/' + Bandera, body);
    }

    consTipoImagenOferta(Bandera: string, IdProducto: any) {
        return this.http.get<any>(this.url_servidor + 'consTipoImagenOferta/' + Bandera + '/' + IdProducto);
    }

    modTipoImagenOferta(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modTipoImagenOferta/' + Bandera, body);
    }

    consTipoPresentacion(Bandera: string, Parametro: string) {
        return this.http.get<any>(this.url_servidor + 'consTipoPresentacion/' + Bandera + '/' + Parametro);
    }

    modTipoPresentacion(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modTipoPresentacion/' + Bandera, body);
    }

    modRelacionProductoPresentacion(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modRelacionProductoPresentacion/' + Bandera, body);
    }

    modEstadoOferta(Bandera: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'modEstadoOferta/' + Bandera, body);
    }

    consCuponesDescuento(Bandera: string, IdTipoCupon: string, IdOferta: string) {
        return this.http.get<any>(this.url_servidor + 'consCuponesDescuento/' + Bandera + '/' + IdTipoCupon + '/' + IdOferta);
    }

    consMultilistas(Bandera: string, filtrouno: string, filtrodos: string) {
        return this.http.get<any>(this.url_servidor + 'consMultilistas/' + Bandera + '/' + filtrouno + '/' + filtrodos);
    }

    consMapaCalor(Bandera: string, IdLocalidad: string, NumCompras: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'consMapaCalor/' + Bandera + '/' + IdLocalidad + '/' + NumCompras, body);
    }

    consEmbajadorConjuntosReporte (Bandera: string, UsucodigEmbajador: string, CorreoEmbajador: string, TelefonoEmbajador: string,
        UsucodigVecino: string, CorreoVecino: string, TelefonoVecino: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'consEmbajadorConjuntosReporte/' + Bandera + '/' + UsucodigEmbajador + '/' + CorreoEmbajador + '/' + TelefonoEmbajador + '/'+
        UsucodigVecino + '/' + CorreoVecino + '/' + TelefonoVecino, body);
    }
    
    consEmbajadorVecinosReporte(Bandera: string, UsucodigEmbajador: string) {
        return this.http.get<any>(this.url_servidor + 'consEmbajadorVecinosReporte/' + Bandera + '/' + UsucodigEmbajador);
    }
    consEstadosPagosFiado(Bandera: string ) {
        return this.http.get<any>(this.url_servidor + 'consEstadosPagosFiado/' + Bandera);
    }
    consPagosFiado( CodigoUsuario: string,   Correo: string,   Telefono: string,   IDEstadoPago: string,   IdLocalidad: string, body: any) {
        return this.http.post<any>(this.url_servidor + 'consPagosFiado/'+ CodigoUsuario +'/' + Correo  +'/' + Telefono +'/' +IDEstadoPago +'/' +IdLocalidad, body);
    }
}



/*
    COMO CONSUMIR LOS MICRO SERVICIOS EN POST

    1. Nombre del metodo, con sus parametros de entrada, estos parametros los puedo mirara
    en la malla dispuesta en el drive, y el nombre del metodo debe ser el mismo que el nombre 
    del microservicio.

    2. En los parametros de entrada del metodo, adiciono un parametro tipo ANY que va a hacer el cuerpo
    de la solicitud del microservisio

    3. Siguiendo la estrutura armo la url y le envio el cuerpo
      return this.http.post<any>(this.url_servidor + 'consMapaCalor/' + Bandera + '/' + IdLocalidad + '/' + NumCompras, body);


*/