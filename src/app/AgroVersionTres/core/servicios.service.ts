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

}