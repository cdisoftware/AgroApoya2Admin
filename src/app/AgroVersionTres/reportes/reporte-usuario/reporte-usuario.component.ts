import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service'

@Component({
  selector: 'app-reporte-usuario',
  templateUrl: './reporte-usuario.component.html',
  styleUrls: ['./reporte-usuario.component.css']
})
export class ReporteUsuarioComponent implements OnInit {

  // VARIABLES DE FILTROS NUMCOP-LOCALI 
  NumeroFil: any =  []
  LocalidadesFiltro: any = []
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
      this.LocalidadesFiltro = Resultado;
    });
    this.ServiciosGenerales.consMultilistas('1', '0', '0').subscribe(rest => {
      this.NumeroFil = rest;
    });
  }
}