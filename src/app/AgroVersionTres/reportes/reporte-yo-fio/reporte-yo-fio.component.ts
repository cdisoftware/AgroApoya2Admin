import * as fs from 'file-saver';
import { Workbook } from 'exceljs'
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../core/servicios.service';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-reporte-yo-fio',
  templateUrl: './reporte-yo-fio.component.html',
  styleUrls: ['./reporte-yo-fio.component.css']
})
export class ReporteYoFioComponent implements OnInit {
  ListadoPagosFiados: any = [];
  ListaLocalidad: any = [];
  ListaYoFio: any = [];

  //variables filtros
  FiltroFechaInicioYoFio: string = '';
  FiltroFechaFinYoFio: string = '';
  FiltroIdUsuarioYoFio: string = '';
  FiltroCorreoYoFio: string = '';
  FiltrotelefonoYoFio: string = '';
  FiltroListaEstadoPago: string = '0';
  localidad: string = '0';


  constructor(public ServiciosGenerales: ServiciosService) {
  }

  ngOnInit(): void {
    this.CargasIniciales();
  }
  CargasIniciales(): void {
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(rest => {
      this.ListaLocalidad = rest;
    });

    this.ServiciosGenerales.consEstadosPagosFiado('1').subscribe(rest => {
      this.ListadoPagosFiados = rest
    });
  }

  BtnBuscar() {
    var AxuFechaInicio: string = '0';
    var AuxFechaFin: string = '0';
    var AxuIdUsuario: string = '0';
    var AxuCorreo: string = '0';
    var AxuTelefono: string = '0';
    var AuxListaPagos: string = '0';
    var AuxLocalida: string = '0';

    if(this.FiltroFechaInicioYoFio != '' && this.FiltroFechaInicioYoFio != undefined && this.FiltroFechaInicioYoFio != null){
      AxuFechaInicio = this.FiltroFechaInicioYoFio 
    }
    if(this.FiltroFechaFinYoFio != '' && this.FiltroFechaFinYoFio != undefined && this.FiltroFechaFinYoFio != null){
      AuxFechaFin = this.FiltroFechaFinYoFio 
    }
    if(this.FiltroIdUsuarioYoFio != '' && this.FiltroIdUsuarioYoFio != undefined && this.FiltroIdUsuarioYoFio != null){
      AxuIdUsuario = this.FiltroIdUsuarioYoFio 
    }
    if(this.FiltroCorreoYoFio != '' && this.FiltroCorreoYoFio != undefined && this.FiltroCorreoYoFio != null){
      AxuCorreo = this.FiltroCorreoYoFio 
    }
    if (this.FiltrotelefonoYoFio != '' && this.FiltrotelefonoYoFio != undefined && this.FiltrotelefonoYoFio != null) {
      AxuTelefono = this.FiltrotelefonoYoFio
    }
    if (this.FiltroListaEstadoPago != '' && this.FiltroListaEstadoPago != undefined && this.FiltroListaEstadoPago != null) {
      AuxListaPagos = this.FiltroListaEstadoPago
    }
    if (this.localidad != '' && this.localidad != undefined && this.localidad != null) {
      AuxLocalida = this.localidad
    }

    //TODO PASAR LAS VARIABLES AUXILIARES DONDE CORRESPONDAN
    const body = {
      FechaInicio: AxuFechaInicio,
      FechaFin: AuxFechaFin
    }
    this.ServiciosGenerales.consPagosFiado(AxuIdUsuario, AxuCorreo, AxuTelefono, AuxListaPagos, AxuIdUsuario, body).subscribe(Rest => {
      this.ListadoPagosFiados = Rest
      console.log(Rest)
    });
  }
  BtnLimpiar(): void{
    this.FiltroFechaInicioYoFio = '';
    this.FiltroFechaFinYoFio = '';
    this.FiltroIdUsuarioYoFio = '';
    this.FiltroCorreoYoFio = '';
    this.FiltrotelefonoYoFio = '';
    this.FiltroListaEstadoPago= '';
    this.localidad = '0';
   }


  BtnDEscargarExel(): void{
     //Crear nuevo archiv
        let workbook = new Workbook();
    
        // crear una nueva hoja dentro del excel
        let worksheet = workbook.addWorksheet("Reporte YoFio"); //Nombre de la hoja
        let header = ['IdUsuarioEmbajador', 'Nombre', 'Correo', 'FechaCreacion', 'Celular', 'id_manychat', 'DRCCION',
          'CMPLMNTO_DRRCCION', 'id']; //Encabezado y se dejan las columnas que corresponden 
    
    
        worksheet.addRow(header); //le da los estilos a  header de la tabla
        ['A1', 'B1', 'C1', 'D1', 'E1', 'G1', 'F1', 'H1', 'I1'].map(key => {
          worksheet.getCell(key).fill = {
            type: 'pattern',
            pattern: 'darkTrellis',
            fgColor: { argb: '397c97' },
            bgColor: { argb: '397c97' }
          };
          worksheet.getCell(key).font = {
            color: { argb: 'FFFFFF' }
          };
        });
    
        worksheet.columns = [ // le dan el tamaño a las columnas
          { width: 25 }, { width: 30 }, { width: 30 }, { width: 20 }, { width: 20 },
          { width: 20 }, { width: 25 }, { width: 30 }, { width: 30 }, { width: 20 },
          { width: 15 }, { width: 25 }
        ];
  }
}

