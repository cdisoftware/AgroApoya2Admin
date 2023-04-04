import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class PlantillacorreosService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaCorreoIndividual(bandera: string, IdPlantilla: string, usucodig: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'enviocorreoindividual/' + bandera + '/' + IdPlantilla + '/' + usucodig, Body)
  }

  ConsultaCorreosMasivos(bandera: string, IdPlantilla: string, IdTipoUsuario: string) {
    return this.http.get<any[]>(this.url_servidor + 'enviocorreomasivo/' + bandera + '/' + IdPlantilla + '/' + IdTipoUsuario)
  }

  ConsultaTipoPlatilla(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consctipoplantilla/' + Bandera)
  }

  ConsultaCorreoMomentoEnvio(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscorreomomentoenvio/' + Bandera)
  }

  ConsultaPlatillaCorreo(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'consaplantillacorreo/' + Bandera, Body)
  }

  ModPlantillaCorreo(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'modcaplantillacorreo/' + Bandera, Body)
  }

  ConsultaTipoCamposCorreo(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscatipocamposcorreo/' + Bandera)
  }

  public postImgPlantillaCorreo(imagenParaSubir: File) {
    const formData = new FormData();
    formData.append('file', imagenParaSubir, imagenParaSubir.name);
    return this.http.post(this.url_servidor + 'uploadImgPlantillaCorreo', formData);
  }

  public postAdjuntoPlantillaCorreo(adjuntoParaSubir: File) {
    const formData = new FormData();
    formData.append('file', adjuntoParaSubir, adjuntoParaSubir.name);
    return this.http.post(this.url_servidor + 'uploadArchivos', formData);
  }

  ModDocumentoCorreo(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'modcdocumentocorreo/' + Bandera, Body)
  }

  ConsultaDocumentoCorreo(Bandera: string, IdPlantilla: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscdocumentocorreo/' + Bandera + '/' + IdPlantilla);
  }

  ConsGenQuery(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'ConsGenQuery/' + Bandera ,Body);
  }

  correoManualMod(Bandera: string, Body: any) {
    console.log(Body)
    return this.http.post<any>(this.url_servidor + 'correoManualMod/' + Bandera ,Body);
  }
   

  CorreosEnviadosConsulta(Bandera: string, IdEnvio: string,IdSector: string, Cd_cnctivo: string,IdPlantilla: string, IdEstado: string,fecha: string) {
    return this.http.get<any>(this.url_servidor + 'CcorreoManual/' + Bandera + '/' + IdEnvio+ '/' + IdSector+ '/' + Cd_cnctivo+ '/' + IdPlantilla+ '/' + IdEstado+ '/' + fecha);
  }

  constipoblicorreosmanual(Bandera: string, IdPlantilla: string) {
    return this.http.get<any>(this.url_servidor + 'constipoblicorreosmanual/' + Bandera + '/' + IdPlantilla);
  }

  modtipoblicorreomanual(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'modtipoblicorreomanual/' + Bandera, Body);
  }
  
}
