import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})

export class MetodosglobalesService {
    key: any = "password12345678";
    IV = "password12345678=";

    constructor(
        private Cookies: CookieService
    ) { }

    //Ambiente de trabajo 1 desarrollo 2 produccion
    ambientedetrabajo: string = '2';

    public url_DesarrolloCDI = 'http://190.147.38.91:1007/Agroapoya2/';
    public url_ProduccionCDI = 'https://srv.apptotrip.com:1016/Agroapoya2/';

    public url_DesarrolloImagen = 'http://190.147.38.91:1007/Agroapoya2/';
    public url_ProduccionImagen = 'https://srv.apptotrip.com:1016/Agroapoya2/';

    SeleccionRutaAmbiente() {
        if (this.ambientedetrabajo == '1') {
            var ruta = 'http://190.147.38.91:8881/#/';
        } else {
            var ruta = 'https://apoya2.co/#/';
        }
        return ruta;
    }

    SeleccionAmbiente() {
        if (this.ambientedetrabajo == '1') {
            return this.url_DesarrolloCDI;
        } else if (this.ambientedetrabajo == '2') {
            return this.url_ProduccionCDI;
        } else {
            return "Valida ambiente seleccionado";
        }
    }

    SeleccionAmbienteImagen() {
        if (this.ambientedetrabajo == '1') {
            return this.url_DesarrolloImagen;
        } else if (this.ambientedetrabajo == '2') {
            return this.url_ProduccionImagen;
        } else {
            return "Valida ambiente seleccionado";
        }
    }

    RecuperarRutasOtrasImagenes(tipoimagen: string) {
        if (tipoimagen == '1') {
            return this.SeleccionAmbienteImagen() + 'ImagenesEvidencia/'
        } else if (tipoimagen == '2') {
            return this.SeleccionAmbienteImagen() + 'ImagenesConductores/'
        } else if (tipoimagen == '3') {
            return this.SeleccionAmbienteImagen() + 'ImagenesPlantillaCorreo/'
        } else if (tipoimagen == '4') {
            return this.SeleccionAmbienteImagen() + 'ImagenesToppings/'
        } else if (tipoimagen == '5') {
            return this.SeleccionAmbienteImagen() + 'ImagenesPublicidad/'
        } else if (tipoimagen == '6') {
            return this.SeleccionAmbienteImagen() + 'ImagenesUsuarios/'
        } else if (tipoimagen == '7') {
            return this.SeleccionAmbienteImagen() + 'ImagenesOfertas/'
        } else {
            return 'no se encontro la imagen'
        }
    }

    CrearCookie(Llave: string, Valor: string) {
        this.Cookies.set(Llave, Valor)
    }

    encryptUsingTripleDES(res: string): string {
        const data = res;
        const keyHex = CryptoJS.enc.Utf8.parse(this.key);
        const iv = CryptoJS.enc.Utf8.parse(this.IV);
        const mode = CryptoJS.mode.CBC;
        const encrypted = CryptoJS.TripleDES.encrypt(data, keyHex, { iv, mode });
        return encrypted.toString();
    }
    
}