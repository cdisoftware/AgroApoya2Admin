import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { ReporteService } from 'src/app/core/reporte.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private ServicioReporte: ReporteService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  // VARIABLE SELECTOR DE DASHBOARD
  SlideBoton: boolean = false;
  MostrarUsuarios: boolean = false;
  MostrarVentas: boolean = false;
  MostrarProductos: boolean = false;

  // VARIABLES NUMERO DE USUARIO Y NUMERO DE USUARIOS POR LOCALIDAD
  NumeroUsuariosLocalidad: any = [];
  DatosUsuarios: any = [];
  CambioFormatoFechas: any = [];
  FechasRegistrosUsers: any = [];
  MesesRegistrosUsers: any = [];

  // VARIABLES COMPRAS POR LOCALIDAD
  CambioFormatoFechasCompras: any = [];
  DatosCompras: any = [];
  FechasCompras: any = [];
  PromCompras: number = 0;
  PromComprasLocalidad: any = [];

  // VARIABLES VENTAS
  NumeroTotalVentas: number = 0;
  VentasTotales: any = [];
  NumeroTotalVentasProd: number = 0;
  InfoVentasUno: any = []
  InfoVentasDos: any = []
  InfoVentasTres: any = []

  // VARIABLES PRODUCTOS
  VentasProdLocali: any = [];
  VentasProdFecha: any = [];
  VentasProdLocaliFecha: any = [];
  InfoProductosUno: any = [];
  InfoProductosDos: any = [];
  InfoProductosTres: any = [];

  // VARIABLES GRAFICO PROMEDIO COMPRAS POR LOCALIDAD
  MedidasBarrasProm: [number, number] = [1290, 350];
  ColoresBarrasProm: any = {
    domain: ['#ec7f44', '#397c97', '#67c04f', '#b1ec44', '#a84fc0', '#ecd444', '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#ec445d', '#978c39',
      '#f4a460', '#836c79', '#3cb371', '#3d4d56', '#bc8f8f', ' #aea04b', '#737686'],
  };
  DatosBarrasUsuariosProm: any = [];
  MostrarEjeXProm: boolean = true;
  MostrarEjeYProm: boolean = true;
  MostrarLeyendaProm: boolean = false;
  MostrarXLabelProm: boolean = true;
  MostrarYLabelProm: boolean = true;
  LabelXProm: string = 'Localidades';
  LabelYProm: string = 'Días';
  LeyendaTituloProm: string = 'Localidades';

  // VARIABLES GRAFICO USUARIOS CUATRO MESES
  MedidasBarras: [number, number] = [1290, 1000];
  ColoresBarras: any = {
    domain: ['#397c97', '#67c04f', '#ec445d', '#ecd444'],
  };
  DatosBarrasUsuarios: any = [];
  MostrarEjeX: boolean = true;
  MostrarEjeY: boolean = true;
  MostrarLeyenda: boolean = false;
  MostrarXLabel: boolean = true;
  MostrarYLabel: boolean = true;
  LabelX: string = 'Numero de Usuarios';
  LabelY: string = 'Localidades';
  LeyendaTitulo: string = 'Meses';

  // VARIABLES GRAFICO VENTAS POR LOCALIDAD
  MedidasBarrasVentLocali: [number, number] = [1290, 350];
  ColoresVentLocali: any = {
    domain: ['#ec7f44', '#397c97', '#67c04f', '#b1ec44', '#a84fc0', '#ecd444', '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#ec445d', '#978c39',
      '#f4a460', '#836c79', '#3cb371', '#3d4d56', '#bc8f8f', ' #aea04b', '#737686'],
  };
  NumeroComprasLocalidad: any = [];
  MostrarEjeXVentLocali: boolean = true;
  MostrarEjeVentLocali: boolean = true;
  MostrarLeyendaVentLocali: boolean = false;
  MostrarXLabelVentLocali: boolean = true;
  MostrarYLabelVentLocali: boolean = true;
  LabelXVentLocali: string = 'Localidades';
  LabelYVentLocali: string = 'Ventas';
  LeyendaTituloVentLocali: string = 'Localidades';

  // VARIABLES GRAFICO VENTAS POR LOCALIDAD
  MedidasBarrasVentMensual: [number, number] = [1290, 350];
  ColoresVentMensual: any = {
    domain: ['#737686', '#aea04b', '#bc8f8f', '#3d4d56', '#3cb371', '#836c79', '#f4a460', '#978c39']
  };
  NumeroVentasMensuales: any = [];
  MostrarEjeXVentMensual: boolean = true;
  MostrarEjeVentMensual: boolean = true;
  MostrarLeyendaVentMensual: boolean = false;
  MostrarXLabelVentMensual: boolean = true;
  MostrarYLabelVentMensual: boolean = true;
  LabelXVentMensual: string = 'Tiempo';
  LabelYVentMensual: string = 'Ventas';
  LeyendaTituloVentMensual: string = 'Localidades';

  // VARIABLES GRAFICO VENTAS SEIS MESES
  MedidasBarrasVentas: [number, number] = [1290, 1000];
  ColoresBarrasVentas: any = {
    domain: ['#397c97', '#67c04f', '#ec445d', '#ecd444', '#39978a', '#a84fc0'],
  };
  NumeroVentasTotales: any = [];
  MostrarEjeXVentas: boolean = true;
  MostrarEjeYVentas: boolean = true;
  MostrarLeyendaVentas: boolean = false;
  MostrarXLabelVentas: boolean = true;
  MostrarYLabelVentas: boolean = true;
  LabelXVentas: string = 'Numero de Ventas';
  LabelYVentas: string = 'Localidad';
  LeyendaTituloVentas: string = 'Tiempo';

  // VARIABLES GRAFICO VENTAS PRODUCTOS POR LOCALIDAD
  MedidasBarrasProdLocali: [number, number] = [5000, 1000];
  ColoresBarrasProdLocali: any = {
    domain: ['#ec7f44', '#397c97', '#67c04f', '#b1ec44', '#a84fc0', '#ecd444', '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#ec445d', '#978c39',
      '#f4a460', '#836c79', '#3cb371', '#3d4d56', '#bc8f8f', ' #aea04b', '#737686'],
  };
  NumeroVentasProdLocali: any = [];
  MostrarEjeXProdLocali: boolean = true;
  MostrarEjeYProdLocali: boolean = true;
  MostrarLeyendaProdLocali: boolean = false;
  MostrarXLabelProdLocali: boolean = true;
  MostrarYLabelProdLocali: boolean = true;
  LabelXProdLocali: string = 'Numero de Ventas';
  LabelYProdLocali: string = 'Localidad';
  LeyendaTituloProdLocali: string = 'Tiempo';

  // VARIABLES GRAFICO VENTAS PRODUCTOS POR FECHA
  MedidasBarrasProdFecha: [number, number] = [1290, 1000];
  ColoresBarrasProdFecha: any = {
    domain: ['#ec7f44', '#397c97', '#67c04f', '#b1ec44', '#a84fc0', '#ecd444', '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#ec445d', '#978c39',
      '#f4a460', '#836c79', '#3cb371', '#3d4d56', '#bc8f8f', ' #aea04b', '#737686'],
  };
  NumeroVentasProdFecha: any = [];
  MostrarEjeXProdFecha: boolean = true;
  MostrarEjeYProdFecha: boolean = true;
  MostrarLeyendaProdFecha: boolean = false;
  MostrarXLabelProdFecha: boolean = true;
  MostrarYLabelProdFecha: boolean = true;
  LabelXProdFecha: string = 'Numero de Ventas';
  LabelYProdFecha: string = 'Localidad';
  LeyendaTituloProdFecha: string = 'Tiempo';

  // VARIABLES GRAFICO VENTAS PRODUCTOS POR FECHA Y LOCALIDAD
  MedidasBarrasProdGene: [number, number] = [7000, 1000];
  ColoresBarrasProdGene: any = {
    domain: ['#ec7f44', '#397c97', '#67c04f', '#b1ec44', '#a84fc0', '#ecd444', '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#ec445d', '#978c39',
      '#f4a460', '#836c79', '#3cb371', '#3d4d56', '#bc8f8f', ' #aea04b', '#737686'],
  };
  NumeroVentasProdGene: any = [];
  MostrarEjeXProdGene: boolean = true;
  MostrarEjeYProdGene: boolean = true;
  MostrarLeyendaProdGene: boolean = false;
  MostrarXLabelProdGene: boolean = true;
  MostrarYLabelProdGene: boolean = true;
  LabelXProdGene: string = 'Numero de Ventas';
  LabelYProdGene: string = 'Localidad';
  LeyendaTituloProdGene: string = 'Tiempo';

  ngOnInit(): void {
    this.InfoUsuarios();
  }

  InfoUsuarios() {
    this.MostrarUsuarios = true;
    this.MostrarVentas = false;
    this.MostrarProductos = false;

    this.NumeroUsuariosLocalidad = [];
    this.DatosUsuarios = [];
    this.FechasRegistrosUsers = [];
    this.MesesRegistrosUsers = [];
    this.DatosCompras = [];
    this.FechasCompras = [];
    this.PromComprasLocalidad = [];

    this.document.querySelector('#OpcionUno')?.classList.remove('OpcionUnoAfter');
    this.document.querySelector('#OpcionDos')?.classList.remove('OpcionDosEstandarAfter');
    this.document.querySelector('#OpcionTres')?.classList.remove('OpcionTresEstandarAfter');

    let SplitUno: any = 0;
    let SplitDos: any = 0;
    let DiferenciasDias: number = 0;
    let AcumuladorDias: number = 0;
    let Contador: number = 0;
    let Marcador: number = 0;
    let UsuariosMesUno: number = 0;
    let UsuariosMesDos: number = 0;
    let UsuariosMesTres: number = 0;
    let UsuariosMesCuatro: number = 0;

    // SERVICIO USUARIOS
    this.ServicioReporte.InfoUsuariosDash('1').subscribe(ResultObservable => {
      // NUMERO DE USUARIOS TOTALES
      for (let i = 0; i < ResultObservable.length; i++) {
        if (this.NumeroUsuariosLocalidad.length > 0) {
          for (let j = 0; j < i; j++) {
            if (this.NumeroUsuariosLocalidad[j].IdSector == ResultObservable[i].IdSector) {
              this.NumeroUsuariosLocalidad[j].NumeroUsuarios = this.NumeroUsuariosLocalidad[j].NumeroUsuarios + 1;
              break;
            } else {
              Marcador = j + 1;
              if (Marcador == this.NumeroUsuariosLocalidad.length) {
                this.NumeroUsuariosLocalidad.push({ "IdSector": ResultObservable[i].IdSector, "Descripcion": ResultObservable[i].DSCRPCION_SCTOR, "NumeroUsuarios": 1 });
                break;
              }
            }
          }
        } else {
          this.NumeroUsuariosLocalidad.push({ "IdSector": ResultObservable[i].IdSector, "Descripcion": ResultObservable[i].DSCRPCION_SCTOR, "NumeroUsuarios": 1 });
        }
      }

      // CONVERSION DE FECHA TIPO STRING A DATE
      for (let i = 0; i < ResultObservable.length; i++) {
        SplitUno = ResultObservable[i].FECHA_CREACION.split('-');
        this.CambioFormatoFechas[i] = new Date(SplitUno[0], SplitUno[1] - 1, SplitUno[2]);
        this.DatosUsuarios.push({
          "IdSector": ResultObservable[i].IdSector, "Descripcion": ResultObservable[i].DSCRPCION_SCTOR,
          "Fecha": this.CambioFormatoFechas[i]
        });
      }

      // AGRUPACION DE FECHAS DE REGISTRO POR LOCALIDAD
      for (let i = 0; i < this.DatosUsuarios.length; i++) {
        if (this.FechasRegistrosUsers.length > 0) {
          for (let j = 0; j < i; j++) {
            if (this.FechasRegistrosUsers[j].IdSector == this.DatosUsuarios[i].IdSector) {
              this.FechasRegistrosUsers[j].Fecha.push(this.DatosUsuarios[i].Fecha);
              break;
            } else {
              Marcador = j + 1;
              if (Marcador == this.FechasRegistrosUsers.length) {
                this.FechasRegistrosUsers.push({
                  "IdSector": this.DatosUsuarios[i].IdSector, "Descripcion": this.DatosUsuarios[i].Descripcion,
                  "Fecha": [new Date(this.DatosUsuarios[i].Fecha)]
                });
                break;
              }
            }
          }
        } else {
          this.FechasRegistrosUsers.push({
            "IdSector": this.DatosUsuarios[i].IdSector, "Descripcion": this.DatosUsuarios[i].Descripcion,
            "Fecha": [new Date(this.DatosUsuarios[i].Fecha)]
          });
        }
      }

      // NUMERO DE USUARIOS POR LOCALIDAD EN LOS ULTIMOS CUATRO MESES
      for (let i = 0; i < this.FechasRegistrosUsers.length; i++) {
        if (i < this.FechasRegistrosUsers.length) {
          UsuariosMesUno = 0;
          UsuariosMesDos = 0;
          UsuariosMesTres = 0;
          UsuariosMesCuatro = 0;
          for (let j = 0; j < this.FechasRegistrosUsers[i].Fecha[j]; j++) {
            if (this.FechasRegistrosUsers[i].Fecha[j] >= new Date('2023-11-1') && this.FechasRegistrosUsers[i].Fecha[j] < new Date('2023-12-1')) {
              UsuariosMesUno = UsuariosMesUno + 1;
            }
            if (this.FechasRegistrosUsers[i].Fecha[j] >= new Date('2023-12-1') && this.FechasRegistrosUsers[i].Fecha[j] < new Date('2024-1-1')) {
              UsuariosMesDos = UsuariosMesDos + 1;
            }
            if (this.FechasRegistrosUsers[i].Fecha[j] >= new Date('2024-1-1') && this.FechasRegistrosUsers[i].Fecha[j] < new Date('2024-2-1')) {
              UsuariosMesTres = UsuariosMesTres + 1;
            }
            if (this.FechasRegistrosUsers[i].Fecha[j] >= new Date('2024-2-1') && this.FechasRegistrosUsers[i].Fecha[j] < new Date('2024-3-1')) {
              UsuariosMesCuatro = UsuariosMesCuatro + 1;
            }
          }
          this.MesesRegistrosUsers.push({
            "IdSector": this.FechasRegistrosUsers[i].IdSector, "Localidad": this.FechasRegistrosUsers[i].Descripcion, "series": [{
              "name": "Nov-23",
              "value": UsuariosMesUno
            },
            {
              "name": "Dic-23",
              "value": UsuariosMesDos
            },
            {
              "name": "Ene-2024",
              "value": UsuariosMesTres
            },
            {
              "name": "Feb-2024",
              "value": UsuariosMesCuatro
            }]
          });
        }
      }

      // IMPRESION GRAFICA DE USUARIOS EN LOS ULTIMOS CUATRO MESES
      this.DatosBarrasUsuarios = this.MesesRegistrosUsers.map((item: any) => ({
        "name": item.Localidad,
        "series": item.series
      }));
    });

    // SERVICIO COMPRAS
    this.ServicioReporte.InfoUsuariosComprasDash('1').subscribe(ResultObservable => {
      // CONVERSION DE FECHAS DE TIPO STRING A DATE EN COMPRAS
      for (let i = 0; i < ResultObservable.length; i++) {
        SplitDos = ResultObservable[i].FechaCompra.split('-');
        this.CambioFormatoFechasCompras[i] = new Date(SplitDos[0], SplitDos[1] - 1, SplitDos[2]);
        this.DatosCompras.push({
          "IdSector": ResultObservable[i].IdSector, "Descripcion": ResultObservable[i].DSCRPCION_SCTOR,
          "Fecha": this.CambioFormatoFechasCompras[i]
        });
      }

      // AGRUPACION DE FECHAS DE COMPRAS POR LOCALIDAD
      for (let i = 0; i < this.DatosCompras.length; i++) {
        if (this.FechasCompras.length > 0) {
          for (let j = 0; j < i; j++) {
            if (this.FechasCompras[j].IdSector == this.DatosCompras[i].IdSector) {
              this.FechasCompras[j].Fecha.push(this.DatosCompras[i].Fecha);
              break;
            } else {
              Marcador = j + 1;
              if (Marcador == this.FechasCompras.length) {
                this.FechasCompras.push({
                  "IdSector": this.DatosCompras[i].IdSector, "Descripcion": this.DatosCompras[i].Descripcion,
                  "Fecha": [new Date(this.DatosCompras[i].Fecha)]
                });
                break;
              }
            }
          }
        } else {
          this.FechasCompras.push({
            "IdSector": this.DatosCompras[i].IdSector, "Descripcion": this.DatosCompras[i].Descripcion,
            "Fecha": [new Date(this.DatosCompras[i].Fecha)]
          });
        }
      }

      // PROMEDIO DE COMPRA POR LOCALIDAD
      for (let i = 0; i < this.FechasCompras.length; i++) {
        if (i < this.FechasCompras.length) {
          this.PromCompras = 0;
          Contador = 0;
          DiferenciasDias = 0;
          AcumuladorDias = 0;
          for (let j = 0; j < this.FechasCompras[i].Fecha[j]; j++) {
            Contador = Contador + 1;
            if (this.FechasCompras[i].Fecha[j + 1] != null) {
              DiferenciasDias = (this.FechasCompras[i].Fecha[j] - this.FechasCompras[i].Fecha[j + 1]) / (1000 * 60 * 60 * 24);
              AcumuladorDias = AcumuladorDias + DiferenciasDias;
            } else {
              break;
            }
          }
          this.PromCompras = AcumuladorDias / Contador
          this.PromComprasLocalidad.push({
            "IdSector": this.FechasCompras[i].IdSector, "Localidad": this.FechasCompras[i].Descripcion,
            "Promedio": this.PromCompras
          });
        }
      }

      // IMPRESION GRAFICO DE PROMEDIO DE COMPRA POR LOCALIDAD
      this.DatosBarrasUsuariosProm = this.PromComprasLocalidad.map((item: any) => ({
        "name": item.Localidad,
        "value": item.Promedio
      }));

    });
  }

  // GenerarExcelUsuarios() {
  //   let workbookUsuarios = new Workbook();
  //   let worksheetUsuaUno = workbookUsuarios.addWorksheet("Numero Usuarios Localidad");
  //   let worksheetUsuaDos = workbookUsuarios.addWorksheet("Promedio Compras Localidad");
  //   let worksheetUsuaTres = workbookUsuarios.addWorksheet("Usuarios Localidad Ultimos Cuatro Meses");

  //   let headerUsuaUno = ["Id Localidad", "Localidad", "Numero Total Usuarios"];
  //   let headerUsuaDos = ["Id Localidad", "Localidad", "Promedio de Compra"];
  //   let headerUsuaTres = ["Id Localidad", "Localidad", "Meses"];

  //   worksheetUsuaUno.addRow(headerUsuaUno);
  //   worksheetUsuaDos.addRow(headerUsuaDos);
  //   worksheetUsuaTres.addRow(headerUsuaTres);

  //   ['A1', 'B1', 'C1'].map(key => {
  //     worksheetUsuaUno.getCell(key).fill = {
  //       type: 'pattern',
  //       pattern: 'darkTrellis',
  //       fgColor: { argb: '397c97' },
  //       bgColor: { argb: '397c97' }
  //     };
  //     worksheetUsuaUno.getCell(key).font = {
  //       color: { argb: 'FFFFFF' }
  //     };
  //     worksheetUsuaDos.getCell(key).fill = {
  //       type: 'pattern',
  //       pattern: 'darkTrellis',
  //       fgColor: { argb: '397c97' },
  //       bgColor: { argb: '397c97' }
  //     };
  //     worksheetUsuaDos.getCell(key).font = {
  //       color: { argb: 'FFFFFF' }
  //     };
  //     worksheetUsuaTres.getCell(key).fill = {
  //       type: 'pattern',
  //       pattern: 'darkTrellis',
  //       fgColor: { argb: '397c97' },
  //       bgColor: { argb: '397c97' }
  //     };
  //     worksheetUsuaTres.getCell(key).font = {
  //       color: { argb: 'FFFFFF' }
  //     };
  //   });

  //   worksheetUsuaUno.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }];
  //   worksheetUsuaDos.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }];
  //   worksheetUsuaTres.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }];

  //   worksheetUsuaUno.autoFilter = 'A1:C1';
  //   worksheetUsuaDos.autoFilter = 'A1:C1';
  //   worksheetUsuaTres.autoFilter = 'A1:C1';

  //   for (let FilaDatosUno of this.NumeroUsuariosLocalidad) {
  //     let TempDatosUno = [];

  //     TempDatosUno.push(FilaDatosUno['IdSector'])
  //     TempDatosUno.push(FilaDatosUno['Descripcion'])
  //     TempDatosUno.push(FilaDatosUno['NumeroUsuarios'])

  //     worksheetUsuaUno.addRow(TempDatosUno);
  //   }

  //   for (let FilaDatosDos of this.PromComprasLocalidad) {
  //     let TempDatosDos = [];

  //     TempDatosDos.push(FilaDatosDos['IdSector'])
  //     TempDatosDos.push(FilaDatosDos['Localidad'])
  //     TempDatosDos.push(FilaDatosDos['Promedio'])

  //     worksheetUsuaDos.addRow(TempDatosDos);
  //   }

  //   // for (let FilaDatosTres of this.MesesRegistrosUsers) {
  //   //   let TempDatosTres = [];

  //   //   TempDatosTres.push(FilaDatosTres['IdSector'])
  //   //   TempDatosTres.push(FilaDatosTres['Localidad'])
  //   //   TempDatosTres.push(FilaDatosTres['series'])

  //   //   worksheetUsuaTres.addRow(TempDatosTres);
  //   // }

  //   let rowIndex = 1;

  //   for (rowIndex; rowIndex <= worksheetUsuaUno.rowCount; rowIndex++) {
  //     worksheetUsuaUno.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  //   }
  //   rowIndex = 1;
  //   for (rowIndex; rowIndex <= worksheetUsuaDos.rowCount; rowIndex++) {
  //     worksheetUsuaDos.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  //   }
  //   rowIndex = 1;
  //   for (rowIndex; rowIndex <= worksheetUsuaTres.rowCount; rowIndex++) {
  //     worksheetUsuaTres.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  //   }

  //   let NombreDocumento = "Usuarios Totales Registrados";
  //   workbookUsuarios.xlsx.writeBuffer().then((data) => {
  //     let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     fs.saveAs(blob, NombreDocumento + '.xlsx');
  //   });
  // }

  ConversionFechaString(Fecha: number) {
    let ConversionFecha: string = '';
    if (Fecha == 1) {
      ConversionFecha = 'Enero';
    } else if (Fecha == 2) {
      ConversionFecha = 'Febrero';
    } else if (Fecha == 3) {
      ConversionFecha = 'Marzo';
    } else if (Fecha == 4) {
      ConversionFecha = 'Abril';
    } else if (Fecha == 5) {
      ConversionFecha = 'Mayo';
    } else if (Fecha == 6) {
      ConversionFecha = 'Junio';
    } else if (Fecha == 7) {
      ConversionFecha = 'Julio';
    } else if (Fecha == 8) {
      ConversionFecha = 'Agosto';
    } else if (Fecha == 9) {
      ConversionFecha = 'Septiembre';
    } else if (Fecha == 10) {
      ConversionFecha = 'Octubre';
    } else if (Fecha == 11) {
      ConversionFecha = 'Noviembre';
    } else if (Fecha == 12) {
      ConversionFecha = 'Diciembre';
    }
    return ConversionFecha;
  }

  ConversionNull(Descripcion: any) {
    let ConversionNull: any = '';
    if (Descripcion == null) {
      ConversionNull = 'No Encontrado';
    } else {
      ConversionNull = Descripcion;
    }
    return ConversionNull
  }

  InfoVentas() {
    this.MostrarVentas = true;
    this.MostrarUsuarios = false;
    this.MostrarProductos = false;

    this.VentasTotales = [];
    this.NumeroVentasTotales = [];
    this.NumeroTotalVentas = 0;
    this.NumeroVentasMensuales = [];
    this.NumeroComprasLocalidad = [];

    this.document.querySelector('#OpcionUno')?.classList.add('OpcionUnoAfter');
    this.document.querySelector('#OpcionDos')?.classList.add('OpcionDosEstandarAfter');
    this.document.querySelector('#OpcionTres')?.classList.remove('OpcionTresEstandarAfter');

    let Marcador: number = 0;

    // INFORMACION VENTAS GENERALES
    this.ServicioReporte.InfoVentasDash('1').subscribe(ResultObservableVentasTotales => {
      this.InfoVentasUno = ResultObservableVentasTotales;
      for (let i = 0; i < ResultObservableVentasTotales.length; i++) {
        if (this.VentasTotales.length > 0) {
          for (let j = 0; j < i; j++) {
            if (this.VentasTotales[j].IdSector == ResultObservableVentasTotales[i].IdSector) {
              this.VentasTotales[j].Fecha.push({
                "name": this.ConversionFechaString(ResultObservableVentasTotales[i].IdMes) + " " + ResultObservableVentasTotales[i].IdAno,
                "value": ResultObservableVentasTotales[i].NumCompras
              });
              break;
            } else {
              Marcador = j + 1;
              if (Marcador == this.VentasTotales.length) {
                this.VentasTotales.push({
                  "IdSector": ResultObservableVentasTotales[i].IdSector, "Descripcion": ResultObservableVentasTotales[i].DescripcionSector,
                  "Fecha": [{
                    "name": this.ConversionFechaString(ResultObservableVentasTotales[i].IdMes) + " " + ResultObservableVentasTotales[i].IdAno,
                    "value": ResultObservableVentasTotales[i].NumCompras
                  }]
                });
                break;
              }
            }
          }
        } else {
          this.VentasTotales.push({
            "IdSector": ResultObservableVentasTotales[i].IdSector, "Descripcion": ResultObservableVentasTotales[i].DescripcionSector,
            "Fecha": [{
              "name": this.ConversionFechaString(ResultObservableVentasTotales[i].IdMes) + " " + ResultObservableVentasTotales[i].IdAno,
              "value": ResultObservableVentasTotales[i].NumCompras
            }]
          });
        }
      }

      this.NumeroVentasTotales = this.VentasTotales.map((item: any) => ({
        "name": item.Descripcion,
        "series": item.Fecha
      }));
    });

    this.ServicioReporte.InfoVentasDash('2').subscribe(ResultObservableVentas => {
      this.InfoVentasDos = ResultObservableVentas;
      for (let i = 0; i < ResultObservableVentas.length; i++) {
        this.NumeroTotalVentas = this.NumeroTotalVentas + ResultObservableVentas[i].NumCompras;
      }

      this.NumeroVentasMensuales = ResultObservableVentas.map((item: any) => ({
        "name": this.ConversionFechaString(item.IdMes) + " " + item.IdAno,
        "value": item.NumCompras
      }))
    });

    this.ServicioReporte.InfoVentasDash('3').subscribe(ResultObservableVentasLocali => {
      this.InfoVentasTres = ResultObservableVentasLocali;
      this.NumeroComprasLocalidad = ResultObservableVentasLocali.map((item: any) => ({
        "name": item.DescripcionSector,
        "value": item.NumCompras
      }));
    });
  }

  GenerarExcelVentas() {
    let workbookUno = new Workbook();
    let worksheetUno = workbookUno.addWorksheet("Ventas Por Fecha y Localidad");
    let worksheetDos = workbookUno.addWorksheet("Ventas Por Fecha");
    let worksheetTres = workbookUno.addWorksheet("Ventas Por Localidad");

    let headerUno = ["Id General", "Id Localidad", "Localidad", "Mes", "Año", "Numero de Compras"];
    let headerDos = ["Id General", "Mes", "Año", "Numero de Compras"];
    let headerTres = ["Id General", "Id Localidad", "Localidad", "Numero de Compras"];

    worksheetUno.addRow(headerUno);
    worksheetDos.addRow(headerDos);
    worksheetTres.addRow(headerTres);

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'].map(key => {
      worksheetUno.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetUno.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    ['A1', 'B1', 'C1', 'D1'].map(key => {
      worksheetDos.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetDos.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
      worksheetTres.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetTres.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    worksheetUno.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }];

    worksheetDos.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' }];

    worksheetTres.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' }];

    worksheetUno.autoFilter = 'A1:F1';
    worksheetDos.autoFilter = 'A1:D1';
    worksheetTres.autoFilter = 'A1:D1';


    for (let FilaDatosUno of this.InfoVentasUno) {
      let TempDatosUno = [];

      TempDatosUno.push(FilaDatosUno['id'])
      TempDatosUno.push(FilaDatosUno['IdSector'])
      TempDatosUno.push(FilaDatosUno['DescripcionSector'])
      TempDatosUno.push(this.ConversionFechaString(FilaDatosUno['IdMes']))
      TempDatosUno.push(FilaDatosUno['IdAno'])
      TempDatosUno.push(FilaDatosUno['NumCompras'])

      worksheetUno.addRow(TempDatosUno);
    }

    for (let FilaDatosDos of this.InfoVentasDos) {
      let TempDatosDos = [];

      TempDatosDos.push(FilaDatosDos['id'])
      TempDatosDos.push(this.ConversionFechaString(FilaDatosDos['IdMes']))
      TempDatosDos.push(FilaDatosDos['IdAno'])
      TempDatosDos.push(FilaDatosDos['NumCompras'])

      worksheetDos.addRow(TempDatosDos);
    }

    for (let FilaDatosTres of this.InfoVentasTres) {
      let TempDatosTres = [];

      TempDatosTres.push(FilaDatosTres['id'])
      TempDatosTres.push(FilaDatosTres['IdSector'])
      TempDatosTres.push(FilaDatosTres['DescripcionSector'])
      TempDatosTres.push(FilaDatosTres['NumCompras'])

      worksheetTres.addRow(TempDatosTres);
    }

    let rowIndex = 1;

    for (rowIndex; rowIndex <= worksheetUno.rowCount; rowIndex++) {
      worksheetUno.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndex = 1;
    for (rowIndex; rowIndex <= worksheetDos.rowCount; rowIndex++) {
      worksheetDos.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndex = 1;
    for (rowIndex; rowIndex <= worksheetTres.rowCount; rowIndex++) {
      worksheetTres.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }

    let NombreDocumento = "Ventas en los Ultimos 6 Meses";
    workbookUno.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, NombreDocumento + '.xlsx');
    });

  }

  InfoProductos() {
    this.MostrarProductos = true;
    this.MostrarVentas = false;
    this.MostrarUsuarios = false;

    this.NumeroTotalVentasProd = 0;
    this.VentasProdLocali = [];
    this.NumeroVentasProdLocali = [];
    this.VentasProdFecha = [];
    this.NumeroVentasProdFecha = [];
    this.VentasProdLocaliFecha = [];
    this.NumeroVentasProdGene = [];

    this.document.querySelector('#OpcionUno')?.classList.add('OpcionUnoAfter');
    this.document.querySelector('#OpcionDos')?.classList.remove('OpcionDosEstandarAfter');
    this.document.querySelector('#OpcionTres')?.classList.add('OpcionTresEstandarAfter');

    let Marcador: number = 0;

    // NUMERO DE PRODUCTOS VENDIDOS POR LCOALIDAD Y FECHA
    this.ServicioReporte.InfoVentasProdDash('1').subscribe(ResultObservableVentasProd => {
      this.InfoProductosUno = ResultObservableVentasProd;
      for (let i = 0; i < ResultObservableVentasProd.length; i++) {
        if (this.VentasProdLocaliFecha.length > 0) {
          for (let j = 0; j < i; j++) {
            if (this.VentasProdLocaliFecha[j].IdLocalidad == ResultObservableVentasProd[i].IdSector) {
              this.VentasProdLocaliFecha[j].serie.push({
                "name": this.ConversionFechaString(ResultObservableVentasProd[i].IdMes) + " " +
                  ResultObservableVentasProd[i].IdAno + " " +
                  this.ConversionNull(ResultObservableVentasProd[i].DSCRPCION),
                "value": ResultObservableVentasProd[i].Cantidad
              })
              break;
            } else {
              Marcador = j + 1;
              if (Marcador == this.VentasProdLocaliFecha.length) {
                this.VentasProdLocaliFecha.push({
                  "IdLocalidad": ResultObservableVentasProd[i].IdSector, "Localidad": ResultObservableVentasProd[i].DescripcionSector,
                  "serie": [{
                    "name": this.ConversionFechaString(ResultObservableVentasProd[i].IdMes) + " " + ResultObservableVentasProd[i].IdAno + " " +
                      this.ConversionNull(ResultObservableVentasProd[i].DSCRPCION),
                    "value": ResultObservableVentasProd[i].Cantidad
                  }]
                });
                break;
              }
            }
          }
        } else {
          this.VentasProdLocaliFecha.push({
            "IdLocalidad": ResultObservableVentasProd[i].IdSector, "Localidad": ResultObservableVentasProd[i].DescripcionSector,
            "serie": [{
              "name": this.ConversionFechaString(ResultObservableVentasProd[i].IdMes) + " " + ResultObservableVentasProd[i].IdAno + " " +
                this.ConversionNull(ResultObservableVentasProd[i].DSCRPCION),
              "value": ResultObservableVentasProd[i].Cantidad
            }]
          })
        }
      }

      this.NumeroVentasProdGene = this.VentasProdLocaliFecha.map((item: any) => ({
        "name": item.Localidad,
        "series": item.serie
      }));
    });

    // NUMERO DE PRODUCTOS VENDIDOS POR FECHA
    this.ServicioReporte.InfoVentasProdDash('2').subscribe(ResultObservableVentasProd => {
      this.InfoProductosDos = ResultObservableVentasProd;
      for (let i = 0; i < ResultObservableVentasProd.length; i++) {
        this.NumeroTotalVentasProd = this.NumeroTotalVentasProd + ResultObservableVentasProd[i].Cantidad;
        if (this.VentasProdFecha.length > 0) {
          for (let j = 0; j < i; j++) {
            if (this.VentasProdFecha[j].Mes == ResultObservableVentasProd[i].IdMes) {
              this.VentasProdFecha[j].Producto.push({ "name": this.ConversionNull(ResultObservableVentasProd[i].DSCRPCION), "value": ResultObservableVentasProd[i].Cantidad })
              break;
            } else {
              Marcador = j + 1;
              if (Marcador == this.VentasProdFecha.length) {
                this.VentasProdFecha.push({
                  "Mes": ResultObservableVentasProd[i].IdMes, "Año": ResultObservableVentasProd[i].IdAno,
                  "Producto": [{ "name": this.ConversionNull(ResultObservableVentasProd[i].DSCRPCION), "value": ResultObservableVentasProd[i].Cantidad }]
                });
                break;
              }
            }
          }
        } else {
          this.VentasProdFecha.push({
            "Mes": ResultObservableVentasProd[i].IdMes, "Año": ResultObservableVentasProd[i].IdAno,
            "Producto": [{ "name": this.ConversionNull(ResultObservableVentasProd[i].DSCRPCION), "value": ResultObservableVentasProd[i].Cantidad }]
          });
        }
      }

      this.NumeroVentasProdFecha = this.VentasProdFecha.map((item: any) => ({
        "name": this.ConversionFechaString(item.Mes) + " " + item.Año,
        "series": item.Producto
      }));
    });

    // NUMERO DE PRODUCTOS VENDIDOS POR LOCALIDAD
    this.ServicioReporte.InfoVentasProdDash('3').subscribe(ResultObservableVentasProd => {
      this.InfoProductosTres = ResultObservableVentasProd;
      for (let i = 0; i < ResultObservableVentasProd.length; i++) {
        if (this.VentasProdLocali.length > 0) {
          for (let j = 0; j < i; j++) {
            if (this.VentasProdLocali[j].IdSector == ResultObservableVentasProd[i].IdSector) {
              this.VentasProdLocali[j].Producto.push({
                "name": this.ConversionNull(ResultObservableVentasProd[i].DSCRPCION),
                "value": ResultObservableVentasProd[i].Cantidad
              })
              break;
            } else {
              Marcador = j + 1;
              if (Marcador == this.VentasProdLocali.length) {
                this.VentasProdLocali.push({
                  "IdSector": ResultObservableVentasProd[i].IdSector, "Localidad": ResultObservableVentasProd[i].DescripcionSector,
                  "Producto": [{ "name": this.ConversionNull(ResultObservableVentasProd[i].DSCRPCION), "value": ResultObservableVentasProd[i].Cantidad }]
                });
                break;
              }
            }
          }
        } else {
          this.VentasProdLocali.push({
            "IdSector": ResultObservableVentasProd[i].IdSector, "Localidad": ResultObservableVentasProd[i].DescripcionSector,
            "Producto": [{ "name": this.ConversionNull(ResultObservableVentasProd[i].DSCRPCION), "value": ResultObservableVentasProd[i].Cantidad }]
          });
        }
      }

      this.NumeroVentasProdLocali = this.VentasProdLocali.map((item: any) => ({
        "name": item.Localidad,
        "series": item.Producto
      }));
    });
  }

  GenerarExcelProdutos() {
    let workbookProductos = new Workbook();
    let worksheetProdUno = workbookProductos.addWorksheet("Ventas de Productos Por Fecha y Localidad");
    let worksheetProdDos = workbookProductos.addWorksheet("Ventas de Productos Por Fecha");
    let worksheetProdTres = workbookProductos.addWorksheet("Ventas de Productos Por Localidad");

    let headerProdUno = ["Id General", "Id Localidad", "Localidad", "Id Producto", "Producto", "Mes", "Año", "Numero de Compras"];
    let headerProdDos = ["Id General", "Id Producto", "Producto", "Mes", "Año", "Numero de Compras"];
    let headerProdTres = ["Id General", "Id Localidad", "Localidad", "Id Producto", "Producto", "Numero de Compras"];


    worksheetProdUno.addRow(headerProdUno);
    worksheetProdDos.addRow(headerProdDos);
    worksheetProdTres.addRow(headerProdTres);

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1'].map(key => {
      worksheetProdUno.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetProdUno.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'].map(key => {
      worksheetProdDos.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetProdDos.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
      worksheetProdTres.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetProdTres.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    worksheetProdUno.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }, { width: 30, key: 'G' }, { width: 30, key: 'H' }];

    worksheetProdDos.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }];

    worksheetProdTres.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }];

    worksheetProdUno.autoFilter = 'A1:F1';
    worksheetProdDos.autoFilter = 'A1:F1';
    worksheetProdTres.autoFilter = 'A1:F1';

    for (let FilaDatosProdUno of this.InfoProductosUno) {
      let TempDatosProdUno = [];

      TempDatosProdUno.push(FilaDatosProdUno['Id'])
      TempDatosProdUno.push(FilaDatosProdUno['IdSector'])
      TempDatosProdUno.push(FilaDatosProdUno['DescripcionSector'])
      TempDatosProdUno.push(this.ConversionNull(FilaDatosProdUno['idproducto']))
      TempDatosProdUno.push(this.ConversionNull(FilaDatosProdUno['DSCRPCION']))
      TempDatosProdUno.push(this.ConversionFechaString(FilaDatosProdUno['IdMes']))
      TempDatosProdUno.push(FilaDatosProdUno['IdAno'])
      TempDatosProdUno.push(FilaDatosProdUno['Cantidad'])

      worksheetProdUno.addRow(TempDatosProdUno);
    }

    for (let FilaDatosProdDos of this.InfoProductosDos) {
      let TempDatosProdDos = [];

      TempDatosProdDos.push(FilaDatosProdDos['Id'])
      TempDatosProdDos.push(this.ConversionNull(FilaDatosProdDos['idproducto']))
      TempDatosProdDos.push(this.ConversionNull(FilaDatosProdDos['DSCRPCION']))
      TempDatosProdDos.push(this.ConversionFechaString(FilaDatosProdDos['IdMes']))
      TempDatosProdDos.push(FilaDatosProdDos['IdAno'])
      TempDatosProdDos.push(FilaDatosProdDos['Cantidad'])

      worksheetProdDos.addRow(TempDatosProdDos);
    }

    for (let FilaDatosProdTres of this.InfoProductosTres) {
      let TempDatosProdTres = [];

      TempDatosProdTres.push(FilaDatosProdTres['Id'])
      TempDatosProdTres.push(FilaDatosProdTres['IdSector'])
      TempDatosProdTres.push(FilaDatosProdTres['DescripcionSector'])
      TempDatosProdTres.push(this.ConversionNull(FilaDatosProdTres['idproducto']))
      TempDatosProdTres.push(this.ConversionNull(FilaDatosProdTres['DSCRPCION']))
      TempDatosProdTres.push(FilaDatosProdTres['Cantidad'])

      worksheetProdTres.addRow(TempDatosProdTres);
    }

    let rowIndexProd = 1

    for (rowIndexProd; rowIndexProd <= worksheetProdUno.rowCount; rowIndexProd++) {
      worksheetProdUno.getRow(rowIndexProd).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndexProd = 1
    for (rowIndexProd; rowIndexProd <= worksheetProdDos.rowCount; rowIndexProd++) {
      worksheetProdDos.getRow(rowIndexProd).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndexProd = 1
    for (rowIndexProd; rowIndexProd <= worksheetProdTres.rowCount; rowIndexProd++) {
      worksheetProdTres.getRow(rowIndexProd).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }

    let NombreXlsxProd = "Numero de Ventas Por Producto en los Ultimos Seis Meses"
    workbookProductos.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, NombreXlsxProd + '.xlsx');
    });
  }
}