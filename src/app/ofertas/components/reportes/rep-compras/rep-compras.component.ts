import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/reporte.service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs'


@Component({
  selector: 'app-rep-compras',
  templateUrl: './rep-compras.component.html',
  styleUrls: ['./rep-compras.component.css']
})
export class RepComprasComponent implements OnInit {

  constructor(private serviciosoferta: ValorarofertaService, private serviciosreportes: ReporteService) { }

  OferFiltro: string = '';
  DataSectores: any = [];
  keywordSec: string = '';
  SectorSelec: string = '';
  Sector: string = '';
  DataConsulta: any = [];
  ValidaConsulta: string = '';
  txtValidaCons: string = '';
  ValidaDescarga: boolean = true;

  ngOnInit(): void {
    this.ValidaConsulta = '1';
    this.txtValidaCons = 'No se encuentran registros segun los filtros utilizados, favor valida tu información';
    this.ConsultaSectores();
  }

  ConsultaSectores() {
    this.serviciosoferta.ConsultaSectores('1', '0', '0', '0', '0').subscribe(ResultCons => {      
      this.DataSectores = ResultCons
      this.keywordSec = 'DSCRPCION_SCTOR';
    })
  }

  selectSector(sector: any) {
    this.SectorSelec = sector.SCTOR_OFRTA;
    console.log(this.SectorSelec)
  }

  BusquedaGen() {
    console.log(this.SectorSelec)
    var validaofer = '0';
    var validasec = '0';
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
    console.log('1', validaofer, validasec)
    this.serviciosreportes.ConsultaComprasXOfer('1', validaofer, validasec).subscribe(Resultcons => {
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
    this.Sector = '';
    this.SectorSelec = '';
    this.OferFiltro = '';
    this.ValidaConsulta = '1';
    this.ValidaDescarga = true;
    this.DataConsulta = [];
  }

  GeneraExcel() {
    if (this.DataConsulta.length > 0) {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Reporte compras " + this.DataConsulta[0].CD_CNSCTVO);
      let header = ["Oferta", "Estado", "Pedido", "Unidades", "Nombre cliente", "Apellido cliente", "Tipo compra", "Valor", "Tipo de pago", "Dirección", "Coordenadas", "Nombre conductor", "Telefono conductor", "Placa"];
      worksheet.addRow(header);
      ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1'].map(key => {
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
        { width: 10, key: 'A' }, { width: 25, key: 'B' }, { width: 10, key: 'C' }, { width: 10, key: 'D' }, { width: 20, key: 'E' }, { width: 20, key: 'F' },
        { width: 15, key: 'G' }, { width: 20, key: 'H' }, { width: 20, key: 'I' }, { width: 30, key: 'J' }, { width: 40, key: 'K' }, { width: 30, key: 'L' },
        { width: 20, key: 'M' }, { width: 20, key: 'N' }
      ];
      worksheet.autoFilter = 'A1:N1';
      for (let fila of this.DataConsulta) {
        let temp = []
        temp.push(fila['CD_CNSCTVO'])
        temp.push(fila['descEstado'])
        temp.push(fila['COD_PEDIDO'])
        temp.push(fila['unidadesEntregar'])
        temp.push(fila['NOMBRES_PERSONA'])
        temp.push(fila['APELLIDOS_PERSONA'])
        temp.push(fila['descTipoCompra'])
        temp.push(fila['Vlor_PagarForm'])
        temp.push(fila['descTipoPago'])
        temp.push(fila['DRCCION'])
        temp.push(fila['COORDENADAS_ENTR'])
        temp.push(fila['NMBRE_CNDCTOR'])
        temp.push(fila['TEL_CNDCTOR'])
        temp.push(fila['PLCA'])
        worksheet.addRow(temp)
      }
      let fname = "Reporte compras - " + this.DataConsulta[0].CD_CNSCTVO;
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname + '.xlsx');
      });
    }
  }

}
