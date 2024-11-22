import { Component, OnInit } from '@angular/core';
import {ServiciosService} from 'src/app/AgroVersionTres/core/servicios.service'
@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteUsuarioComponent implements OnInit {

  // VARIABLES DE FILTROS NUMCOP-LOCALI 
  ComprasFil: any =  []
  LocaliFiltro: any = []
  // FechaIncioCompra: string = '';
  // FechaFinCompra: string = '';
  // FechaRegistro: string = '';
  // Localidad: string = '';
  // NumeroCompras: string = '';
  // CódigoUsuario: string = '';
  // FiltroCorreo: string = '';
  // FiltroTelefo: string = '';
  // NomApellidoFiltro: string = '';

  constructor(public ServiciosGenerales: ServiciosService) {}


  ngOnInit(): void {
    this.CargasIniciales();
  }
  CargasIniciales(): void { 
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(Resultado => {
      this.LocaliFiltro = Resultado;
    });
    this.ServiciosGenerales.consMultilistas('1', '0', '0').subscribe(rest => {
      this.ComprasFil = rest;
    });
  }
}
