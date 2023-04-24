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
  // buscar() {
  //   var idoferta = '0'
  //   var producto='0'
  //   var estadooferta='0'
  //   var fechadesde='0'
  //   var fechahasta='0'
  //   if(this.IdOferta == ''){
  //     idoferta = '0'
  //   }else{
  //     idoferta = this.IdOferta
  //   }
  //   if(this.Producto==''){
  //     producto='0'
  //   }else{
  //     producto= this.Producto
  //   }
  //   if(this.estadoOferta==''){
  //     estadooferta='0'
  //   }else{
  //     estadooferta=this.estadoOferta
  //   }
  //   if (this.fechaDesde==''){
  //     fechadesde='0'
  //   }else{
  //     fechadesde=this.fechaDesde
  //   }
  //   if(this.fechaHasta==''){
  //     fechahasta='0'
  //   }else{
  //     fechahasta=this.fechaHasta
  //   }
    
  //   const busquedaDatos = {
  //     UsuCodig: 0,
  //     Producto: 0,
  //     cd_cnsctvo:0,
  //     NombreCompletoProductor: 0,
  //     DescripcionProducto: 0,
  //     Cd_cndcion: 0,
  //     Cd_tmno: 0,
  //     ID_EMPAQUE: 0,
  //     VigenciaDesde:this.fechaDesde,
  //     VigenciaHasta: this.fechaHasta,
  //     IdEstado_Oferta: this.IdEstadoOferta,
  //     CD_RGION: 0,
  //     CD_MNCPIO: 0
  //   }
  //   console.log(busquedaDatos)
  
  //   this.servicioValorOferta.BusquedaOferta('2', idoferta, this.idProducto, this.idProductor, busquedaDatos).subscribe(Resultado => {

  //     console.log(Resultado);

  //     if (Resultado.length > 0) {
  //       this.Arrayresultados = Resultado;
  //       this.respuesta = '';
  //       this.ValidaDescarga = false;
  //       this.ValidaConsulta ='2'
  //       console.log(this.Arrayresultados)
  //       console.log(this.IdEstadoOferta)
  //     } else {
        
  //       this.Arrayresultados=[]
  //       this.ValidaConsulta='1'
  //       this.respuesta = 'No hay resultados.';
   
  //     }
  //   });
    
  // }
  // if(this.idProducto='0'){
  //   cd_producto='0'
  // }else{
  //   cd_producto=this.idProducto
  // }
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

      let header = ["Id Oferta",
        "Estado de la oferta",
        "Producto",
        "Fecha desde",
        "Fecha hasta"
      ];
      worksheet.addRow(header);
      ['A1', 'B1', 'C1', 'D1', 'E1', ].map(key => {
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
      for (let fila of this.Arrayresultados) {
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


