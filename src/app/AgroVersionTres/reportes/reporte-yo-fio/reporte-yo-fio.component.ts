import * as fs from 'file-saver';
import { Workbook } from 'exceljs'
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../core/servicios.service';


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
  //TODO PONER FILTRO INICIAR EL NOMBRE DEL LAS VARIABLES
  FechaInicioYoFio: string = '';
  FechaFinYoFio: string = '';
  IdUsuarioYoFio: string = '';
  CorreoYoFio: string = '';
  telefonoYoFio: string = '';
  FiltroEstadoPago: string = '0';
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

    if (this.FechaInicioYoFio != '' && this.FechaInicioYoFio != undefined && this.FechaInicioYoFio != null) {
      AxuFechaInicio = this.FechaInicioYoFio
    }
    if (this.FechaFinYoFio != '' && this.FechaFinYoFio != undefined && this.FechaFinYoFio != null) {
      AuxFechaFin = this.FechaFinYoFio
    }
    if (this.IdUsuarioYoFio != '' && this.IdUsuarioYoFio != undefined && this.IdUsuarioYoFio != null) {
      AxuIdUsuario = this.IdUsuarioYoFio
    }
    if (this.CorreoYoFio != '' && this.CorreoYoFio != undefined && this.CorreoYoFio != null) {
      AxuCorreo = this.CorreoYoFio
    }
    if (this.telefonoYoFio != '' && this.telefonoYoFio != undefined && this.telefonoYoFio != null) {
      AxuTelefono = this.telefonoYoFio
    }

    //TODO PASAR LAS VARIABLES AUXILIARES DONDE CORRESPONDAN
    const body = {
      FechaInicio: '0',
      FechaFin: '0'
    }
    this.ServiciosGenerales.consPagosFiado('0', '0', '0', '0', '0', body).subscribe(Rest => {
      this.ListaYoFio = Rest
      console.log(Rest)
    });
  }

  BtnLimpiar(): void {
    this.FechaInicioYoFio = '';
    this.FechaFinYoFio = '';
    this.IdUsuarioYoFio = '';
    this.CorreoYoFio = '';
    this.telefonoYoFio = '';
    this.localidad = '0';
  }

  BtnDEscargarExel(): void {
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

