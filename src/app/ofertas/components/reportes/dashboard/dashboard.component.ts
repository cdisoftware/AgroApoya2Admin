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

  // VARIABLES SELECTORAS DENTRO DEL MODULO DASHBOARD
  SlideBoton: boolean = false;
  MostrarSlideBoton: boolean = false;
  MostrarUsuarios: boolean = false;
  MostrarVentas: boolean = false;
  MostrarProductos: boolean = false;
  MostrarProductosPesos: boolean = false;
  MostrarProdLibrasUltimo: boolean = false;
  MostrarProdPesosUltimo: boolean = false;
  MostrarGrafiDinamiLibras: boolean = false;
  MostrarGrafiDinamiPesos: boolean = false;

  // VARIABLES NUMERO DE USUARIOS TOTALES Y NUMERO DE USUARIOS POR LOCALIDAD
  UsuariosTotales: any = [];
  NumeroUsuariosTotales: any = [];
  NumeroUsuariosSeisMeses: number = 0;
  NumeroUsuariosLocalidad: any = [];
  InfoUsuariosUno: any = [];
  InfoUsuariosDos: any = [];
  InfoUsuariosTres: any = [];
  InfoUsuariosCuatro: any = [];
  InfoUsuariosCinco: any = [];

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

  // VARIABLES PRODUCTOS LIBRAS Y PESOS
  InfoProdLibrasUno: any = [];
  InfoProdLibrasDos: any = [];
  InfoProdLibrasTres: any = [];

  InfoProdPesosUno: any = [];
  InfoProdPesosDos: any = [];
  InfoProdPesosTres: any = [];

  TituloGraficoUno: any = [];
  TituloGraficoDos: any = [];
  TituloGraficoTres: any = [];
  TituloGraficoCuatro: any = [];
  TituloGraficoCinco: any = [];
  TituloGraficoSeis: any = [];

  // VARIABLES GRAFICOS DINAMICOS PRODUCTOS LIBRAS Y PESOS
  DatosFiltradosMes: any = [];
  DatosFiltradosLocali: any = [];
  NombreTituloFiltrados: string = '';
  FechaTituloFiltrados: string = '';

  // ----------------- GRAFICAS USUARIOS -----------------

  // VARIABLES GRAFICO FRECUENCIA DE COMPRA USUARIOS
  MedidasTortaFrecu: [number, number] = [600, 400];
  DatosFrecuUsuarios: any = [];
  GradientFrecu: boolean = true;
  ColoresFrecu: any = {
    domain: ['#397c97', '#ecd444', '#a84fc0', '#ec7f44', '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#aea04b', '#3cb371',
      '#aea04b', '#737686'],
  };

  // VARIABLES GRAFICO FRECUENCIA DE COMPRA USUARIOS POR LOCALIDAD
  MedidasTortaFrecuLocali: [number, number] = [600, 400];
  DatosFrecuLocali: any = [];
  GradientFrecuLocali: boolean = true;
  ColoresFrecuLocali: any = {
    domain: ['#ec445d', '#397c97', '#a84fc0', '#ec7f44', '#ecd444', '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#ec445d', '#aea04b', '#3cb371',
      '#aea04b', '#737686'],
  };

  // VARIABLES GRAFICO USUARIOS POR LOCALIDAD
  MedidasUsuLocalidad: [number, number] = [1250, 350];
  ColoresUsuLocalidad: any = {
    domain: ['#ec7f44', '#397c97', '#67c04f', '#b1ec44', '#a84fc0', '#ecd444', '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#ec445d', '#978c39',
      '#f4a460', '#836c79', '#3cb371', '#3d4d56', '#bc8f8f', '#aea04b', '#737686'],
  };
  DatosUsuLocalidad: any = [];
  MostrarEjeXUsuLocalidad: boolean = true;
  MostrarEjeYUsuLocalidad: boolean = true;
  MostrarLeyendaUsuLocalidad: boolean = false;
  MostrarXLabelUsuLocalidad: boolean = true;
  MostrarYLabelUsuLocalidad: boolean = true;
  LabelXUsuLocalidad: string = 'Localidades';
  LabelYUsuLocalidad: string = 'Días';
  LeyendaTituloUsuLocalidad: string = 'Localidades';

  // VARIABLES GRAFICO USUARIOS SEIS MESES POR LOCALIDAD
  MedidasBarras: [number, number] = [1250, 1000];
  ColoresBarras: any = {
    domain: ['#397c97', '#67c04f', '#ec445d', '#ecd444', '#a84fc0', '#bc8f8f', '#ec7f44', '#b1ec44'],
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

  // ----------------- GRAFICAS VENTAS -----------------

  // VARIABLES GRAFICO VENTAS POR SEIS MESES
  MedidasTortaVentMensual: [number, number] = [600, 400];
  NumeroVentasMensuales: any = [];
  GradientVentMensual: boolean = true;
  ColoresVentMensual: any = {
    domain: ['#737686', '#aea04b', '#bc8f8f', '#3d4d56', '#3cb371', '#836c79', '#f4a460', '#978c39']
  };

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

  // VARIABLES GRAFICO VENTAS SEIS MESES POR LOCALIDAD
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

  // ----------------- GRAFICAS PRODUCTOS -----------------

  // VARIABLES GRAFICO TORTAS PRODUCTO MES UNO
  MedidasTortaProdMesUno: [number, number] = [600, 330];
  DatosProdMesUno: any = [];
  GradientProdMesUno: boolean = true;
  ColoresProdMesUno: any = {
    domain: ['#ec7f44', '#397c97', '#ec445d', '#b1ec44', '#a84fc0', '#ecd444', '#67c04f', '#978c39', '#bc8f8f', '#3d4d56',
      '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#aea04b', '#3cb371', '#737686', '#f4a460', '#39978a'
    ]
  };

  // VARIABLES GRAFICO TORTAS PRODUCTO MES DOS
  MedidasTortaProdMesDos: [number, number] = [600, 330];
  DatosProdMesDos: any = [];
  GradientProdMesDos: boolean = true;
  ColoresProdMesDos: any = {
    domain: ['#5c6eca', '#cbe442', '#242740', '#dbd8bf', '#1e5945', '#5f9ea0', '#e51a4c', '#ffe65d', '#0096d2',
      '#f59622', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#aea04b', '#3cb371', '#737686', '#f4a460', '#39978a']
  };

  // VARIABLES GRAFICO TORTAS PRODUCTO MES TRES
  MedidasTortaProdMesTres: [number, number] = [600, 330];
  DatosProdMesTres: any = [];
  GradientProdMesTres: boolean = true;
  ColoresProdMesTres: any = {
    domain: ['#0096d2', '#f3bd97', '#6c7156', '#ec7f44', '#042540', '#a9a487', '#b1ec44', '#e63244', '#445dec',
      '#44ecd3', '#c04f67', '#397c97', '#ffe65d', '#aea04b', '#3cb371', '#737686', '#f4a460', '#39978a']
  };

  // VARIABLES GRAFICO TORTAS PRODUCTO MES CUATRO
  MedidasTortaProdMesCuatro: [number, number] = [600, 330];
  DatosProdMesCuatro: any = [];
  GradientProdMesCuatro: boolean = true;
  ColoresProdMesCuatro: any = {
    domain: ['#397c97', '#ecd444', '#a84fc0', '#ec7f44', '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#aea04b', '#0096d2',
      '#f3bd97', '#6c7156', '#67c04f', '#ffe65d', '#39978a', '#b1ec44', '#e63244', '#f4a460']
  };

  // VARIABLES GRAFICO TORTAS PRODUCTO MES CINCO
  MedidasTortaProdMesCinco: [number, number] = [600, 330];
  DatosProdMesCinco: any = [];
  GradientProdMesCinco: boolean = true;
  ColoresProdMesCinco: any = {
    domain: ['#ec7f44', '#397c97', '#ec445d', '#b1ec44', '#a84fc0', '#ecd444', '#67c04f', '#978c39', '#bc8f8f', '#3d4d56',
      '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#aea04b', '#3cb371', '#737686', '#f4a460', '#39978a']
  };

  // VARIABLES GRAFICO TORTAS PRODUCTO MES SEIS
  MedidasTortaProdMesSeis: [number, number] = [600, 330];
  DatosProdMesSeis: any = [];
  GradientProdMesSeis: boolean = true;
  ColoresProdMesSeis: any = {
    domain: ['#5c6eca', '#cbe442', '#242740', '#dbd8bf', '#1e5945', '#5f9ea0', '#e51a4c', '#ffe65d', '#3d4d56',
      '#f59622', '#a9a487', '#c04f67', '#44ecd3', '#445dec', '#aea04b', '#3cb371', '#737686', '#f4a460', '#39978a'],
  };

  //GRAFICO FILTRADOS MES
  MedidasDatosFiltradosMes: [number, number] = [600, 450];
  ColoresDatosFiltradosMes: any = {
    domain: ['#ec445d', '#397c97', '#ec7f44', '#ecd444', '#042540', '#a9a487', '#c04f67', '#44ecd3', '#445dec'],
  };
  InfoDatosFiltradosMes: any[];
  MostrarEjeXDatosFiltradosMes: boolean = true;
  MostrarEjeYDatosFiltradosMes: boolean = true;
  MostrarLeyendaDatosFiltradosMes: boolean = false;
  MostrarXLabelDatosFiltradosMes: boolean = true;
  MostrarYLabelDatosFiltradosMes: boolean = true;
  LabelXDatosFiltradosMes: string = 'Libras';
  LabelYDatosFiltradosMes: string = 'Presentación Producto';
  LeyendaTituloDatosFiltradosMes: string = 'Localidades';

  //GRAFICO FILTRADOS LOCALIDAD
  MedidasDatosFiltradosLocali: [number, number] = [600, 450];
  ColoresDatosFiltradosLocali: any = {
    domain: ['#397c97', '#67c04f', '#ec445d', '#ecd444', '#39978a', '#a84fc0']
  };
  InfoDatosFiltradosLocali: any = [];
  MostrarEjeXDatosFiltradosLocali: boolean = true;
  MostrarEjeYDatosFiltradosLocali: boolean = true;
  MostrarLeyendaDatosFiltradosLocali: boolean = false;
  MostrarXLabelDatosFiltradosLocali: boolean = true;
  MostrarYLabelDatosFiltradosLocali: boolean = true;
  LabelXDatosFiltradosLocali: string = 'Libras';
  LabelYDatosFiltradosLocali: string = 'Localidades';
  LeyendaTituloDatosFiltradosLocali: string = 'Meses';

  ngOnInit(): void {
    this.InfoUsuarios();
  }

  // METODO UTILIZADO PARA CONTROLAR EL SLIDEBUTTON DE PRODUCTOS
  OnChange(ValorSlide: boolean): void {
    if (ValorSlide) {
      this.MostrarProductos = false;
      this.MostrarGrafiDinamiLibras = false
      this.MostrarProductosPesos = true;
      this.InfoProductosPesos();
      this.document.querySelector('#SlideUno')?.classList.replace('OpcionEstandar', 'OpcionUnoAfter');
      this.document.querySelector('#SlideDos')?.classList.add('OpcionEstandar');
    } else {
      this.MostrarProductosPesos = false;
      this.MostrarGrafiDinamiPesos = false;
      this.MostrarProductos = true;
      this.InfoProductosLibras();
      this.document.querySelector('#SlideUno')?.classList.add('OpcionEstandar');
      this.document.querySelector('#SlideDos')?.classList.remove('OpcionEstandar');
    }
  }

  // METODO PARA CONVERTIR MES NUMERICO A MES TEXTO
  ConversionFechaString(Fecha: any) {
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

  // METODO PARA CONVERTIR NULL A STRING
  ConversionNull(Descripcion: any) {
    let ConversionNull: any = '';
    if (Descripcion == null) {
      ConversionNull = 'No Encontrado';
    } else {
      ConversionNull = Descripcion;
    }
    return ConversionNull
  }

  // METODO PARA CONVERTIR STRING A NUMEROS
  ConversionStringNumeros(String: string) {
    let ConversionNumero = Number(String);
    return ConversionNumero;
  }

  // USUARIOS REGISTRADOS
  InfoUsuarios() {
    this.MostrarVentas = false;
    this.MostrarProductos = false;
    this.MostrarProductosPesos = false;
    this.MostrarSlideBoton = false;
    this.SlideBoton = false;
    this.MostrarGrafiDinamiLibras = false;
    this.MostrarGrafiDinamiPesos = false;
    this.MostrarUsuarios = true;

    this.UsuariosTotales = [];
    this.NumeroUsuariosSeisMeses = 0;
    this.NumeroUsuariosLocalidad = [];
    this.DatosFrecuUsuarios = [];
    this.DatosFrecuLocali = [];
    this.NumeroUsuariosTotales = [];
    this.DatosUsuLocalidad = [];

    this.document.querySelector('#OpcionUno')?.classList.remove('OpcionUnoAfter');
    this.document.querySelector('#OpcionDos')?.classList.remove('OpcionDosEstandarAfter');
    this.document.querySelector('#OpcionTres')?.classList.remove('OpcionTresEstandarAfter');

    let Marcador: number = 0;

    this.ServicioReporte.InfoDashUsuarios(1).subscribe(ResultObservableUsuarios => {
      this.InfoUsuariosUno = ResultObservableUsuarios;
      for (let i = 0; i < ResultObservableUsuarios.length; i++) {
        if (this.UsuariosTotales.length > 0) {
          for (let j = 0; j < i; j++) {
            if (this.UsuariosTotales[j].IdSector == ResultObservableUsuarios[i].IdSector) {
              this.UsuariosTotales[j].Fecha.push({
                "name": this.ConversionFechaString(ResultObservableUsuarios[i].IdMes) + " " + ResultObservableUsuarios[i].IdAno,
                "value": ResultObservableUsuarios[i].NumUsuarios
              });
              break;
            } else {
              Marcador = j + 1;
              if (Marcador == this.UsuariosTotales.length) {
                this.UsuariosTotales.push({
                  "IdSector": ResultObservableUsuarios[i].IdSector, "DescripcionSector": ResultObservableUsuarios[i].DescripcionSector,
                  "Fecha": [{
                    "name": this.ConversionFechaString(ResultObservableUsuarios[i].IdMes) + " " + ResultObservableUsuarios[i].IdAno,
                    "value": ResultObservableUsuarios[i].NumUsuarios
                  }]
                });
                break;
              }
            }
          }
        } else {
          this.UsuariosTotales.push({
            "IdSector": ResultObservableUsuarios[i].IdSector, "DescripcionSector": ResultObservableUsuarios[i].DescripcionSector,
            "Fecha": [{
              "name": this.ConversionFechaString(ResultObservableUsuarios[i].IdMes) + " " + ResultObservableUsuarios[i].IdAno,
              "value": ResultObservableUsuarios[i].NumUsuarios
            }]
          });
        }
      }

      this.NumeroUsuariosTotales = this.UsuariosTotales.map((item: any) => ({
        "name": item.DescripcionSector,
        "series": item.Fecha
      }));
    });

    this.ServicioReporte.InfoDashUsuarios(2).subscribe(ResultObservableUsuarios => {
      this.InfoUsuariosDos = ResultObservableUsuarios;
      this.NumeroUsuariosSeisMeses = ResultObservableUsuarios.reduce((Acum, Elem) => Acum + Elem.NumUsuarios, 0)
    });

    this.ServicioReporte.InfoDashUsuarios(3).subscribe(ResultObservableUsuarios => {
      this.NumeroUsuariosLocalidad = ResultObservableUsuarios;
      this.InfoUsuariosTres = ResultObservableUsuarios;
      this.DatosUsuLocalidad = ResultObservableUsuarios.map((item: any) => ({
        "name": item.DescripcionSector,
        "value": item.NumUsuarios
      }));
    });

    this.ServicioReporte.InfoDashUsuarios(4).subscribe(ResultObservableUsuarios => {
      this.InfoUsuariosCuatro = ResultObservableUsuarios;
      this.DatosFrecuUsuarios = ResultObservableUsuarios.map((item: any) => ({
        "name": "Usuarios con " + item.Id + " compras",
        "value": item.NumUsuarios
      }));
    });

    this.ServicioReporte.InfoDashUsuarios(5).subscribe(ResultObservableUsuarios => {
      this.InfoUsuariosCinco = ResultObservableUsuarios;
      this.DatosFrecuLocali = ResultObservableUsuarios.map((item: any) => ({
        "name": item.DescripcionSector,
        "value": item.NumUsuarios
      }));
    });
  }

  // GENERAR EXCEL USUARIOS
  GenerarExcelUsuarios() {
    let workbookUsuarios = new Workbook();
    let worksheetUsuaUno = workbookUsuarios.addWorksheet("Numero Usuarios Totales");
    let worksheetUsuaDos = workbookUsuarios.addWorksheet("Numero Usuarios Seis Meses");
    let worksheetUsuaTres = workbookUsuarios.addWorksheet("Numero Usuarios Localidad");
    let worksheetUsuaCuatro = workbookUsuarios.addWorksheet("Promedio Compras Usuarios");
    let worksheetUsuaCinco = workbookUsuarios.addWorksheet("Promedio Compras Localidad");

    let headerUsuaUno = ["Id General", "Id Localidad", "Localidad", "Mes", "Año", "Numero de Usuarios"];
    let headerUsuaDos = ["Id General", "Mes", "Año", "Numero de Usuarios"];
    let headerUsuaTres = ["Id General", "Id Localidad", "Localidad", "Numero de Usuarios"];
    let headerUsuaCuatro = ["Numero de Compras", "Frecuencia de Compra"];

    worksheetUsuaUno.addRow(headerUsuaUno);
    worksheetUsuaDos.addRow(headerUsuaDos);
    worksheetUsuaTres.addRow(headerUsuaTres);
    worksheetUsuaCuatro.addRow(headerUsuaCuatro);
    worksheetUsuaCinco.addRow(headerUsuaTres);

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'].map(key => {
      worksheetUsuaUno.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetUsuaUno.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    ['A1', 'B1', 'C1', 'D1'].map(key => {
      worksheetUsuaDos.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetUsuaDos.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
      worksheetUsuaTres.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetUsuaTres.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
      worksheetUsuaCinco.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetUsuaCinco.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    ['A1', 'B1'].map(key => {
      worksheetUsuaCuatro.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetUsuaCuatro.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });


    worksheetUsuaUno.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }];

    worksheetUsuaDos.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' }];

    worksheetUsuaTres.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' }];

    worksheetUsuaCuatro.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }];

    worksheetUsuaCinco.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' }];

    worksheetUsuaUno.autoFilter = 'A1:F1';
    worksheetUsuaDos.autoFilter = 'A1:D1';
    worksheetUsuaTres.autoFilter = 'A1:D1';
    worksheetUsuaCuatro.autoFilter = 'A1:B1';
    worksheetUsuaCinco.autoFilter = 'A1:D1';

    for (let FilaDatosUno of this.InfoUsuariosUno) {
      let TempDatosUno = [];

      TempDatosUno.push(FilaDatosUno['Id'])
      TempDatosUno.push(this.ConversionStringNumeros(FilaDatosUno['IdSector']))
      TempDatosUno.push(FilaDatosUno['DescripcionSector'])
      TempDatosUno.push(this.ConversionFechaString(FilaDatosUno['IdMes']))
      TempDatosUno.push(this.ConversionStringNumeros(FilaDatosUno['IdAno']))
      TempDatosUno.push(FilaDatosUno['NumUsuarios'])

      worksheetUsuaUno.addRow(TempDatosUno);
    }

    for (let FilaDatosDos of this.InfoUsuariosDos) {
      let TempDatosDos = [];

      TempDatosDos.push(FilaDatosDos['Id'])
      TempDatosDos.push(this.ConversionFechaString(FilaDatosDos['IdMes']))
      TempDatosDos.push(this.ConversionStringNumeros(FilaDatosDos['IdAno']))
      TempDatosDos.push(FilaDatosDos['NumUsuarios'])

      worksheetUsuaDos.addRow(TempDatosDos);
    }

    for (let FilaDatosTres of this.InfoUsuariosTres) {
      let TempDatosTres = [];

      TempDatosTres.push(this.ConversionStringNumeros(FilaDatosTres['Id']))
      TempDatosTres.push(this.ConversionStringNumeros(FilaDatosTres['IdSector']))
      TempDatosTres.push(FilaDatosTres['DescripcionSector'])
      TempDatosTres.push(this.ConversionStringNumeros(FilaDatosTres['NumUsuarios']))

      worksheetUsuaTres.addRow(TempDatosTres);
    }

    for (let FilaDatosCuatro of this.InfoUsuariosCuatro) {
      let TempDatosCuatro = [];

      TempDatosCuatro.push(this.ConversionStringNumeros(FilaDatosCuatro['Id']))
      TempDatosCuatro.push(FilaDatosCuatro['NumUsuarios'])

      worksheetUsuaCuatro.addRow(TempDatosCuatro);
    }

    for (let FilaDatosCinco of this.InfoUsuariosCinco) {
      let TempDatosCinco = [];

      TempDatosCinco.push(this.ConversionStringNumeros(FilaDatosCinco['Id']))
      TempDatosCinco.push(this.ConversionStringNumeros(FilaDatosCinco['IdSector']))
      TempDatosCinco.push(FilaDatosCinco['DescripcionSector'])
      TempDatosCinco.push(FilaDatosCinco['NumUsuarios'])

      worksheetUsuaCinco.addRow(TempDatosCinco);
    }

    let rowIndex = 1;

    for (rowIndex; rowIndex <= worksheetUsuaUno.rowCount; rowIndex++) {
      worksheetUsuaUno.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndex = 1;
    for (rowIndex; rowIndex <= worksheetUsuaDos.rowCount; rowIndex++) {
      worksheetUsuaDos.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndex = 1;
    for (rowIndex; rowIndex <= worksheetUsuaTres.rowCount; rowIndex++) {
      worksheetUsuaTres.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndex = 1;
    for (rowIndex; rowIndex <= worksheetUsuaCuatro.rowCount; rowIndex++) {
      worksheetUsuaCuatro.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndex = 1;
    for (rowIndex; rowIndex <= worksheetUsuaCinco.rowCount; rowIndex++) {
      worksheetUsuaCinco.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }

    let NombreDocumento = "Usuarios en los Ultimos 6 Meses";
    workbookUsuarios.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, NombreDocumento + '.xlsx');
    });
  }

  // VENTAS TOTALES
  InfoVentas() {
    this.MostrarUsuarios = false;
    this.MostrarProductos = false;
    this.MostrarProductosPesos = false;
    this.MostrarSlideBoton = false;
    this.SlideBoton = false;
    this.MostrarGrafiDinamiLibras = false;
    this.MostrarGrafiDinamiPesos = false;
    this.MostrarVentas = true;

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

      this.NumeroTotalVentas = ResultObservableVentas.reduce((Acum, Elem) => Acum + Elem.NumCompras, 0)

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

  // GENERAR EXCEL VENTAS
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

      TempDatosTres.push(this.ConversionStringNumeros(FilaDatosTres['id']))
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

  // MODULO PRODUCTO LIBRAS
  InfoProductosLibras() {
    this.MostrarUsuarios = false;
    this.MostrarVentas = false;
    this.SlideBoton = false;
    this.MostrarGrafiDinamiLibras = false;
    this.MostrarGrafiDinamiPesos = false;
    this.MostrarSlideBoton = true;
    this.MostrarProductos = true;

    this.document.querySelector('#OpcionUno')?.classList.add('OpcionUnoAfter');
    this.document.querySelector('#OpcionDos')?.classList.remove('OpcionDosEstandarAfter');
    this.document.querySelector('#OpcionTres')?.classList.add('OpcionTresEstandarAfter');

    this.ServicioReporte.InfoDashProdLibras(1).subscribe(ResultObservableProdLibras => {
      this.InfoProdLibrasUno = ResultObservableProdLibras;
    });

    this.ServicioReporte.InfoDashProdLibras(2).subscribe(ResultObservableProdLibras => {
      this.InfoProdLibrasDos = ResultObservableProdLibras;
    });

    this.ServicioReporte.InfoDashProdLibras(3).subscribe(ResultObservableProdLibras => {
      this.InfoProdLibrasTres = ResultObservableProdLibras;
    });

    this.ServicioReporte.InfoDashProdLibras(4).subscribe(ResultObservableProdLibras => {
      this.DatosProdMesUno = ResultObservableProdLibras.map((item: any) => ({
        "name": item.DSCRPCION,
        "value": this.ConversionStringNumeros(item.VentasLibras),
        "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
      }));

      this.TituloGraficoUno = "Ventas en Libras por Presentación de Producto Mes de  " + this.ConversionFechaString(ResultObservableProdLibras[0].IdMes);
    });

    this.ServicioReporte.InfoDashProdLibras(5).subscribe(ResultObservableProdLibras => {
      this.DatosProdMesDos = ResultObservableProdLibras.map((item: any) => ({
        "name": item.DSCRPCION,
        "value": this.ConversionStringNumeros(item.VentasLibras),
        "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
      }));

      this.TituloGraficoDos = "Ventas en Libras por Presentación de Producto Mes de " + this.ConversionFechaString(ResultObservableProdLibras[0].IdMes);
    });

    this.ServicioReporte.InfoDashProdLibras(6).subscribe(ResultObservableProdLibras => {
      this.DatosProdMesTres = ResultObservableProdLibras.map((item: any) => ({
        "name": item.DSCRPCION,
        "value": this.ConversionStringNumeros(item.VentasLibras),
        "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
      }));

      this.TituloGraficoTres = "Ventas en Libras por Presentación de Producto Mes de " + this.ConversionFechaString(ResultObservableProdLibras[0].IdMes);
    });

    this.ServicioReporte.InfoDashProdLibras(7).subscribe(ResultObservableProdLibras => {
      this.DatosProdMesCuatro = ResultObservableProdLibras.map((item: any) => ({
        "name": item.DSCRPCION,
        "value": this.ConversionStringNumeros(item.VentasLibras),
        "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
      }));

      this.TituloGraficoCuatro = "Ventas en Libras por Presentación de Producto Mes de  " + this.ConversionFechaString(ResultObservableProdLibras[0].IdMes);
    });

    this.ServicioReporte.InfoDashProdLibras(8).subscribe(ResultObservableProdLibras => {
      this.DatosProdMesCinco = ResultObservableProdLibras.map((item: any) => ({
        "name": item.DSCRPCION,
        "value": this.ConversionStringNumeros(item.VentasLibras),
        "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
      }));

      this.TituloGraficoCinco = "Ventas en Libras por Presentación de Producto Mes de " + this.ConversionFechaString(ResultObservableProdLibras[0].IdMes);
    });

    this.ServicioReporte.InfoDashProdLibras(9).subscribe(ResultObservableProdLibras => {
      if (ResultObservableProdLibras[0].IdMes == '') {
        this.MostrarProdLibrasUltimo = false;
      } else {
        this.MostrarProdLibrasUltimo = true;

        this.DatosProdMesSeis = ResultObservableProdLibras.map((item: any) => ({
          "name": item.DSCRPCION,
          "value": this.ConversionStringNumeros(item.VentasLibras),
          "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
        }));

        this.TituloGraficoSeis = "Ventas en Libras por Presentación de Producto Mes de " + this.ConversionFechaString(ResultObservableProdLibras[0].IdMes);
      }
    });
  }

  // GRAFICO DINAMICO PRODUCTO LIBRAS
  AbrirGrafiDinamiLibras(data: any, ContenedorResultadosLibras: string): void {

    let Marcador: number = 0;
    this.MostrarGrafiDinamiLibras = true;
    this.DatosFiltradosMes = [];
    this.DatosFiltradosLocali = [];
    this.NombreTituloFiltrados = '';
    this.FechaTituloFiltrados = '';

    location.hash = "#" + ContenedorResultadosLibras;

    const FiltroClic = JSON.parse(JSON.stringify(data));

    this.ServicioReporte.InfoDashProdLibras(2).subscribe(ResultObservableProdLibras => {
      this.DatosFiltradosMes = ResultObservableProdLibras.filter(x => x.IdProducto == FiltroClic.extra.IdProducto && x.IdMes == FiltroClic.extra.IdMes);

      this.NombreTituloFiltrados = this.DatosFiltradosMes[0].DSCRPCION;
      this.FechaTituloFiltrados = this.ConversionFechaString(this.DatosFiltradosMes[0].IdMes);

      this.InfoDatosFiltradosMes = this.DatosFiltradosMes.map((item: any) => ({
        "name": item.DSCRPCION + " " + item.Presentacion,
        "value": this.ConversionStringNumeros(item.VentasLibras)
      }));
    });

    let DatosFiltro = this.InfoProdLibrasUno.filter((x: any) => x.IdProducto == FiltroClic.extra.IdProducto && x.IdMes == FiltroClic.extra.IdMes);

    for (let i = 0; i < DatosFiltro.length; i++) {
      if (this.DatosFiltradosLocali.length > 0) {
        for (let j = 0; j < i; j++) {
          if (this.DatosFiltradosLocali[j].IdLocalidad == DatosFiltro[i].IdSector) {
            this.DatosFiltradosLocali[j].Grupo.push({
              "name": DatosFiltro[i].DSCRPCION + " - " + DatosFiltro[i].Presentacion,
              "value": this.ConversionStringNumeros(DatosFiltro[i].VentasLibras)
            });
            break;
          } else {
            Marcador = j + 1;
            if (Marcador == this.DatosFiltradosLocali.length) {
              this.DatosFiltradosLocali.push({
                "IdLocalidad": DatosFiltro[i].IdSector, "Localidad": DatosFiltro[i].DescripcionSector,
                "Grupo": [{ "name": DatosFiltro[i].DSCRPCION + " - " + DatosFiltro[i].Presentacion, "value": this.ConversionStringNumeros(DatosFiltro[i].VentasLibras) }]
              });
              break;
            }
          }
        }
      } else {
        this.DatosFiltradosLocali.push({
          "IdLocalidad": DatosFiltro[i].IdSector, "Localidad": DatosFiltro[i].DescripcionSector,
          "Grupo": [{ "name": DatosFiltro[i].DSCRPCION + " - " + DatosFiltro[i].Presentacion, "value": this.ConversionStringNumeros(DatosFiltro[i].VentasLibras) }]
        });
      }
    }

    this.InfoDatosFiltradosLocali = this.DatosFiltradosLocali.map((item: any) => ({
      "name": item.Localidad,
      "series": item.Grupo
    }));
  }

  // GENERAR EXCEL PRODUCTOS LIBRAS
  GenerarExcelProdLibras() {
    let workbookProdLibras = new Workbook();
    let worksheetProdLibrasUno = workbookProdLibras.addWorksheet("Ventas en Libras Fecha y Localidad");
    let worksheetProdLibrasDos = workbookProdLibras.addWorksheet("Ventas en Libras Por Fecha");
    let worksheetProdLibrasTres = workbookProdLibras.addWorksheet("Ventas en Libras Por Localidad");

    let headerProdLibrasUno = ["Id General", "Año", "Mes", "IdProducto", "Producto", "Presentacion", "IdLocalidad", "Localidad", "VentasEnLibras"];
    let headerProdLibrasDos = ["Id General", "Año", "Mes", "IdProducto", "Producto", "Presentacion", "VentasEnPesos"];
    let headerProdLibrasTres = ["Id General", "IdProducto", "Producto", "Presentacion", "IdLocalidad", "Localidad", "VentasEnPesos"];

    worksheetProdLibrasUno.addRow(headerProdLibrasUno);
    worksheetProdLibrasDos.addRow(headerProdLibrasDos);
    worksheetProdLibrasTres.addRow(headerProdLibrasTres);

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1'].map(key => {
      worksheetProdLibrasUno.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetProdLibrasUno.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1'].map(key => {
      worksheetProdLibrasDos.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetProdLibrasDos.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
      worksheetProdLibrasTres.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetProdLibrasTres.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    worksheetProdLibrasUno.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }, { width: 30, key: 'G' }, { width: 30, key: 'H' }, { width: 30, key: 'I' }];

    worksheetProdLibrasDos.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }, { width: 30, key: 'G' }];

    worksheetProdLibrasTres.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }, { width: 30, key: 'G' }];

    worksheetProdLibrasUno.autoFilter = 'A1:I1';
    worksheetProdLibrasDos.autoFilter = 'A1:G1';
    worksheetProdLibrasTres.autoFilter = 'A1:G1';

    for (let FilaDatosProdLibrasUno of this.InfoProdLibrasUno) {
      let TempDatosProdLibrasUno = [];

      TempDatosProdLibrasUno.push(this.ConversionStringNumeros(FilaDatosProdLibrasUno['IdMain']))
      TempDatosProdLibrasUno.push(this.ConversionStringNumeros(FilaDatosProdLibrasUno['IdAno']))
      TempDatosProdLibrasUno.push(this.ConversionFechaString(FilaDatosProdLibrasUno['IdMes']))
      TempDatosProdLibrasUno.push(this.ConversionNull(FilaDatosProdLibrasUno['IdProducto']))
      TempDatosProdLibrasUno.push(this.ConversionNull(FilaDatosProdLibrasUno['DSCRPCION']))
      TempDatosProdLibrasUno.push(this.ConversionNull(FilaDatosProdLibrasUno['Presentacion']))
      TempDatosProdLibrasUno.push(FilaDatosProdLibrasUno['IdSector'])
      TempDatosProdLibrasUno.push(FilaDatosProdLibrasUno['DescripcionSector'])
      TempDatosProdLibrasUno.push(this.ConversionStringNumeros(FilaDatosProdLibrasUno['VentasLibras']))

      worksheetProdLibrasUno.addRow(TempDatosProdLibrasUno);
    }

    for (let FilaDatosProdLibrasDos of this.InfoProdLibrasDos) {
      let TempDatosProdLibrasDos = [];

      TempDatosProdLibrasDos.push(this.ConversionStringNumeros(FilaDatosProdLibrasDos['IdMain']))
      TempDatosProdLibrasDos.push(this.ConversionStringNumeros(FilaDatosProdLibrasDos['IdAno']))
      TempDatosProdLibrasDos.push(this.ConversionFechaString(FilaDatosProdLibrasDos['IdMes']))
      TempDatosProdLibrasDos.push(this.ConversionNull(FilaDatosProdLibrasDos['IdProducto']))
      TempDatosProdLibrasDos.push(this.ConversionNull(FilaDatosProdLibrasDos['DSCRPCION']))
      TempDatosProdLibrasDos.push(this.ConversionNull(FilaDatosProdLibrasDos['Presentacion']))
      TempDatosProdLibrasDos.push(this.ConversionStringNumeros(FilaDatosProdLibrasDos['VentasLibras']))

      worksheetProdLibrasDos.addRow(TempDatosProdLibrasDos);
    }

    for (let FilaDatosProdLibrasTres of this.InfoProdLibrasTres) {
      let TempDatosProdLibrasTres = [];

      TempDatosProdLibrasTres.push(this.ConversionStringNumeros(FilaDatosProdLibrasTres['IdMain']))
      TempDatosProdLibrasTres.push(this.ConversionNull(FilaDatosProdLibrasTres['IdProducto']))
      TempDatosProdLibrasTres.push(this.ConversionNull(FilaDatosProdLibrasTres['DSCRPCION']))
      TempDatosProdLibrasTres.push(this.ConversionNull(FilaDatosProdLibrasTres['Presentacion']))
      TempDatosProdLibrasTres.push(FilaDatosProdLibrasTres['IdSector'])
      TempDatosProdLibrasTres.push(FilaDatosProdLibrasTres['DescripcionSector'])
      TempDatosProdLibrasTres.push(this.ConversionStringNumeros(FilaDatosProdLibrasTres['VentasLibras']))

      worksheetProdLibrasTres.addRow(TempDatosProdLibrasTres);
    }

    let rowIndexProdLibras = 1
    for (rowIndexProdLibras; rowIndexProdLibras <= worksheetProdLibrasUno.rowCount; rowIndexProdLibras++) {
      worksheetProdLibrasUno.getRow(rowIndexProdLibras).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndexProdLibras = 1
    for (rowIndexProdLibras; rowIndexProdLibras <= worksheetProdLibrasDos.rowCount; rowIndexProdLibras++) {
      worksheetProdLibrasDos.getRow(rowIndexProdLibras).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndexProdLibras = 1
    for (rowIndexProdLibras; rowIndexProdLibras <= worksheetProdLibrasTres.rowCount; rowIndexProdLibras++) {
      worksheetProdLibrasTres.getRow(rowIndexProdLibras).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }

    let NombreXlsxProdLibras = "Numero de Ventas en Libras Durante los Ultimos Seis Meses"
    workbookProdLibras.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, NombreXlsxProdLibras + '.xlsx');
    });

  }

  // PRODUCTO PESOS
  InfoProductosPesos() {
    this.MostrarProductos = false;
    this.MostrarVentas = false;
    this.MostrarUsuarios = false;
    this.MostrarGrafiDinamiLibras = false;
    this.MostrarGrafiDinamiPesos = false;
    this.MostrarProductosPesos = true

    this.ServicioReporte.InfoDashProdPesos(1).subscribe(ResultObserProdPesos => {
      this.InfoProdPesosUno = ResultObserProdPesos;
    });

    this.ServicioReporte.InfoDashProdPesos(2).subscribe(ResultObserProdPesos => {
      this.InfoProdPesosDos = ResultObserProdPesos;
    });

    this.ServicioReporte.InfoDashProdPesos(3).subscribe(ResultObserProdPesos => {
      this.InfoProdPesosTres = ResultObserProdPesos;
    });

    this.ServicioReporte.InfoDashProdPesos(4).subscribe(ResultObserProdPesos => {
      this.DatosProdMesUno = ResultObserProdPesos.map((item: any) => ({
        "name": item.DSCRPCION,
        "value": this.ConversionStringNumeros(item.VentasPesos),
        "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
      }));

      this.TituloGraficoUno = "Ventas en Pesos por Presentación de Producto Mes de " + this.ConversionFechaString(ResultObserProdPesos[0].IdMes);

    });

    this.ServicioReporte.InfoDashProdPesos(5).subscribe(ResultObserProdPesos => {
      this.DatosProdMesDos = ResultObserProdPesos.map((item: any) => ({
        "name": item.DSCRPCION,
        "value": this.ConversionStringNumeros(item.VentasPesos),
        "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
      }));

      this.TituloGraficoDos = "Ventas en Pesos por Presentación de Producto Mes de " + this.ConversionFechaString(ResultObserProdPesos[0].IdMes);

    });

    this.ServicioReporte.InfoDashProdPesos(6).subscribe(ResultObserProdPesos => {
      this.DatosProdMesTres = ResultObserProdPesos.map((item: any) => ({
        "name": item.DSCRPCION,
        "value": this.ConversionStringNumeros(item.VentasPesos),
        "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
      }));

      this.TituloGraficoTres = "Ventas en Pesos por Presentación de Producto Mes de " + this.ConversionFechaString(ResultObserProdPesos[0].IdMes);

    });

    this.ServicioReporte.InfoDashProdPesos(7).subscribe(ResultObserProdPesos => {
      this.DatosProdMesCuatro = ResultObserProdPesos.map((item: any) => ({
        "name": item.DSCRPCION,
        "value": this.ConversionStringNumeros(item.VentasPesos),
        "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
      }));

      this.TituloGraficoCuatro = "Ventas en Pesos por Presentación de Producto Mes de " + this.ConversionFechaString(ResultObserProdPesos[0].IdMes);

    });

    this.ServicioReporte.InfoDashProdPesos(8).subscribe(ResultObserProdPesos => {
      this.DatosProdMesCinco = ResultObserProdPesos.map((item: any) => ({
        "name": item.DSCRPCION,
        "value": this.ConversionStringNumeros(item.VentasPesos),
        "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
      }));

      this.TituloGraficoCinco = "Ventas en Pesos por Presentación de Producto Mes de " + this.ConversionFechaString(ResultObserProdPesos[0].IdMes);

    });

    this.ServicioReporte.InfoDashProdPesos(9).subscribe(ResultObserProdPesos => {
      if (ResultObserProdPesos[0].IdMes == '') {
        this.MostrarProdPesosUltimo = false;
      } else {
        this.MostrarProdPesosUltimo = true;

        this.DatosProdMesSeis = ResultObserProdPesos.map((item: any) => ({
          "name": item.DSCRPCION,
          "value": this.ConversionStringNumeros(item.VentasPesos),
          "extra": { "IdProducto": item.IdProducto, "IdMes": item.IdMes }
        }));

        this.TituloGraficoSeis = "Ventas en Pesos por Presentación de Producto Mes de " + this.ConversionFechaString(ResultObserProdPesos[0].IdMes);
      }
    });
  }

  // GRAFICAS DINAMICAS PRODUCTOS PESOS
  AbrirGrafiDinamiPesos(DataClic: any, ContenedorResultadosPesos: string): void {

    let Marcador: number = 0;
    this.MostrarGrafiDinamiPesos = true;
    this.DatosFiltradosMes = [];
    this.InfoDatosFiltradosMes = [];
    this.DatosFiltradosLocali = [];
    this.InfoDatosFiltradosLocali = [];
    this.NombreTituloFiltrados = '';
    this.FechaTituloFiltrados = '';

    location.hash = '#' + ContenedorResultadosPesos;

    const FiltroClicPesos = JSON.parse(JSON.stringify(DataClic));

    this.ServicioReporte.InfoDashProdPesos(2).subscribe(ResultObserProdPesos => {
      this.DatosFiltradosMes = ResultObserProdPesos.filter(x => x.IdProducto == FiltroClicPesos.extra.IdProducto && x.IdMes == FiltroClicPesos.extra.IdMes);

      this.NombreTituloFiltrados = this.DatosFiltradosMes[0].DSCRPCION;
      this.FechaTituloFiltrados = this.ConversionFechaString(this.DatosFiltradosMes[0].IdMes);

      this.InfoDatosFiltradosMes = this.DatosFiltradosMes.map((item: any) => ({
        "name": item.DSCRPCION + " " + item.Presentacion,
        "value": this.ConversionStringNumeros(item.VentasPesos)
      }));
    });

    let DatosFiltroLocalidad = this.InfoProdPesosUno.filter((x: any) => x.IdProducto == FiltroClicPesos.extra.IdProducto && x.IdMes == FiltroClicPesos.extra.IdMes);

    for (let i = 0; i < DatosFiltroLocalidad.length; i++) {
      if (this.DatosFiltradosLocali.length > 0) {
        for (let j = 0; j < i; j++) {
          if (this.DatosFiltradosLocali[j].IdLocalidad == DatosFiltroLocalidad[i].IdSector) {
            this.DatosFiltradosLocali[j].Grupo.push({
              "name": DatosFiltroLocalidad[i].DSCRPCION + " - " + DatosFiltroLocalidad[i].Presentacion,
              "value": this.ConversionStringNumeros(DatosFiltroLocalidad[i].VentasPesos)
            });
            break;
          } else {
            Marcador = j + 1;
            if (Marcador == this.DatosFiltradosLocali.length) {
              this.DatosFiltradosLocali.push({
                "IdLocalidad": DatosFiltroLocalidad[i].IdSector, "Localidad": DatosFiltroLocalidad[i].DescripcionSector,
                "Grupo": [{
                  "name": DatosFiltroLocalidad[i].DSCRPCION + " - " + DatosFiltroLocalidad[i].Presentacion,
                  "value": this.ConversionStringNumeros(DatosFiltroLocalidad[i].VentasPesos)
                }]
              });
              break;
            }
          }
        }
      } else {
        this.DatosFiltradosLocali.push({
          "IdLocalidad": DatosFiltroLocalidad[i].IdSector, "Localidad": DatosFiltroLocalidad[i].DescripcionSector,
          "Grupo": [{
            "name": DatosFiltroLocalidad[i].DSCRPCION + " - " + DatosFiltroLocalidad[i].Presentacion,
            "value": this.ConversionStringNumeros(DatosFiltroLocalidad[i].VentasPesos)
          }]
        });
      }
    }

    this.InfoDatosFiltradosLocali = this.DatosFiltradosLocali.map((item: any) => ({
      "name": item.Localidad,
      "series": item.Grupo
    }));
  }

  // GENERAR EXCEL PRODUCTOS PESOS
  GenerarExcelProdPesos() {
    let workbookProdPesos = new Workbook();
    let worksheetProdPesosUno = workbookProdPesos.addWorksheet("Ventas en Pesos Fecha y Localidad");
    let worksheetProdPesosDos = workbookProdPesos.addWorksheet("Ventas en Pesos Por Fecha");
    let worksheetProdPesosTres = workbookProdPesos.addWorksheet("Ventas en Pesos Por Localidad");

    let headerProdPesosUno = ["Id General", "Año", "Mes", "IdProducto", "Producto", "Presentacion", "IdLocalidad", "Localidad", "VentasEnPesos"];
    let headerProdPesosDos = ["Id General", "Año", "Mes", "IdProducto", "Producto", "Presentacion", "VentasEnPesos"];
    let headerProdPesosTres = ["Id General", "IdProducto", "Producto", "Presentacion", "IdLocalidad", "Localidad", "VentasEnPesos"];

    worksheetProdPesosUno.addRow(headerProdPesosUno);
    worksheetProdPesosDos.addRow(headerProdPesosDos);
    worksheetProdPesosTres.addRow(headerProdPesosTres);

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1'].map(key => {
      worksheetProdPesosUno.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetProdPesosUno.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1'].map(key => {
      worksheetProdPesosDos.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetProdPesosDos.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
      worksheetProdPesosTres.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheetProdPesosTres.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    worksheetProdPesosUno.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }, { width: 30, key: 'G' }, { width: 30, key: 'H' }, { width: 30, key: 'I' }];

    worksheetProdPesosDos.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }, { width: 30, key: 'G' }];

    worksheetProdPesosTres.columns = [{ width: 30, key: 'A' }, { width: 30, key: 'B' }, { width: 30, key: 'C' }, { width: 30, key: 'D' },
    { width: 30, key: 'E' }, { width: 30, key: 'F' }, { width: 30, key: 'G' }];

    worksheetProdPesosUno.autoFilter = 'A1:I1';
    worksheetProdPesosDos.autoFilter = 'A1:G1';
    worksheetProdPesosTres.autoFilter = 'A1:G1';

    for (let FilaDatosProdPesosUno of this.InfoProdPesosUno) {
      let TempDatosProdPesosUno = [];

      TempDatosProdPesosUno.push(this.ConversionStringNumeros(FilaDatosProdPesosUno['IdMain']))
      TempDatosProdPesosUno.push(this.ConversionStringNumeros(FilaDatosProdPesosUno['IdAno']))
      TempDatosProdPesosUno.push(this.ConversionFechaString(FilaDatosProdPesosUno['IdMes']))
      TempDatosProdPesosUno.push(this.ConversionNull(FilaDatosProdPesosUno['IdProducto']))
      TempDatosProdPesosUno.push(this.ConversionNull(FilaDatosProdPesosUno['DSCRPCION']))
      TempDatosProdPesosUno.push(this.ConversionNull(FilaDatosProdPesosUno['Presentacion']))
      TempDatosProdPesosUno.push(FilaDatosProdPesosUno['IdSector'])
      TempDatosProdPesosUno.push(FilaDatosProdPesosUno['DescripcionSector'])
      TempDatosProdPesosUno.push(this.ConversionStringNumeros(FilaDatosProdPesosUno['VentasPesos']))

      worksheetProdPesosUno.addRow(TempDatosProdPesosUno);
    }

    for (let FilaDatosProdPesosDos of this.InfoProdPesosDos) {
      let TempDatosProdPesosDos = [];

      TempDatosProdPesosDos.push(this.ConversionStringNumeros(FilaDatosProdPesosDos['IdMain']))
      TempDatosProdPesosDos.push(this.ConversionStringNumeros(FilaDatosProdPesosDos['IdAno']))
      TempDatosProdPesosDos.push(this.ConversionFechaString(FilaDatosProdPesosDos['IdMes']))
      TempDatosProdPesosDos.push(this.ConversionNull(FilaDatosProdPesosDos['IdProducto']))
      TempDatosProdPesosDos.push(this.ConversionNull(FilaDatosProdPesosDos['DSCRPCION']))
      TempDatosProdPesosDos.push(this.ConversionNull(FilaDatosProdPesosDos['Presentacion']))
      TempDatosProdPesosDos.push(this.ConversionStringNumeros(FilaDatosProdPesosDos['VentasPesos']))

      worksheetProdPesosDos.addRow(TempDatosProdPesosDos);
    }

    for (let FilaDatosProdPesosTres of this.InfoProdPesosTres) {
      let TempDatosProdPesosTres = [];

      TempDatosProdPesosTres.push(this.ConversionStringNumeros(FilaDatosProdPesosTres['IdMain']))
      TempDatosProdPesosTres.push(this.ConversionNull(FilaDatosProdPesosTres['IdProducto']))
      TempDatosProdPesosTres.push(this.ConversionNull(FilaDatosProdPesosTres['DSCRPCION']))
      TempDatosProdPesosTres.push(this.ConversionNull(FilaDatosProdPesosTres['Presentacion']))
      TempDatosProdPesosTres.push(FilaDatosProdPesosTres['IdSector'])
      TempDatosProdPesosTres.push(FilaDatosProdPesosTres['DescripcionSector'])
      TempDatosProdPesosTres.push(this.ConversionStringNumeros(FilaDatosProdPesosTres['VentasPesos']))

      worksheetProdPesosTres.addRow(TempDatosProdPesosTres);
    }

    let rowIndexProdPesos = 1
    for (rowIndexProdPesos; rowIndexProdPesos <= worksheetProdPesosUno.rowCount; rowIndexProdPesos++) {
      worksheetProdPesosUno.getRow(rowIndexProdPesos).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndexProdPesos = 1
    for (rowIndexProdPesos; rowIndexProdPesos <= worksheetProdPesosDos.rowCount; rowIndexProdPesos++) {
      worksheetProdPesosDos.getRow(rowIndexProdPesos).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    rowIndexProdPesos = 1
    for (rowIndexProdPesos; rowIndexProdPesos <= worksheetProdPesosTres.rowCount; rowIndexProdPesos++) {
      worksheetProdPesosTres.getRow(rowIndexProdPesos).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }

    let NombreXlsxProdPesos = "Numero de Ventas en Pesos Durante los Ultimos Seis Meses"
    workbookProdPesos.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, NombreXlsxProdPesos + '.xlsx');
    });
  }
}