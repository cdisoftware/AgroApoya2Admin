import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/reporte.service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-rep-compras',
  templateUrl: './rep-compras.component.html',
  styleUrls: ['./rep-compras.component.css']
})
export class RepComprasComponent implements OnInit {
  Filacompra: any = [];

  constructor(private serviciosoferta: ValorarofertaService, private serviciosreportes: ReporteService, private modalservices: NgbModal) { }

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

  ngOnInit(): void {
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

    console.log(this.FechaFinCom)

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
      FechaCompra: AuxFechaComp,
      FECHA_ENTREGA: AuxFechaEntre
    }

    this.serviciosreportes.ConsultaComprasXOfer('1', validaofer, validasec, validaCompra, validaPago, body).subscribe(Resultcons => {
      console.log(Resultcons)
      if (Resultcons.length > 0) {
        this.ValidaConsulta = '0';
        this.ValidaDescarga = false;
        this.DataConsulta = Resultcons;
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
    console.log(this.EstadoPago)
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
    // var arrayadici = this.Filacompra.topping.split('|')
    // for(var i=0; i<arrayadici.length;i++){
    //   var adicional = arrayadici[i].split(',');      
    //   var nombre = adicional[0];
    //   var cantidad = adicional[1];
    //   var total = adicional[2]
    //   this.ArregloAdicionales[i]["nombre"]=nombre;
    //   this.ArregloAdicionales[i]["cantidad"]=cantidad;
    //   this.ArregloAdicionales[i]["Valor"]=total;
    // }
    // console.log(this.ArregloAdicionales)
  }

  GeneraExcel() {
    if (this.DataConsulta.length > 0) {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Reporte compras");

        let header = ["Oferta",
        "Nombre Sector",
        "Fecha compra",
        "Estado Compra",
        "Tipo Compra",
        "Codigo Compartir",
        "Codigo lider",
        "Nombre",
        "Apellido",
        "Producto",
        "Unidades",
        "Adicionales",
        "Valor",
        "Medio de pago",
        "Estado pago",
        "Fecha entrega",
        "Direccion entrega",
        "Telefono",
        "Email",
        "Observaciones cliente"];
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
        { width: 10, key: 'A' }, { width: 25, key: 'B' }, { width: 25, key: 'C' }, { width: 25, key: 'D' }, { width: 10, key: 'E' }, { width: 30, key: 'F' },
        { width: 10, key: 'G' }, { width: 30, key: 'H' }, { width: 30, key: 'I' }, { width: 40, key: 'J' }, { width: 20, key: 'K' }, { width: 30, key: 'L' },
        { width: 15, key: 'M' }, { width: 30, key: 'N' }, { width: 30, key: 'O' }, { width: 30, key: 'P' }, { width: 30, key: 'Q' }, { width: 30, key: 'R' },
        { width: 30, key: 'S' }, { width: 30, key: 'T' }
      ];
      worksheet.autoFilter = 'A1:T1';
      for (let fila of this.DataConsulta) {
        let temp = []
        temp.push(fila['OFERTA'])
        temp.push(fila['SECTOR'])
        temp.push(fila['FECHA_COMPRA'])
        temp.push(fila['ESTADO_CARRO'])
        temp.push(fila['TIPO_USUARIO_COMPRA'])
        temp.push(fila['CODIGO_COMPARTIR'])
        temp.push(fila['CODIGO_LIDER'])
        temp.push(fila['NOMBRES_PERSONA'])
        temp.push(fila['APELLIDOS_PERSONA'])
        temp.push(fila['PRODUCTO'])
        temp.push(fila['Unidades'])
        temp.push(fila['ADICIONALES'])
        temp.push(fila['VALOR_PAGO'])
        temp.push(fila['MEDIO_PAGO'])
        temp.push(fila['ESTADO_PAGO'])
        temp.push(fila['FECHA_ENTREGA'])
        temp.push(fila['DIRECCION_ENTREGA'])
        temp.push(fila['CELULAR_PERSONA'])
        temp.push(fila['CORREO_PERSONA'])
        temp.push(fila['observaciones_cliente'])
        worksheet.addRow(temp)
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
}
