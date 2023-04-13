import { Component, OnInit } from '@angular/core';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { ReporteService } from 'src/app/core/reporte.service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';



@Component({
  selector: 'app-rep-ofertas',
  templateUrl: './rep-ofertas.component.html',
  styleUrls: ['./rep-ofertas.component.css']
})
export class RepOfertasComponent implements OnInit {
  fechaDesde  : any = '';
  fechaHasta  : any = '';
  idOferta    : any = '';
  producto    : string = '';
  estadoOferta: string = '';

  hayOferta: string = '';
  resultados: any[] = [];
  respuesta: string = '';

  idProducto: string = '0'
  idProductor: string = '0'

  //ID OFERTA AUTOCOMPLETE
  ArrayIdOferta: any[] = []
  KeyWordIdOferta: any = ''


  //PRODUCTOS autocomplete
  ArrayProductos: any[] = []
  keyWordProductos: any = 'des_producto'

  //Estado oferta
  ArrayEstadoOferta: any[] = []
  keyWordEstado: string ="DSCRPCION_ESTADO"

  ValidaDescarga: Boolean = true
  ValidaConsulta:string =''
  txtValidaCons:string =''

  
  constructor(private servicioValorOferta: ValorarofertaService) { }

  ngOnInit(): void {
    this.ValidaConsulta = '1';
    this.txtValidaCons = 'No se encuentran registros segun los filtros utilizados, favor valida tu información';
    this.cargarEstadoOferta()
    this.CargaProductos()
  }

  selectProducto(item:any) {
    this.producto=item.id_producto;
   }
  CargaProductos() {
    //lista Productos
  this.servicioValorOferta.ConsultaProductos('1').subscribe(Resultado => {
    this.ArrayProductos = Resultado;

    console.log(this.ArrayProductos);
 })
 }


  obtenerSelectEstadoOferta(item: any) {
    this.idOferta = item.CD_ESTDO
  }
  cargarEstadoOferta() {
 
    //lista estadoOferta
    this.servicioValorOferta.ConsultaEstado('1').subscribe(Resultado => {
      this.ArrayEstadoOferta = Resultado;

      console.log(this.ArrayEstadoOferta);
    })

  }


  //botones principales
  buscar() {
    let hayOfertas = '0';

    const busquedaDatos = {
      IdEstado_Oferta: this.idOferta,
      Desc_estado: this.estadoOferta,
      Producto: this.producto,
      VigenciaDesde: this.fechaDesde,
      VigenciaHasta: this.fechaHasta,
      cd_prdcto: this.idProducto,
      estadoOferta: this.estadoOferta
    }

    if (this.hayOferta != '') {
      hayOfertas = this.hayOferta;
    }
    
    console.log(busquedaDatos)
    this.servicioValorOferta.BusquedaOferta('1', hayOfertas, this.idProducto, this.idProductor, busquedaDatos).subscribe(Resultado => {

      this.resultados = Resultado;
      // this.resultados.push(this.ArrayEstadoOferta)

      console.log(this.resultados);

      if (Resultado.length > 0) {
        this.respuesta = '';
        this.ValidaDescarga = false;
        this.ValidaConsulta ='2'
        console.log(this.respuesta)
      } else {
        this.respuesta = 'No hay resultados.';
        
      }
    });
  }




  descargar() {
    return console.log('descargando')
  }

  limpiar() {
    this.idOferta = '';
    this.estadoOferta = '';
    this.producto = '';
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.resultados = [];
    this.ValidaDescarga = true;


    console.log("limpia")

  }

  GenerarExcel() {
    if (this.resultados.length > 0) {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Reporte Ofertas");

      let header = ["Id Oferta",
        "Estado de la oferta",
        "Producto",
        "Fecha desde",
        "Fecha hasta"
      ];
      worksheet.addRow(header);
      ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'].map(key => {
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
        { width: 15, key: 'A' }, { width: 25, key: 'B' }, { width: 25, key: 'C' }, { width: 25, key: 'D' }, { width: 25, key: 'E' }
      ];
      worksheet.autoFilter = 'A1:F1';
      for (let fila of this.resultados) {
        let temp = []
        temp.push(fila["IdEstado_Oferta"])
        temp.push(fila["Desc_estado"])
        temp.push(fila["Producto"])
        temp.push(fila["VigenciaDesde"])
        temp.push(fila["fechaHasta"])
        worksheet.addRow(temp)
      }
      let fname = "Reporte ofertas";
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname + '.xlsx');
        console.log('generando...')
      });
    }
  }

}


