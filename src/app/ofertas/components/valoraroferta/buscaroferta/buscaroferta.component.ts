import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../../core/valoraroferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


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
  FechaOferta: string = '';
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
  IdOferta: string = '';
  mcObservacion: string = '';
  IdUsuario: string = '';
  ArrayBusqueda: any = [];
  ImagenOferta: string = ''
  //Editar Oferta
  ECaracteriza: string = '';
  EFechaRecogida: string = '';
  EJornada: string = '0';
  ArrayJornada: any = [];
  Respuesta: string = '';
  NomEstado: string = '';
  IdEstadoOferta: string = '';
  EstadoOferta: string = '';
  ImagenEstado: string = '';
  NoOferta: string = '';
  RutaImagen: string = this.SeriviciosGenerales.RecuperaRutaImagenes();
  RutaSiguiente: string = '';

  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private ServiciosValorar: ValorarofertaService,
    private modalService: NgbModal,
    public rutas: Router,
    public cookies: CookieService
  ) { }


  ngOnInit(): void {
    this.IdUsuario = this.cookies.get('IDU');
    if (this.IdUsuario == '') {
      this.rutas.navigateByUrl('');
    } else {
      this.CargaObjetosIniciales();
    }
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

  Buscar(modalBuscar: any) {
    var noferta = '0';
    this.modalService.open(modalBuscar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    const datosbusqueda = {
      UsuCodig: 0,
      Producto: 0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: this.FechaOferta,
      VigenciaHasta: 0,
      IdEstado_Oferta: this.IdEstado,
      CD_RGION: 0,
      CD_MNCPIO: 0
    }
    if (this.NoOferta != '') {
      noferta = this.NoOferta
    }
    console.log(datosbusqueda);
    console.log(noferta, this.IdProducto, this.IdProductor)
    this.ServiciosValorar.BusquedaOferta('2', noferta, this.IdProducto, this.IdProductor, datosbusqueda).subscribe(Resultado => {
      this.ArrayBusqueda = Resultado;
      if (Resultado.length > 0) {
        this.Respuesta = '';
      } else {
        this.Respuesta = 'No hay resultados.'
      }
    })


  }

  ConsultaIconoEstado() {
    this.ServiciosValorar.ConsultaEstadoOferta('1', this.IdOferta).subscribe(Resultado => {
      console.log(Resultado)
      this.EstadoOferta = Resultado[0].descripcion;
      this.ImagenEstado = this.SeriviciosGenerales.RecuperaRutaImagenes() + Resultado[0].imagen_icono;
    })
  }

  Limpiar() {
    location.reload();
  }

  selectProducto(item: any) {
    this.IdProducto = item.id_producto;
  }

  selectProductor(item: any) {
    this.IdProductor = item.codigo_persona;
  }

  selectEstado(item: any) {
    this.IdEstado = item.CD_ESTDO;
  }

  EditaOferta(modalEditar: any) {
    this.ECaracteriza = this.Caracterizacion;
    this.EFechaRecogida = this.FechaRecogida;
    this.ServiciosValorar.ConsultaJornada('1').subscribe(Resultado => {
      this.ArrayJornada = Resultado;
    })
    this.modalService.open(modalEditar, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  SelEJornada(jornada: string) {
    this.EJornada = jornada;
  }

  CerrarOferta(modalCerrar: any) {
    this.modalService.open(modalCerrar, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  AceptaCerrar(modalRespuesta: any) {
    const datosCerrar = {
      usucodig: this.IdUsuario,
      cnctivoOferta: this.IdOferta,
      ObsEstado: this.mcObservacion,
      estado: 6,
      parametro1: "",
      parametro2: "",
      parametro3: ""
    }
    console.log(datosCerrar)
    this.ServiciosValorar.ModificaEstadoOferta('3', datosCerrar).subscribe(Resultado => {
      var arrayrespuesta = Resultado.split('|');
      this.Respuesta = arrayrespuesta[1];
      this.CargaInfoOferta();
    })
    this.modalService.dismissAll();
    this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  AceptaEditar(modalRespuesta: any) {
    const DatosEditar = {
      CD_PRDCTO: '0',
      UND_EMPQUE: "0",
      CD_CNDCION: "0",
      CD_TMNO: "0",
      DSCRPCION_PRDCTO: "0",
      VR_UNDAD_EMPQUE: "0",
      CD_UNDAD: "0",
      VR_TOTAL_OFRTA: "0",
      VGNCIA_DESDE: this.EFechaRecogida,
      CD_JRNDA: this.EJornada,
      CD_RGION: "0",
      CD_MNCPIO: "0",
      UBCCION_PRCLA: "0",
      COORDENADAS_PRCLA: "0",
      USUCODIG: "0",
      ID_PRODUCTOR: '0',
      CD_CNSCTVO: this.IdOferta,
      CRCTRZCION: this.ECaracteriza,
      OBS_EDICION: "0"
    }
    console.log(DatosEditar);
    this.ServiciosValorar.EditarOfertaBusqueda('4', '0', DatosEditar).subscribe(Resultado => {
      var arrayrespuesta = Resultado.split('|');
      this.Respuesta = arrayrespuesta[1];
      this.CargaInfoOferta();
    })
    this.modalService.dismissAll();
    this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });

  }

  CargaBusqueda(seleccion: any) {
    console.log(seleccion)
    this.IdOferta = seleccion.cd_cnsctvo;
    this.modalService.dismissAll();
    this.ValidaBusqueda = '1';
    this.CargaInfoOferta();
  }

  CargaInfoOferta() {
    this.ConsultaIconoEstado();
    this.ServiciosValorar.ConsultaOferta('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      console.log(Resultado)
      this.NombreProductor = Resultado[0].Nombre_productor;
      this.DesProducto = Resultado[0].Nombre_Producto;
      this.Tamano = Resultado[0].Tamano;
      this.Presentacion = Resultado[0].Descripcion_empaque;
      this.Descripcion = Resultado[0].caracteristicas;
      this.Caracterizacion = Resultado[0].caracterizacion;
      this.ValorUnidad = Resultado[0].VR_UNDAD_EMPQUE;
      this.Unidades = Resultado[0].Unidades_disponibles;
      this.FechaRecogida = Resultado[0].fecha_recogida;
      this.Jornada = Resultado[0].Nombre_jornada;
      this.EJornada = Resultado[0].jornada;
      this.Direccion = Resultado[0].coordenadas_parcela;
      this.ValorTotal = Resultado[0].VR_TOTAL_OFRTA;
      //this.IdProducto = Resultado[0].Producto;
      this.NomEstado = Resultado[0].Nombre_estado;
      this.ImagenOferta = this.SeriviciosGenerales.RecuperaRutaImagenes() + Resultado[0].IMAGEN;

      //this.IdEstado = Resultado[0].Estado;
      this.ValidaEstados(Resultado[0].Estado);
    })
  }

  ValidaEstados(estado: string) {
    if (estado == '1' || estado == '2' || estado == '3') {
      this.ValidaBusqueda = '1'
      this.RutaSiguiente = '/conciliacion';
    } else if (estado == '4' || estado == '5') {
      this.ValidaBusqueda = '1'
      this.RutaSiguiente = '/sectorizar'
    } else if (estado == '13') {
      this.RutaSiguiente = '/transportista'
    } else if (estado == '14') {
      this.ValidaBusqueda = '1'
      this.RutaSiguiente = '/costeo'
    } else if (estado == '6' || estado == '7' || estado == '11') {
      this.ValidaBusqueda = '0'
    } else if (estado == '10') {
      this.ValidaBusqueda = '2'
    }
  }

  Enviar() {
    this.SeriviciosGenerales.CrearCookie('IDO', this.IdOferta);
    this.SeriviciosGenerales.CrearCookie('IDP', this.IdProducto);
    this.rutas.navigateByUrl('home' + this.RutaSiguiente);
  }

  LimpiarCampos(campo: string) {
    if (campo == 'pd') {
      this.IdProducto = '0';
    }
    if (campo == 'pt') {
      this.IdProductor = '0'
    }
    if (campo == 'es') {
      this.IdEstado = '0';
    }
    if (campo == 'fe') {
      this.FechaOferta = ''
    }
  }
}
