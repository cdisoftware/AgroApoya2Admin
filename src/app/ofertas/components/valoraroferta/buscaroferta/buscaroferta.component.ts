import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../../core/valoraroferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscaroferta',
  templateUrl: './buscaroferta.component.html',
  styleUrls: ['./buscaroferta.component.css']
})
export class BuscarofertaComponent implements OnInit {
  producto = 'des_producto';
  productor = 'nombre_persona';
  estado = 'DSCRPCION_ESTADO';
  ArrayProductos: any = [];
  ArrayProductor: any = [];
  ArrayEstado: any = [];
  ArrayOferta: any = [];
  Producto: string = '';
  Productor: string = '';
  IdProducto: string = '0';
  IdProductor: string = '0';
  IdEstado: string = '0';
  ValidaBusqueda: string = '0';
  //Variables Detalle Oferta
  NombreProductor: string = '';
  DesProducto: string = '';
  Tamano: string = '';
  Presentacion: string = '';
  Descripcion: string = '';
  Caracterizacion: string = '';
  ValorUnidad: string = '';
  Unidades: string = '';
  FechaRecogida: string = '';
  Jornada: string = '';
  Direccion: string = '';
  ValorTotal: string = '';

  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private ServiciosValorar: ValorarofertaService,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.CargaObjetosIniciales();
  }

  CargaObjetosIniciales() {
    //lista Productos
    this.ServiciosValorar.ConsultaProductos('1').subscribe(Resultado => {
      this.ArrayProductos = Resultado;
      console.log(this.ArrayProductos);
    })

    //lista Productor
    const datosproductor = {
      nombre_persona: ''
    }
    this.ServiciosValorar.ConsultaProductor('1', '1', datosproductor).subscribe(Resultado => {
      this.ArrayProductor = Resultado;
      console.log(this.ArrayProductor);
    })

    //ListaEstado
    this.ServiciosValorar.ConsultaEstado('1').subscribe(Resultado => {
      this.ArrayEstado = Resultado;
      console.log(this.ArrayEstado);
    })

    
    

  }

  Buscar() {
    this.ValidaBusqueda = '1';
    //ConsultaOferta Aun no depende de la consulta xque el servicio no recibe parametros necesarios
    this.ServiciosValorar.ConsultaOferta('1', '1006').subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      this.NombreProductor =  Resultado[0].Nombre_productor;
      this.DesProducto = Resultado[0].Nombre_Producto;
      this.Tamano = Resultado[0].Tamaño;
      this.Presentacion = Resultado[0].Descripción_empaque;
      this.Descripcion = Resultado[0].caracteristicas;
      this.Caracterizacion = Resultado[0].caracterizacion;
      this.ValorUnidad = Resultado[0].VR_UNDAD_EMPQUE;
      this.Unidades = Resultado[0].Unidades_disponibles;
      this.FechaRecogida = Resultado[0].fecha_recogida;
      this.Jornada = Resultado[0].Nombre_jornada;
      this.Direccion = Resultado[0].coordenadas_parcela;
      this.ValorTotal = Resultado[0].VR_TOTAL_OFRTA;
    })
    
  }

  Limpiar() {
    this.ValidaBusqueda = '0';
  }

  selectProducto(item: any) {
    this.IdProducto = item.id_producto;
    alert(this.IdProducto)
  }

  selectProductor(item: any) {
    this.IdProductor = item.codigo_persona;
  }

  selectEstado(item: any) {
    this.IdEstado = item.CD_ESTDO;
  }

  EditaOferta(modalEditar: any){
    this.modalService.open(modalEditar, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  CerrarOferta(modalCerrar: any){
    this.modalService.open(modalCerrar, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }


}
