import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
    providedIn: 'root'
})
export class OperacionesDinamicas {
    constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

    url_servidor = this.metodosglobales.SeleccionAmbiente();

    consLoginCliente(Bandera: string, cuerpoService: any) {
        return this.http.post<any>(this.url_servidor + 'conslogincliente/' + Bandera, cuerpoService)
    }
    conscvalidanumero(Bandera: string, NumTelefono: string) {
        return this.http.get<any>(this.url_servidor + 'conscvalidanumero/' + Bandera + '/' + NumTelefono)
    }
}