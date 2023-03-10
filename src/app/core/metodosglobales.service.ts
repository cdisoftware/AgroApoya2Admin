import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class MetodosglobalesService {
  key: any = "password12345678";
  IV = "password12345678=";
  constructor(
    private http: HttpClient,
    private Cookies: CookieService
  ) { }

  //ambiente de trabajo 1 desarrollo 2 produccion
  ambientedetrabajo: string = '2';

  public url_DesarrolloCDI = 'http://190.147.38.91:1007/Agroapoya2/';
  public url_ProduccionCDI = 'https://srv.apptotrip.com:1016/Agroapoya2/';

  public url_DesarolloImg = 'http://190.147.38.91:8089/ImagenesOfertas/';
  public url_ProduccionImg = 'https://api.apptotrip.com/ImagenesAgroapoya2/ImagenesOfertas/';

  SeleccionAmbiente() {
    if (this.ambientedetrabajo == '1') {
      return this.url_DesarrolloCDI;
    } else if (this.ambientedetrabajo == '2') {
      return this.url_ProduccionCDI;
    } else {
      return "Valida ambiente seleccionado";
    }
  }

  RecuperaRutaImagenes() {
    if (this.ambientedetrabajo == '1') {
      return this.url_DesarolloImg;
    } else if (this.ambientedetrabajo == '2') {
      return this.url_ProduccionImg;
    } else {
      return "Valida ambiente seleccionado";
    }
  }

  RecuperarRutasOtrasImagenes(tipoimagen: string) {
    console.log()
    if(this.ambientedetrabajo == '1'){
      var ruta = 'http://190.147.38.91:8089/';
    }else{
      var ruta = 'https://api.apptotrip.com/ImagenesAgroapoya2/';
    }

    if (tipoimagen == '1') {
      return ruta + 'ImagenesEvidencia/'
    } else if (tipoimagen == '2') {
      return ruta + 'ImagenesConductores/'
    } else if (tipoimagen == '3') {
      return ruta + 'ImagenesPlantillaCorreo/'
    } else if (tipoimagen == '4') {
      return ruta + 'ImagenesToppings/'
    } else if (tipoimagen == '5') {
      return ruta + 'ImagenesPublicidad/'
    } else {
      return 'no se encontro la imagen'
    }

  }

  RecuperarRutaVista(idvista: string) {
    if(this.ambientedetrabajo == '1'){
      var ruta = 'http://190.147.38.91:8881/#/';
    }else{
      var ruta = 'https://api.apptotrip.com/AA2/#/';
    }
    
    if (idvista == '1') {
      return ruta + 'Landing/'
    }else{
      return 'no se encontro la ruta'
    }
  }

  CrearCookie(Llave: string, Valor: string) {
    this.Cookies.set(Llave, Valor)
  }

}
