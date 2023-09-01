import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/reporte.service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-rep-compras',
  templateUrl: './rep-compras.component.html',
  styleUrls: ['./rep-compras.component.css']
})

export class RepComprasComponent implements OnInit {
  Filacompra: any = [];

  constructor(private serviciosoferta: ValorarofertaService, private serviciosreportes: ReporteService, private modalservices: NgbModal, public cookies: CookieService) { }

  IdUsuario: string = '';

  OferFiltro: string = '';
  DataSectores: any = [];
  keywordSec: string = '';
  SectorSelec: string = '';
  Sector: string = '';
  DataConsulta: any = [];
  ValidaConsulta: string = '';
  txtValidaCons: string = '';
  ValidaDescarga: boolean = true;
  ArregloAdicionales: any = [];

  //William
  DataEstadoPago: any = [];
  keywordEsPago: string = '';
  SelectorEstPago: string = '';
  EstadoPago: string = '';


  DataEstadoCompra: any = [];
  keywordEsCompra: string = '';
  SelectorEstComra: string = '';
  EstadoCompra: string = '';


  //Fechas
  FechaIniCom: any = "";
  FechaFinCom: any = "";

  //Grilla
  Siguiente: boolean = false;

  //Factura
  DataParticipantes: any = [];
  DataLider: any = [];
  idTipoFactura: string = "";// 1 lider, 2 participante o individual

  ngOnInit(): void {
    this.IdUsuario = this.cookies.get('IDU');
    this.ValidaConsulta = '1';
    this.txtValidaCons = 'No se encuentran registros segun los filtros utilizados, favor valida tu información';
    this.ConsultaSectores();
    this.ConsultaEstadoPago();
    this.ConsultaEstadoCompra();
  }

  ConsultaSectores() {
    this.serviciosoferta.ConsultaSectores('1', '0', '0', '0', '0').subscribe(ResultCons => {
      this.DataSectores = ResultCons
      this.keywordSec = 'DSCRPCION_SCTOR';
    })
  }

  selectSector(sector: any) {
    this.SectorSelec = sector.SCTOR_OFRTA;
  }
  LimpiaSector(Sector: String) {
    this.SectorSelec = "" + Sector;
  }


  //William
  ConsultaEstadoPago() {
    this.serviciosoferta.ConsultaCompraPagos('2').subscribe(ResultCons => {
      this.DataEstadoPago = ResultCons
      this.keywordEsPago = 'descripcion';
    })
  }
  selectEstadoPago(sector: any) {
    this.SelectorEstPago = sector.codigo.toString();
  }
  LimpiaEstadoPago(EsPago: String) {
    this.SelectorEstPago = "" + EsPago;
  }




  ConsultaEstadoCompra() {
    this.serviciosoferta.ConsultaCompraPagos('1').subscribe(ResultCons => {
      this.DataEstadoCompra = ResultCons
      this.keywordEsCompra = 'descripcion';
    })
  }

  selectEstadoCompra(sector: any) {
    this.SelectorEstComra = sector.codigo;
  }
  LimpiaEstadoCompra(EsCompra: String) {
    this.SelectorEstComra = "" + EsCompra;
  }
  ////////////////////////



  BusquedaGen() {

    var validaofer = '0';
    var validasec = '0';
    var validaCompra = '0';
    var validaPago = '0';
    var AuxFechaComp = '0';
    var AuxFechaEntre = '0';
    if (this.OferFiltro == '' || this.OferFiltro == null || this.OferFiltro == undefined) {
      validaofer = '0';
    } else {
      validaofer = this.OferFiltro;
    }
    if (this.SectorSelec == '') {
      validasec = '0';
    } else {
      validasec = this.SectorSelec;
    }
    if (this.SelectorEstComra == '') {
      validaCompra = '0';
    } else {
      validaCompra = this.SelectorEstComra;
    }
    if (this.SelectorEstPago == '') {
      validaPago = '-1';
    } else if (this.SelectorEstPago != '') {
      validaPago = this.SelectorEstPago;
    } else {
      validaPago = this.SelectorEstPago;
    }
    if (this.FechaIniCom == "" || this.FechaIniCom == "0") {
      AuxFechaComp = "0";
    } else {
      AuxFechaComp = this.FechaIniCom;
    }
    if (this.FechaFinCom == "" || this.FechaFinCom == "0") {
      AuxFechaEntre = "0";
    } else {
      AuxFechaEntre = this.FechaFinCom;
    }

    console.log(this.FechaIniCom)
    console.log(this.FechaFinCom)

    const body = {
      FechaCompra: AuxFechaComp,
      FECHA_ENTREGA: AuxFechaEntre
    }

    this.serviciosreportes.ConsultaComprasXOfer('1', validaofer, validasec, validaCompra, validaPago, body).subscribe(Resultcons => {
      console.log(Resultcons)
      if (Resultcons.length > 0) {

        this.ValidaConsulta = '0';
        this.ValidaDescarga = false;
        this.DataConsulta = Resultcons;

        for (var i = 0; Resultcons.length > i; i++) {
          if (Resultcons[i].ADICIONALES != undefined && Resultcons[i].ADICIONALES != null) {
            var aux = Resultcons[i].ADICIONALES.split('|');
            var adicio = '';
            for (var o = 0; aux.length > o; o++) {
              adicio = aux[o] + '<br> <br>' + adicio;
            }

            this.DataConsulta[i].ADICIONALES = adicio;
          }
        }
      }
      else {
        this.ValidaConsulta = '1';
        this.ValidaDescarga = true;
        this.DataConsulta = [];
      }
    })
  }

  LimpiaForm() {
    this.SelectorEstPago = '';
    this.SelectorEstComra = '';
    this.EstadoPago = '';
    this.EstadoCompra = '';
    this.Sector = '';
    this.SectorSelec = '';
    this.OferFiltro = '';
    this.ValidaConsulta = '1';
    this.ValidaDescarga = true;
    this.DataConsulta = [];
    this.FechaIniCom = '0';
    this.FechaFinCom = '0';
  }

  DetalleCompra(compra: any, modaldetalle: any) {
    this.modalservices.open(modaldetalle, { size: "lg" })
    this.Filacompra = compra;
  }

  GeneraExcel() {
    
    if (this.DataConsulta.length > 0) {

      for (var i = 0; this.DataConsulta.length > i; i++) {
        if (this.DataConsulta[i].ADICIONALES != undefined && this.DataConsulta[i].ADICIONALES != null) {
          var aux = this.DataConsulta[i].ADICIONALES.split('<br> <br>');
          var adicio = '';
          for (var o = 0; aux.length > o; o++) {
            adicio = aux[o] + '\n' + adicio;
          }
          this.DataConsulta[i].ADICIONALES = adicio;
        }
      }

      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Reporte compras");

      let header = [
        "Oferta",
        "Fecha compra",
        "Nombre Sector",
        "Nombre completo",
        "Direccion entrega",
        "Telefono",
        "Email",
        "Producto Ancla",
        "Unidades",
        "Valor producto ancla",
        "Adicionales",
        "Valor domicilio",
        "Valor total",
        "Fecha entrega",
        "Observaciones cliente",
        "Medio de pago",
        "Estado pago",
        "Estado Compra",
        "Tipo Compra",
        "Codigo Compartir",
        "Codigo lider"];

      worksheet.addRow(header);
      ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'S1', 'T1'].map(key => {
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

      worksheet.columns = [
        { width: 10, key: 'A' }, { width: 15, key: 'B' }, { width: 25, key: 'C' }, { width: 25, key: 'D' }, { width: 25, key: 'E' }, { width: 20, key: 'F' },
        { width: 25, key: 'G' }, { width: 30, key: 'H' }, { width: 10, key: 'I' }, { width: 15, key: 'J' }, { width: 40, key: 'K' }, { width: 15, key: 'L' },
        { width: 15, key: 'M' }, { width: 30, key: 'N' }, { width: 30, key: 'O' }, { width: 30, key: 'P' }, { width: 30, key: 'Q' }, { width: 30, key: 'R' },
        { width: 30, key: 'S' }, { width: 30, key: 'T' }
      ];
      worksheet.autoFilter = 'A1:T1';

      for (let fila of this.DataConsulta) {
        let temp = []
        temp.push(fila['OFERTA'])
        temp.push(fila['FECHA_COMPRA'])
        temp.push(fila['SECTOR'])
        temp.push(fila['NOMBRES_PERSONA'] + ' ' + fila['APELLIDOS_PERSONA'])
        temp.push(fila['DIRECCION_ENTREGA'])
        temp.push(fila['CELULAR_PERSONA'])
        temp.push(fila['CORREO_PERSONA'])
        if (fila['Unidades'] == '0') {
          temp.push('n/a')
        } else {
          temp.push(fila['PRODUCTO'])
        }
        temp.push(fila['Unidades'])
        temp.push(fila['ValorProdcuto'])
        temp.push(fila['ADICIONALES'])
        temp.push(fila['ValorDomicilio'])
        temp.push(fila['VALOR_PAGO'])
        temp.push(fila['FECHA_ENTREGA'])
        temp.push(fila['observaciones_cliente'])
        temp.push(fila['MEDIO_PAGO'])
        temp.push(fila['ESTADO_PAGO'])
        temp.push(fila['ESTADO_CARRO'])
        temp.push(fila['TIPO_USUARIO_COMPRA'])
        temp.push(fila['CODIGO_COMPARTIR'])
        temp.push(fila['CODIGO_LIDER'])

        worksheet.addRow(temp)
      }
      let rowIndex = 1;
      for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
        worksheet.getRow(rowIndex).alignment = { vertical: 'middle', wrapText: true };
      }

      let fname = "Reporte compras";
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname + '.xlsx');
      });
    }
  }


  VerGrilla() {
    if (this.Siguiente == true) {
      this.Siguiente = false;
    } else if (this.Siguiente == false) {
      this.Siguiente = true;
    }
  }


  //Factura
  Cargadetallesfactura(data: any, modaldetalle: any) {
    this.DataLider = [];
    this.DataParticipantes = [];
    this.DataLider = data;
    if (this.DataLider.TIPO_USUARIO_COMPRA == "Lider") {
      this.idTipoFactura = "1";
      this.serviciosreportes.ConsultaParticipantesGrupo('1', data.idGrupoLider, this.IdUsuario).subscribe(ResultConst => {
        if (ResultConst.length > 0) {
          for (var i = 0; i < ResultConst.length; i++) {
            if (ResultConst[i].Vinculado == '0' && ResultConst[i].DesEstadoPago == 'Exitoso') {
              this.DataParticipantes.push(ResultConst[i]);
            } else if (ResultConst[i].Vinculado != '0') {
              this.DataParticipantes.push(ResultConst[i]);
            }
          }
          if (this.DataParticipantes.length == 0) {
            this.idTipoFactura = "2";
          }
        }
        else {
          this.DataParticipantes = [];
          this.idTipoFactura = "2";
        }
      })
    } else {
      this.idTipoFactura = "2";
      if (this.DataLider.ADICIONALES != '' && this.DataLider.ADICIONALES != null && this.DataLider.ADICIONALES != undefined) {
        this.DataLider.ADICIONALES = this.DataLider.ADICIONALES.replace("|", "<br>");
      }
    }
    this.modalservices.open(modaldetalle, { size: "md" })


  }




  DescargarDatosPdf(bandera: string) {
    this.modalservices.dismissAll();
    const doc = new jsPDF('p', 'px', 'a3');//p = 630px
    if (bandera == "1") {
      //Titulo mas lo de la imagen
      autoTable(doc, {
        styles: { fillColor: [216, 216, 216] },
        didParseCell: function (data) {
          data.cell.styles.fillColor = [255, 255, 255];
          data.cell.styles.textColor = [24, 29, 35];
          data.cell.styles.fontSize = 15;
          data.cell.styles.cellPadding = 0;
          data.cell.styles.halign = 'center';
        },

        body: [
          ['', 'Hola ' + this.DataLider.NOMBRES_PERSONA + ' esta es tu compra en agroapoya2', '']
        ],
        margin: { top: 30, bottom: 30 }
      })
      //Detalle de la compra de el lider
      autoTable(doc, {
        styles: { fillColor: [216, 216, 216] },

        didParseCell: function (data) {

          if ((data.column.index % 2) == 0) {
            data.cell.styles.fontStyle = 'bold';
          }
          data.cell.styles.halign = 'left';
          data.cell.styles.fillColor = [255, 255, 255];
          data.cell.styles.textColor = [24, 29, 35];
          data.cell.styles.cellPadding = 0;
        },
        margin: { top: 0 },
        body: [
          ['Compraste ' + this.DataLider.Unidades + ' Unidad(es) de ', this.DataLider.PRODUCTO, '   Agregaste a tu compra', this.DataLider.ADICIONALES],
          ['Tu código es:   ', this.DataLider.CODIGO_COMPARTIR, '   Tu medio de pago fue:   ', this.DataLider.MEDIO_PAGO],
          ['El estado de tu compra es:   ', this.DataLider.ESTADO_CARRO + ' - ' + this.DataLider.ESTADO_PAGO, '   A la dirección: ', this.DataLider.DIRECCION_ENTREGA]
        ]
      })
      //Resumen Compra lider
      let amount: number = parseFloat(this.DataLider.ValorProdcuto);
      let FormatMon: string = amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      autoTable(doc, {
        styles: { fillColor: [216, 216, 216] },
        columnStyles: {
          1: { cellWidth: 78 },
          2: { cellWidth: 78 },
          3: { cellWidth: 58 },
          4: { cellWidth: 58 },
          5: { cellWidth: 58 },
          6: { cellWidth: 108 },
          7: { cellWidth: 68 },
          8: { cellWidth: 119 }
        },
        didParseCell: function (data) {
          if (data.row.index === 0) {
            data.cell.styles.fillColor = [255, 255, 255];
            data.cell.styles.textColor = [24, 29, 35];
            data.cell.styles.halign = 'left';
            data.cell.styles.fontStyle = 'bold';
          } else if (data.row.index === 1) {
            data.cell.styles.fillColor = [57, 124, 151];
            data.cell.styles.textColor = [255, 255, 255];
            data.cell.styles.halign = 'center';
          } else if (data.row.index === 2) {
            data.cell.styles.halign = 'center';
          } else if (data.row.index === 3) {
            data.cell.styles.fillColor = [255, 255, 255];
            data.cell.styles.textColor = [24, 29, 35];
            data.cell.styles.halign = 'left';
            data.cell.styles.fontStyle = 'bold';
          } else if (data.row.index === 4) {
            data.cell.styles.fillColor = [57, 124, 151];
            data.cell.styles.textColor = [255, 255, 255];
            data.cell.styles.halign = 'center';
          }
        },
        margin: { top: 0 },
        body: [
          ['Tu compra', '', '', '', '', '', '', ''],
          ['Nombre', 'Teléfono', 'Producto', 'Unidades', 'Valor Producto', "Adicionales", "Estado pago", "Valor a cancelar"],
          [this.DataLider.NOMBRES_PERSONA, this.DataLider.CELULAR_PERSONA, this.DataLider.PRODUCTO, this.DataLider.Unidades, FormatMon, this.DataLider.ADICIONALES, this.DataLider.ESTADO_PAGO, this.DataLider.VALOR_PAGO],
          ['Compañeros'],
          ['Nombre', 'Teléfono', 'Producto', 'Unidades', 'Valor Producto', "Adicionales", "Estado pago", "Valor a cancelar"]
        ]
      });

      //Servicios participantes
      var calculaTotal: number = 0;
      var calculaTotalPagado: number = 0;
      this.DataParticipantes.forEach(function (respuesta: any) {
        let amount: number = parseFloat(respuesta.ValorProdcuto);
        let FormatMoneda: string = amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        if (respuesta.DesEstadoPago != "Exitoso") {
          calculaTotal += parseInt(respuesta.ValorTotal);
        } else {
          calculaTotalPagado += parseInt(respuesta.ValorTotal);
        }
        var Res = [respuesta.NombrePersona, respuesta.CelularPersona, respuesta.DesProducto, respuesta.UndsCmpradas, FormatMoneda, respuesta.DescToppings, respuesta.DesEstadoPago, respuesta.ValorTotalForm];

        autoTable(doc, {
          margin: { top: 0, bottom: 0 },
          columnStyles: {
            1: { cellWidth: 78 },
            2: { cellWidth: 78 },
            3: { cellWidth: 58 },
            4: { cellWidth: 58 },
            5: { cellWidth: 58 },
            6: { cellWidth: 108 },
            7: { cellWidth: 68 },
            8: { cellWidth: 119 }
          },
          didParseCell: function (data) {
            data.cell.styles.halign = 'center';
          },

          body:
            [
              Res
            ]
        })
      });

      //Calcula el valor a pagar del lider + el valor globar a pagar de los participantes
      if (this.DataLider.ESTADO_PAGO != "Pagado") {
        calculaTotal += (parseInt(this.DataLider.ValorProdcuto) + parseInt(this.DataLider.SumToppings))
      } else {
        calculaTotalPagado += (parseInt(this.DataLider.ValorProdcuto) + parseInt(this.DataLider.SumToppings))
      }

      //Se le da formato moneda
      let FormatMoneda: string = calculaTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });


      //Calcula el total
      autoTable(doc, {
        styles: { fillColor: [216, 216, 216] },
        columnStyles: {
          1: { cellWidth: 305 },
          2: { cellWidth: 305 }
        },
        didParseCell: function (data) {
          var rows = data.table.body;
          if (data.row.index === 0) {

            data.cell.styles.halign = 'center';
          }
        },
        margin: { top: 0 },
        body: [
          ['Total a cancelar', FormatMoneda]
        ]
      })


      //Firma
      autoTable(doc, {
        styles: { fillColor: [216, 216, 216] },
        columnStyles: {
          1: { cellWidth: 530 },
          2: { cellWidth: 100 }
        },
        didParseCell: function (data) {
          var rows = data.table.body;
          if (data.row.index === 0) {
            data.cell.styles.fillColor = [255, 255, 255];
            data.cell.styles.textColor = [24, 29, 35];
          }
        },
        margin: { top: 20 },
        body: [
          ['Firma ', '_________________________________________________________________']
        ]
      })
      doc.save('Factura Oferta ' + this.DataLider.OFERTA + '.pdf')
    } else if (bandera == "2") {
      const doc = new jsPDF('p', 'pt', 'a4');
      const options = {
        background: 'white',
        scale: 3
      };


      var DATAg = document.getElementById('htmlData_');
      if (DATAg != undefined && DATAg != null) {
        DATAg.innerHTML += '<div class="row mt-4 CentrarText"> <label class="col-2 Llave ">Firma:&nbsp;</label>  <hr class="col-8 mt-3 hrSinEstilo">  </div>';
      }


      if (DATAg != null) {
        html2canvas(DATAg, options).then((canvas) => {
          var imgDos = canvas.toDataURL('image/PNG');
          var imgPropDso = (doc as any).getImageProperties(imgDos);

          var pdfWidthDso = doc.internal.pageSize.getWidth() - 2 * 15;
          var pdfHeightDso = (imgPropDso.height * pdfWidthDso) / imgPropDso.width;

          doc.addImage(imgDos, 'PNG', 15, 15, pdfWidthDso, pdfHeightDso, undefined, 'FAST');

          doc.save('Factura Oferta ' + this.DataLider.OFERTA + '.pdf');
        })
      }
    }
  }


}
