import { Component, OnInit } from '@angular/core';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';



@Component({
  selector: 'app-rep-ofertas',
  templateUrl: './rep-ofertas.component.html',
  styleUrls: ['./rep-ofertas.component.css']
})
export class RepOfertasComponent implements OnInit {
  fechaDesde  : any = 0;
  fechaHasta  : any = 0;
  IdOferta    : any = '';
  Producto    : string = '';
  estadoOferta: string = '';

  Arrayresultados: any[] = [];
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
  IdEstadoOferta:any='0'
  ArrayEstadoOferta: any[] = []
  keyWordEstado: string ="DSCRPCION_ESTADO"

  ValidaDescarga: Boolean = true
  ValidaConsulta:string =''
  txtValidaCons:string =''
  resultado:any='';
  
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
    this.idProducto= '0';
    this.Producto = '';
    
  }
 CargaProductos() {
    //lista Productos
  this.servicioValorOferta.ConsultaProductos('1').subscribe(Resultado => {
    this.ArrayProductos = Resultado;

    console.log(this.ArrayProductos);
 })
 }

 LimpiaEstadoOferta() {
  this.IdEstadoOferta = '';
}
  obtenerSelectEstadoOferta(item: any) {
    this.IdEstadoOferta = item.CD_ESTDO
   
  }
  cargarEstadoOferta() {
    //lista estadoOferta
    this.servicioValorOferta.ConsultaEstado('1').subscribe(Resultado => {
      this.ArrayEstadoOferta = Resultado;
      console.log(this.ArrayEstadoOferta);
    })

  }
 
  buscar(){   
    var cd_producto='0'
    var idoferta='0'
    var idestadooferta='0'
    if(this.idProducto=='' ||this.idProducto=='0'){
      cd_producto='0'
    }else{
      cd_producto=this.idProducto
    }
    if(this.IdOferta=='' ||this.IdOferta== null){
      idoferta='0'
    }else{
      idoferta=this.IdOferta
    }
     if(this.IdEstadoOferta=='0'||this.IdEstadoOferta=='' ||this.IdEstadoOferta==null ||this.IdEstadoOferta==undefined){
      idestadooferta='0'
    }else{
      idestadooferta=this.IdEstadoOferta    
    }
    const body={
      CODIGO_OFERTA:this.IdEstadoOferta,
      Condicion_Entrega:0, 
      ESTADO_OFERTA:0,
      Empaque:0, 
      FECHA_ENTREGA:0,
      FECHA_RECOGIDA:0, 
      ID:0,
      PRODUCTOS_ADICIONALES:0 ,
      Porcentaje_descuento_lider:0,
      Producto:0,
      Productor: 0,
      SECTOR:0,
      TIPO_OFERTA:0, 
      Tamano:0, 
      Tipo_comisión_grupal:0, 
      Tipo_comisión_individual:0, 
      Unidades:0,
      VIGENCIA_DESDE:this.fechaDesde,
      VIGENCIA_HASTA: this.fechaHasta,
      Valor_Total_Oferta:0, 
      Valor_Unidad_productor: 0,
      cantidad_grupos: 0,
      maximo_personas_grupo: 0,
      tipo_descuento_grupal: 0,
      valor_arranque_lider:0, 
      valor_domicilio_grupal:0, 
      vlor_cmsion_grpal:0,
      vlor_cmsion_indvdual:0,
      vlor_domicilio_indvdual:0,
      vlor_final_participante:0,
      vlor_fnal_indvdual:0,
      fcha_vig_ini:0,
      fcha_vig_fin:0
    }
    console.log(body)
    this.servicioValorOferta.ConscReporteOfertas('2',idoferta,idestadooferta,cd_producto,body).subscribe(Resultado=>{
      console.log(Resultado)
      if (Resultado.length > 0) {
        this.Arrayresultados = Resultado;
        this.respuesta = '';
        this.ValidaDescarga = false;
        this.ValidaConsulta ='2'
        console.log(this.Arrayresultados)

        } else {
              
        this.Arrayresultados=[]
        this.ValidaConsulta='1'
        this.respuesta = 'No hay resultados.';
        }
    })
  }

  validarResultado(resultado: any): boolean {
    return resultado.CODIGO_OFERTA != null && resultado.ESTADO_OFERTA != null &&
           resultado.Producto != null && resultado.VIGENCIA_DESDE != null &&
           resultado.VIGENCIA_HASTA != null;
  }
  limpiar() {
  // location.reload();
    this.IdOferta = '';
    this.estadoOferta = '';
    this.Producto = '';
    this.fechaDesde = 0;
    this.fechaHasta = 0;
    this.Arrayresultados = [];
    this.ValidaDescarga = true;
    this.ValidaConsulta='1';
    this.respuesta='';

    this.idProducto= '0'
    this.idProductor='0'
    // this.LimpiaEstadoOferta;
    // this.LimpiaProducto;
    
    console.log(this.fechaDesde)
   
    console.log("limpia")
  
  }

  GenerarExcel() {
    if (this.Arrayresultados.length > 0) {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Reporte Ofertas");

      let header = [
"CODIGO OFERTA",
"Condicion Entrega" ,
"ESTADO OFERTA",
"Empaque",
"FECHA ENTREGA", 
"FECHA RECOGIDA", 
"ID" ,
"PRODUCTOS ADICIONALES",
"Porcentaje descuento lider", 
"Producto",
"Productor", 
"SECTOR" ,
"TIPO OFERTA", 
"Tamano" ,
"Tipo comisión grupal",
"Tipo comisión individual", 
"Unidades" ,
"VIGENCIA DESDE", 
"VIGENCIA HASTA" ,
"Valor Total Oferta",
"Valor Unidad productor", 
"cantidad grupos",
"maximo personas grupo", 
"tipo descuento grupal" ,
"valor arranque lider" ,
"valor domicilio grupal", 
"valor comsion grupal" ,
"valor comsion indvdual",
"valor domicilio indvdual",
"valor final participante",
"Valor final individual",

      ];
      worksheet.addRow(header);
      ['A1', 'B1', 'C1', 'D1', 'E1','F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'S1', 'T1','U1','V1',
      'W1','X1','Y1','Z1','AA1','AB1','AC1','AD1','AE1'].map(key => {
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
        { width: 15, key: 'A' }, { width: 25, key: 'B' }, { width: 25, key: 'C' }, { width: 25, key: 'D' }, { width: 25, key: 'E' },{ width: 15, key: 'F' }, { width: 25, key: 'G' }, { width: 25, key: 'H' }, { width: 15, key: 'I' }, { width: 25, key: 'J' },
        { width: 15, key: 'K' }, { width: 25, key: 'L' }, { width: 25, key: 'M' }, { width: 25, key: 'N' }, { width: 25, key: 'O' },{ width: 15, key: 'P' }, { width: 25, key: 'Q' }, { width: 25, key: 'R' }, { width: 25, key: 'S' }, { width: 25, key: 'T' },
        { width: 15, key: 'U' }, { width: 25, key: 'V' }, { width: 25, key: 'W' }, { width: 25, key: 'X' }, { width: 25, key: 'Y' },{ width: 15, key: 'Z' }, { width: 25, key: 'AA' }, { width: 25, key: 'AB' }, { width: 25, key: 'AC' }, { width: 25, key: 'AD' },
        { width: 15, key: 'AE' }
      ];
      worksheet.autoFilter = 'A1:AE1';
      for (let fila of this.Arrayresultados) {
        let temp = []
        // temp.push(fila["CODIGO_OFERTA"])
        // temp.push(fila["ESTADO_OFERTA"])
        // temp.push(fila["Producto"])
        // temp.push(fila["VIGENCIA_DESDE"])
        // temp.push(fila["VIGENCIA_HASTA"])
        temp.push(fila["CODIGO_OFERTA"])
        temp.push(fila["Condicion_Entrega"])
        temp.push(fila["ESTADO_OFERTA"])
        temp.push(fila["Empaque"])
        temp.push(fila["FECHA_ENTREGA"])
        temp.push(fila["FECHA_RECOGIDA"])
        temp.push(fila["ID"])
        temp.push(fila["PRODUCTOS_ADICIONALES"])
        temp.push(fila["Porcentaje_descuento_lider"])
        temp.push(fila["Producto"])
        temp.push(fila["Productor"])
        temp.push(fila["SECTOR"])
        temp.push(fila["TIPO_OFERTA"])
        temp.push(fila["Tamano"])
        temp.push(fila["Tipo_comisión_grupal"])
        temp.push(fila["Tipo_comisión_individual"])
        temp.push(fila["Unidades"])
        temp.push(fila["VIGENCIA_DESDE"])
        temp.push(fila["VIGENCIA_HASTA"])
        temp.push(fila["Valor_Total_Oferta"])
        temp.push(fila["Valor_Unidad_productor"])
        temp.push(fila["cantidad_grupos"])
        temp.push(fila["maximo_personas_grupo"])
        temp.push(fila["tipo_descuento_grupal"])
        temp.push(fila["valor_arranque_lider"])
        temp.push(fila["valor_domicilio_grupal"])
        temp.push(fila["vlor_cmsion_grpal"])
        temp.push(fila["vlor_cmsion_indvdual"])
        temp.push(fila["vlor_domicilio_indvdual"])
        temp.push(fila["vlor_final_participante"])
        temp.push(fila["vlor_fnal_indvdual"])
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


