import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/reporte.service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-rep-compras',
  templateUrl: './rep-compras.component.html',
  styleUrls: ['./rep-compras.component.css']
})

export class RepComprasComponent implements OnInit {

  constructor(private serviciosoferta: ValorarofertaService,
    private serviciosreportes: ReporteService,
    private modalservices: NgbModal,
    public cookies: CookieService) { }

  //cookis
  IdUsuarioCooki: string = '';

  //Oferta
  Filacompra: any = [];
  DataConsulta: any = [];
  ValidaDescarga: boolean = true;
  NumeroRegistros: string = '0 registros';
  ArregloUnidadesOferta: any = [];

  //Filtros
  OferFiltro: string = '';

  DataSectores: any = [];
  keywordSec: string = '';
  SectorSelec: string = '';
  Sector: string = '';

  DataEstadoPago: any = [];
  keywordEsPago: string = '';
  SelectorEstPago: string = '';
  EstadoPago: string = '';

  DataEstadoCompra: any = [];
  keywordEsCompra: string = '';
  SelectorEstComra: string = '';
  EstadoCompra: string = '';

  FechaIniCom: any = "";
  FechaFinCom: any = "";

  //Modal
  Respuesta: string = '';

  ngOnInit(): void {
    this.IdUsuarioCooki = this.cookies.get('IDU');
    this.CargarInformacionIncial();
  }

  CargarInformacionIncial() {
    this.ConsultaSectores();
    this.ConsultaEstadoPago();
    this.ConsultaEstadoCompra();
  }

  // FILTRO SECTOR
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

  // FILTRO ESTADO PAGO
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

  // FILTRO ESTADO COMPRA
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


  //BTN BUSCAR LA CONSULTA REPORTE
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

    const body = {
      fcha_compra_ini: AuxFechaComp,
      fcha_compra_fin: AuxFechaEntre
    }

    this.serviciosreportes.consAdminReporteVentas('1', validaofer, validasec, validaCompra, validaPago, body).subscribe(Resultcons => {
      this.NumeroRegistros = Resultcons.length.toString() + ' Registros';
      if (Resultcons.length > 0) {

        this.ValidaDescarga = false;
        this.DataConsulta = Resultcons;

        for (var i = 0; Resultcons.length > i; i++) {
          if (Resultcons[i].ADICIONALES != undefined && Resultcons[i].ADICIONALES != null) {
            var aux = Resultcons[i].ADICIONALES.split('|');
            var adicio = '';
            for (var o = 0; aux.length > o; o++) {
              adicio = aux[o] + '<br>' + adicio;
            }
            this.DataConsulta[i].ADICIONALES = adicio;
          }
        }
      }
      else {
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
    this.ValidaDescarga = true;
    this.DataConsulta = [];
    this.FechaIniCom = '0';
    this.FechaFinCom = '0';
  }

  //BTN DETALLE DE LA COMPRA
  DetalleCompra(compra: any, modaldetalle: any) {
    this.modalservices.open(modaldetalle, { size: "lg" })
    this.Filacompra = compra;
  }

  //BTN GENERAL EXCEL
  GeneraExcel() {

    if (this.DataConsulta.length > 0) {

      for (var i = 0; this.DataConsulta.length > i; i++) {
        if (this.DataConsulta[i].ADICIONALES != undefined && this.DataConsulta[i].ADICIONALES != null) {
          var aux = this.DataConsulta[i].ADICIONALES.split('<br>');
          var adicio = '';
          for (var o = 0; aux.length > o; o++) {
            adicio = aux[o] + '\n' + '\n' + adicio;
          }
          this.DataConsulta[i].ADICIONALES = adicio;
        }
      }

      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Reporte compras");

      let header = [
        "Código de compra",
        "id oferta",
        "Tipo de oferta",
        "Nombre completo",
        "Direccion entrega",
        "Coordenadas de entrega",
        "Celular",
        "Email",
        "sector",
        "Producto a entregar",
        "Fecha compra",
        "Fecha entrega",
        "Estado compra",
        "Código grupo lider",
        "Número referidos",
        "Nombre referidos",
        "Código de registro",
        "Nombre Referidor",
        "Código de descuento general",
        "Tipo Compra",
        "Valor domicilio",
        "Valor total"];

      worksheet.addRow(header);
      ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'S1', 'T1', 'U1', 'V1'].map(key => {
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
        { width: 15, key: 'A' }, { width: 15, key: 'B' }, { width: 20, key: 'C' }, { width: 30, key: 'D' }, { width: 30, key: 'E' }, { width: 30, key: 'F' },
        { width: 20, key: 'G' }, { width: 30, key: 'H' }, { width: 20, key: 'I' }, { width: 40, key: 'J' }, { width: 20, key: 'K' }, { width: 20, key: 'L' },
        { width: 20, key: 'M' }, { width: 15, key: 'N' }, { width: 10, key: 'O' }, { width: 30, key: 'P' }, { width: 15, key: 'Q' }, { width: 30, key: 'R' },
        { width: 15, key: 'S' }, { width: 20, key: 'T' }, { width: 15, key: 'U' }, { width: 15, key: 'V' }
      ];

      worksheet.autoFilter = 'A1:W1';

      for (let fila of this.DataConsulta) {
        let temp = []
        temp.push(fila['id'])
        temp.push(fila['IdOferta'])
        temp.push(fila['DesTipoOfeta'])
        temp.push(fila['NombrePesona'])
        temp.push(fila['DireccionEntrega'])
        temp.push(fila['CoordenadasEntrega'])
        temp.push(fila['CelularPersona'])
        temp.push(fila['CorreoPersona'])
        temp.push(fila['SECTOR'])
        if (fila.Unidades != '0') {
          temp.push(fila['PRODUCTO'] + ' : ' + fila['Unidades'] + 'Und x' + fila['ValorProdcuto'] + '\n' + fila['ADICIONALES'])
        } else {
          temp.push(fila['ADICIONALES'])
        }
        temp.push(fila['FechaCompra'])
        temp.push(fila['FechaEntrega'])
        temp.push(fila['DescEstadoCompra'])
        temp.push(fila['DesGrupoLider'])
        temp.push(fila['NumReferidos'])
        temp.push(fila['NombresReferidos'])
        temp.push(fila['DesCodigoRegistro'])
        temp.push(fila['NombreReferidor'])
        temp.push(fila['CodigoDescuentoGeneral'])
        temp.push(fila['DesTipoPago'])
        temp.push(fila['TotalValorDomicilio'])
        temp.push(fila['TotalValorPago'])

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

  ProdTotal: number;
  LibrasUndTotales: number;
  LibrasTotalTotales: number;
  ArregloLibrasOferta: any = [];

  ProductoTotal(modaldetalle: any, ModalProductos: any) {
    if (this.OferFiltro == null || this.OferFiltro == undefined
      || this.OferFiltro == 'undefined' || this.OferFiltro == '' || this.OferFiltro == ' ') {
      this.Respuesta = 'El id de la oferta es obligatorio para la consulta';
      this.modalservices.open(modaldetalle, { size: "lg" })
    } else {
      this.ProdTotal = 0;
      this.LibrasUndTotales = 0;
      this.LibrasTotalTotales = 0;

      this.serviciosreportes.consAdminReporteCantTotal('1', this.OferFiltro).subscribe(Resultado => {
        this.ArregloUnidadesOferta = [];
        console.log(Resultado)
        for (var i = 0; i < Resultado.length; i++) {
          this.ArregloUnidadesOferta.push(
            {
              position: i, Producto: Resultado[i].Producto, CantidadTotal: Resultado[i].CantidadTotal,
              PesoUnid: Resultado[i].PesoUnid,
              PesoTotal: Resultado[i].PesoTotal,
              idProducto: Resultado[i].idProducto,
            });
        }

        for (var e = 0; e < this.ArregloUnidadesOferta.length; e++) {

          //SUMA TODAS LAS LIBRAS
          var AuxSum: number = 0;
          for (var tol = 0; tol < this.ArregloUnidadesOferta.length; tol++) {
            if (this.ArregloUnidadesOferta[e].idProducto == this.ArregloUnidadesOferta[tol].idProducto) {
              AuxSum = AuxSum + parseInt(this.ArregloUnidadesOferta[tol].PesoTotal);
            }
          }

          //Valida si ese producto ya esta en el arreglo de la libras
          var aux: boolean = false;
          var idAux: number = 0;

          for (var g = 0; g < this.ArregloLibrasOferta.length; g++) {
            if (this.ArregloLibrasOferta[g].idProducto == this.ArregloUnidadesOferta[e].idProducto) {
              aux= true;
              idAux = g;
            }
          }

          var splitAux = this.ArregloUnidadesOferta[e].Producto.split(' X ');
          if(aux == true){
            this.ArregloLibrasOferta[0].PesoLibras = AuxSum + ' Libras';
          }else{
            this.ArregloLibrasOferta.push({
              position: i,
              PesoLibras: AuxSum + ' Libras',
              Producto: splitAux[0],
              idProducto: this.ArregloUnidadesOferta[e].idProducto,
            });
          }

        }

        console.log(this.ArregloUnidadesOferta)

        for (var i = 0; this.ArregloUnidadesOferta.length > i; i++) {
          this.ProdTotal = this.ProdTotal + parseInt(this.ArregloUnidadesOferta[i].CantidadTotal);
          this.LibrasUndTotales = this.LibrasUndTotales + parseInt(this.ArregloUnidadesOferta[i].PesoUnid);
          this.LibrasTotalTotales = this.LibrasTotalTotales + parseInt(this.ArregloUnidadesOferta[i].PesoTotal);
        }
      })
      this.modalservices.open(ModalProductos, { size: "lg" })
    }
  }

}
