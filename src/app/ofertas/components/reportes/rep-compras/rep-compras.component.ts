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
  LimpiaSector(Sector: String){
    this.SectorSelec = "" +Sector;
  }


//William
ConsultaEstadoPago() {
  this.serviciosoferta.ConsultaCompraPagos('2').subscribe(ResultCons => {
    this.DataEstadoPago = ResultCons
    this.keywordEsPago = 'descripcion';
  })
}
selectEstadoPago(sector: any) {
  this.SelectorEstPago = sector.codigo;
}
LimpiaEstadoPago(EsPago: String){
  this.SelectorEstPago = "" +EsPago;
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
LimpiaEstadoCompra(EsCompra: String){
  this.SelectorEstComra = "" +EsCompra;
}
////////////////////////



  BusquedaGen() {
    var validaofer = '0';
    var validasec = '0';
    var validaCompra = '0';
    var validaPago = '0';
    if (this.OferFiltro == '') {
      validaofer = '0';
    }
    else {
      validaofer = this.OferFiltro;
    }
    if (this.SectorSelec == '') {
      validasec = '0';
    }
    else {
      validasec = this.SectorSelec;
    }
    if(this.SelectorEstComra == ''){
      validaCompra = '0';
    }else{
      validaCompra = this.SelectorEstComra;
    }
    if(this.SelectorEstPago == ''){
      validaPago = '0';
    }else{
      validaPago = this.SelectorEstPago;
    }
    this.serviciosreportes.ConsultaComprasXOfer('1', validaofer, validasec, validaCompra, validaPago).subscribe(Resultcons => {   
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
    this.EstadoPago = '';
    this.EstadoCompra = '';
    this.Sector = '';
    this.SectorSelec = '';
    this.OferFiltro = '';
    this.ValidaConsulta = '1';
    this.ValidaDescarga = true;
    this.DataConsulta = [];
  }

  DetalleCompra(compra: any, modaldetalle: any) {
    console.log(compra)
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
      let header = ["Oferta", "Nombre sector", "Estado compra", "Estado pago", "Pedido", "Producto", "Unidades", "Nombre cliente", "Apellido cliente", "Dirección cliente", "Contacto cliente", "Observaciones", "Tipo compra", "Adicionales", "Valor", "Tipo de pago", "Coordenadas", "Nombre conductor", "Telefono conductor", "Placa"];
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
        { width: 15, key: 'M' }, { width: 30, key: 'N' }, { width: 15, key: 'O' }, { width: 30, key: 'P' }, { width: 35, key: 'Q' }, { width: 30, key: 'R' }, { width: 20, key: 'S' }, { width: 10, key: 'S' }
      ];
      worksheet.autoFilter = 'A1:S1';
      for (let fila of this.DataConsulta) {
        let temp = []
        temp.push(fila['CD_CNSCTVO'])
        temp.push(fila['NOM_SECTOR'])
        temp.push(fila['estado_compras'])
        temp.push(fila['estado_pago'])
        temp.push(fila['COD_PEDIDO'])
        temp.push(fila['Producto'])
        temp.push(fila['unidadesEntregar'])
        temp.push(fila['NOMBRES_PERSONA'])
        temp.push(fila['APELLIDOS_PERSONA'])
        temp.push(fila['DRCCION'] + fila["CMPLMNTO_DRRCCION"])
        temp.push(fila['CELULAR_PERSONA'])
        temp.push(fila['observacionesCliente'])
        temp.push(fila['descTipoCompra'])
        temp.push(fila['topping'])
        temp.push(fila['Vlor_PagarForm'])
        temp.push(fila['descTipoPago'])
        temp.push(fila['COORDENADAS_ENTR'])
        temp.push(fila['NMBRE_CNDCTOR'])
        temp.push(fila['TEL_CNDCTOR'])
        temp.push(fila['PLCA'])
        worksheet.addRow(temp)
      }
      let fname = "Reporte compras";
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname + '.xlsx');
      });
    }
  }

}
