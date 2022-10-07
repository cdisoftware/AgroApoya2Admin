import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class MetodosglobalesService {

  constructor(
    private http: HttpClient,
    private Cookies: CookieService
  ) { }

  //ambiente de trabajo 1 desarrollo 2 produccion
  ambientedetrabajo: string = '1';

  public url_DesarrolloCDI = 'http://190.147.38.91:1007/Agroapoya2/';
  public url_ProduccionCDI = 'http://190.147.38.91:1007/Agroapoya2/';
  
  public url_DesarolloImg = 'http://190.147.38.91:8089/ImagenesOfertas/';
  public url_ProduccionImg = 'http://190.147.38.91:8089/ImagenesOfertas/';

  SeleccionAmbiente() {
    if (this.ambientedetrabajo == '1') {
      return this.url_DesarrolloCDI;      
    } else if (this.ambientedetrabajo == '2') {
      return this.url_ProduccionCDI;
    }
    else{
      return "Valida ambiente seleccionado";
    }    
  }

  RecuperaRutaImagenes() {
    if (this.ambientedetrabajo == '1') {
      return this.url_DesarolloImg;      
    } else if (this.ambientedetrabajo == '2') {
      return this.url_ProduccionImg;
    }
    else{
      return "Valida ambiente seleccionado";
    }    
  }

  RecuperarRutasOtrasImagenes(tipoimagen: string){
    var ruta = 'http://190.147.38.91:8089/';
    if(tipoimagen == '1'){
      return ruta + 'ImagenesEvidencia/'
    }else if(tipoimagen == '2'){
      return ruta + 'ImagenesConductores/'
    }else if(tipoimagen == '3'){
      return ruta + 'ImagenesPlantillaCorreo/'
    }else{
      return 'no se encontro la imagen'
    }

  }

  CrearCookie(Llave: string, Valor: string) {
    this.Cookies.set(Llave, Valor)
  }
}
