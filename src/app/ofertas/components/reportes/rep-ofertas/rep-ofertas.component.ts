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
  fechaDesde  : any = '0';
  fechaHasta  : any = '0';
  idOferta    : string = '';
  Producto    : string = '0';
  estadoOferta: string = '0';

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
  idEstadoOferta:any='0'
  ArrayEstadoOferta: any[] = []
  keyWordEstado: string ="DSCRPCION_ESTADO"

  ValidaDescarga: Boolean = true
  ValidaConsulta:string =''
  txtValidaCons:string =''

  
  constructor(private servicioValorOferta: ValorarofertaService) { }

  ngOnInit(): void {
    
    this.ValidaConsulta = '1';
    this.txtValidaCons = 'No se encuentran registros segun los filtros utilizados, favor valida tu información';
    this.cargarEstadoOferta();
    this.CargaProductos();
  
  }
 
  selectProducto(producto:any) {
    this.idProducto=producto.id_producto;
   }

   LimpiaProducto() {
    this.idProducto = "";
    
  }

  CargaProductos() {
    //lista Productos
  this.servicioValorOferta.ConsultaProductos('1').subscribe(Resultado => {
    this.ArrayProductos = Resultado;

    console.log(this.ArrayProductos);
 })
 }


  obtenerSelectEstadoOferta(item: any) {
    this.idEstadoOferta = item.CD_ESTDO
   
  }
  cargarEstadoOferta() {
    //lista estadoOferta
    this.servicioValorOferta.ConsultaEstado('1').subscribe(Resultado => {
      this.ArrayEstadoOferta = Resultado;
       

      console.log(this.ArrayEstadoOferta);
    })

  }
  // selectIdOferta(item: any) {
  //   this.idOferta = item.cd_cnsctvo
   
  // }
  // cargarIdOferta() {
  //   //lista estadoOferta
  //   this.servicioValorOferta.ConsultaEstado('1').subscribe(Resultado => {
  //     this.ArrayIdOferta = Resultado;
       

  //     console.log(this.ArrayIdOferta);
  //   })

  // }



  //botones principales
  buscar() {
    var idoferta = '0'
    if(this.idOferta == ''){
      idoferta = '0'
    }else{
      idoferta = this.idOferta
    }
    const busquedaDatos = {
      UsuCodig: 0,
      Producto: 0,
      cd_cnsctvo:0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: this.fechaDesde,
      VigenciaHasta: this.fechaHasta,
      IdEstado_Oferta: this.idEstadoOferta,
      CD_RGION: 0,
      CD_MNCPIO: 0
    }
    console.log(busquedaDatos)
  
    this.servicioValorOferta.BusquedaOferta('2', idoferta, this.idProducto, this.idProductor, busquedaDatos).subscribe(Resultado => {

      console.log(Resultado);

      if (Resultado.length > 0) {
        this.resultados = Resultado;
        this.respuesta = '';
        this.ValidaDescarga = false;
        this.ValidaConsulta ='2'
      } else {
        this.respuesta = 'No hay resultados.';
        
      }
    });
    
  }

  limpiar() {
    this.idOferta = '';
    this.estadoOferta = '';
    this.Producto = '';
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
      worksheet.autoFilter = 'A1:E1';
      for (let fila of this.resultados) {
        let temp = []
        temp.push(fila["cd_cnsctvo"])
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


