import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../../core/valoraroferta.service'
import { NgbModal, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
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

  //Resumen
  DataSectores: any[];
  keywordSec: string = '';
  CodigoOferSector: any;
  VlrFletSect: any;
  DataSectorOferta: any = [];
  DataTransOferta: any = [];
  ArrayCostos: any = [];
  ValTotCosteo: string = '';
  SessionSectorSel: string = '';

  //Valoracion Resumen
  VigenDesde: string = '';
  VigenHasta: string = '';
  HoraIni: string = '';
  HoraFin: string = '';
  FechaEntrega: string = '';
  Observaciones: string = '';
  ArrayTipoOferCon: any[];
  //Valortacion Individual
  ComInvid: string = '';
  ComGrup: string = '';
  MuestraIndividual: string = '';
  MuestraGrupal: string = '';
  MuestraCantIndiv: string = '';
  VlrComicionIndividual: string = '';
  MinUnidI: string = '';
  MaxUnidI: string = '';
  VlrDomiI: string = '';
  PreFinI: string = '';

  //ValoracionGrupal
  VlrComGrup: string = '';
  MinUnidLider: string = '';
  MaxUnidLider: string = '';
  MinUnidPart: string = '';
  MaxUnidPart: string = '';
  VlrDomiG: string = '';
  PorcDescLider: string = '';
  CantGrupos: string = '';
  UnidXGrupos: string = '';
  CantComprI: string = '';
  PrecioFinLider: string = '';
  PrecioFinPart: string = '';
  //Topings
  consultaimagen: string = '';
  RutaImagenTopping: string = '';
  DataToppings: any[];

  DataOferta: any = [];
  SessionFechaRecogida: any;
  VerTopping: string = '0';

  //Tazabilidad
  Trazabilidad: any = [];
  ValidaEnvio: any = '';

  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private ServiciosValorar: ValorarofertaService,
    private modalService: NgbModal,
    public rutas: Router,
    public cookies: CookieService,
    ConfigAcord: NgbAccordionConfig
  ) {
    ConfigAcord.closeOthers = true;

  }


  ngOnInit(): void {
    this.IdUsuario = this.cookies.get('IDU');
    if (this.IdUsuario == '') {
      this.rutas.navigateByUrl('');
    } else {
      this.CargaObjetosIniciales();
    }
    this.RutaImagenTopping = this.SeriviciosGenerales.RecuperarRutasOtrasImagenes('4');
  }
  ngAfterViewInit() {

  }

  CargaObjetosIniciales() {
    //lista Productos
    this.ServiciosValorar.ConsultaProductos('1').subscribe(Resultado => {
      this.ArrayProductos = Resultado;
    })

    //lista Productor
    const datosproductor = {
      nombre_persona: ''
    }
    this.ServiciosValorar.ConsultaProductor('1', '1', datosproductor).subscribe(Resultado => {
      this.ArrayProductor = Resultado;
    })

    //ListaEstado
    this.ServiciosValorar.ConsultaEstado('1').subscribe(Resultado => {
      this.ArrayEstado = Resultado;
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
    this.ServiciosValorar.EditarOfertaBusqueda('4', '0', DatosEditar).subscribe(Resultado => {
      var arrayrespuesta = Resultado.split('|');
      this.Respuesta = arrayrespuesta[1];
      this.CargaInfoOferta();
    })
    this.modalService.dismissAll();
    this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });

  }

  CargaBusqueda(seleccion: any) {
    //console.log(seleccion)
    this.IdOferta = seleccion.cd_cnsctvo;
    this.modalService.dismissAll();
    this.ValidaBusqueda = '1';
    this.CargaInfoOferta();
    this.ConsultaSectores();
  }

  CargaInfoOferta() {
    this.ConsultaIconoEstado();
    this.ServiciosValorar.ConsultaOferta('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
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
      this.ListasResumen();
    });
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

  //William
  ArrayResumenOferta: any = [];
  AbrirPopuPResumen(ModalResumen: any, respu: any) {
    this.modalService.dismissAll();
    this.modalService.open(ModalResumen, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true, backdrop: 'static', keyboard: false });
    this.ConsultaSectores();
    this.ServiciosValorar.ConsultaMenuResumenOferta('1', respu.Tramite).subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayResumenOferta = Resultado;
    });
  }

  PopupEnvio(ModalEnvio: any, oferta: any) {
    console.log(oferta)
    this.modalService.dismissAll();
    this.Respuesta = 'Estas seguro de enviar los correos y mensajes de texto de la oferta: ' + oferta.Nombre_Producto + ' ' + oferta.COD_OFR_PUBLICO
    this.modalService.open(ModalEnvio, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true, backdrop: 'static', keyboard: false });
  }

  AceptaEnviar() {
    this.EnviaNotificaciones(this.DataSectores);
    this.modalService.dismissAll();
  }

  EnviaNotificaciones(ArraySectores: any) {
    if (ArraySectores.length > 0) {
      for (var i = 0; i < ArraySectores.length; i++) {
        alert(ArraySectores[i].ID_SCTOR_OFRTA + '/' + this.IdOferta)
        this.ServiciosValorar.EnviarSms('7', '0', this.IdOferta, ArraySectores[i].ID_SCTOR_OFRTA, '0', '0', '0').subscribe(Resultado => {
          console.log(Resultado)
        })
        this.ServiciosValorar.CorreoMasivo('1', '9', '2', this.IdOferta, ArraySectores[i].ID_SCTOR_OFRTA).subscribe(ResultCorreo => {
          console.log(ResultCorreo)
        })
      }
    }
  }

  ConsultaSectores() {
    this.ServiciosValorar.ConsultaSectoresOferta('2', this.IdOferta).subscribe(ResultConsulta => {
      if (ResultConsulta.length > 0) {
        this.keywordSec = 'DSCRPCION_SCTOR';
        this.DataSectores = ResultConsulta;
        this.ValidaEnvio == ResultConsulta[0].EnvioSms;
      }
    })
  }
  selectSector(item: any) {
    this.CodigoOferSector = item.COD_OFERTA_SECTOR;
    this.VlrFletSect = item.VLOR_FLTE_SGRDOForm;
    this.SessionSectorSel = item.ID_SCTOR_OFRTA
    this.ConsultaVigenciaOferta();
    this.ConsultaValoracionOferta();
    this.consultaToppingsOferta();
  }
  LimpiaSector() {
    this.CodigoOferSector = "";
    this.VlrFletSect = "";
    //Limpia valoracion
    this.VigenDesde = "";
    this.VigenHasta = "";
    this.HoraIni = "";
    this.HoraFin = "";
    this.FechaEntrega = "";
    this.Observaciones = "";

    this.MuestraIndividual = '0';
    this.MuestraGrupal = '0';
    this.VerTopping = '0';
  }

  ListasResumen() {
    this.ConsSectorizacion();
    this.ConsTrans();
    this.ConsCosteo();
    this.ConsultaTrazabilidad();
  }
  ConsSectorizacion() {
    this.ServiciosValorar.ConsultaSectoresOferta('1', this.IdOferta).subscribe(ResultConsulta => {
      this.DataSectorOferta = ResultConsulta;
    });
  }
  ConsTrans() {
    this.ServiciosValorar.ConsultaConductoresOferta('1', this.IdOferta).subscribe(ResultConsult => {
      this.DataTransOferta = ResultConsult;
    })
  }
  ConsCosteo() {
    this.ServiciosValorar.ConsultaCosteo('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayCostos = Resultado;
      if (Resultado.length > 0) {
        this.ValTotCosteo = '0'
        for (var a in Resultado) {
          if (Resultado[a].CD_TPO_VLOR == '1') {
            this.ValTotCosteo = (Number(this.ValTotCosteo) + Number(Resultado[a].VLOR) * Number(this.Unidades)).toString()
          } else {
            this.ValTotCosteo = (Number(this.ValTotCosteo) + Number(Resultado[a].VLOR)).toString()
          }
        }
      }
    })
  }
  ConsultaVigenciaOferta() {
    this.ServiciosValorar.ConsultaVigenciaOferta('1', this.IdOferta, this.SessionSectorSel).subscribe(ResultCons => {
      this.VigenDesde = ResultCons[0].vgncia_desde;
      this.VigenHasta = ResultCons[0].vgncia_hasta;
      this.HoraIni = ResultCons[0].hora_desde;
      this.HoraFin = ResultCons[0].hora_hasta;
      this.FechaEntrega = ResultCons[0].fcha_vgncia;
      this.Observaciones = ResultCons[0].observaciones;
    })
  }

  ConsultaValoracionOferta() {
    this.ServiciosValorar.ConsultaValoracionOferta('1', this.IdOferta, this.SessionSectorSel).subscribe(ResultCons => {
      console.log('////////////')
      console.log(ResultCons)
      this.ComInvid = ResultCons[0].Nom_tpo_cmsion_indvdual;
      this.ComGrup = ResultCons[0].Nom_tpo_cmsion_grpal;

      if (ResultCons[0].TPO_OFRTA == '1') {
        this.MuestraIndividual = '1';
        this.MuestraGrupal = '0';
        this.MuestraCantIndiv = '1';

        this.VlrComicionIndividual = ResultCons[0].vlor_cmsion_indvdual;

        this.MinUnidI = ResultCons[0].mnmo_unddes_indvdual;
        this.MaxUnidI = ResultCons[0].mxmo_unddes_indvdual;
        this.VlrDomiI = ResultCons[0].vlor_dmnclio_indvdual;
        this.PreFinI = ResultCons[0].vlor_fnal_indvdual;
      }
      else if (ResultCons[0].TPO_OFRTA == '2') {
        this.MuestraIndividual = '0';
        this.MuestraGrupal = '1';
        this.VlrComGrup = ResultCons[0].vlor_cmsion_grpal;

        this.MinUnidLider = ResultCons[0].mnmo_unddes_lider;
        this.MaxUnidLider = ResultCons[0].mxmo_unddes_lider;
        this.MinUnidPart = ResultCons[0].mnmo_unddes_prcpnte
        this.MaxUnidPart = ResultCons[0].mxmo_unddes_prcpnte;
        this.VlrDomiG = ResultCons[0].vlor_dmnclio_grpal;
        this.PorcDescLider = ResultCons[0].prcntje_dcto_lider;
        this.CantGrupos = ResultCons[0].cntdad_grpos;
        this.UnidXGrupos = ResultCons[0].mnmo_prsnas_xgrupo;
        this.CantComprI = ResultCons[0].cntdad_cmpras_indvdles;
        this.PrecioFinLider = ResultCons[0].vlor_arrnque_lider;
        this.PrecioFinPart = ResultCons[0].vlor_fnal_prtcpnte;
      }
      else if (ResultCons[0].TPO_OFRTA == 3) {
        this.MuestraIndividual = '1';
        this.MuestraGrupal = '1';
        this.MuestraCantIndiv = '1';

        this.VlrComicionIndividual = ResultCons[0].vlor_cmsion_indvdual;

        this.MinUnidI = ResultCons[0].mnmo_unddes_indvdual;
        this.MaxUnidI = ResultCons[0].mxmo_unddes_indvdual;
        this.VlrDomiI = ResultCons[0].vlor_dmnclio_indvdual;
        this.PreFinI = ResultCons[0].vlor_fnal_indvdual;


        this.VlrComGrup = ResultCons[0].vlor_cmsion_grpal;

        this.MinUnidLider = ResultCons[0].mnmo_unddes_lider;
        this.MaxUnidLider = ResultCons[0].mxmo_unddes_lider;
        this.MinUnidPart = ResultCons[0].mnmo_unddes_prcpnte
        this.MaxUnidPart = ResultCons[0].mxmo_unddes_prcpnte;
        this.VlrDomiG = ResultCons[0].vlor_dmnclio_grpal;
        this.PorcDescLider = ResultCons[0].prcntje_dcto_lider;
        this.CantGrupos = ResultCons[0].cntdad_grpos;
        this.UnidXGrupos = ResultCons[0].mnmo_prsnas_xgrupo;
        this.CantComprI = ResultCons[0].cntdad_cmpras_indvdles;
        this.PrecioFinLider = ResultCons[0].vlor_arrnque_lider;
        this.PrecioFinPart = ResultCons[0].vlor_fnal_prtcpnte;
      }
    })
  }
  visualizaImagenTopping(ModalImagen: any, imagenesAdicional: string) {
    this.modalService.open(ModalImagen, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    this.consultaimagen = this.RutaImagenTopping + imagenesAdicional;
  }
  consultaToppingsOferta() {
    this.ServiciosValorar.ConsultaToppingOfer('1', this.SessionSectorSel, this.IdOferta).subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        this.DataToppings = Resultcons;
        this.VerTopping = '1';
      }
      else {
        this.VerTopping = '0';
        this.DataToppings = [];
      }
    })
  }

  ConsultaTrazabilidad() {
    this.ServiciosValorar.ConsultaTrazabilidad('1', this.IdOferta).subscribe(Resultcons => {
      this.Trazabilidad = Resultcons;
    });
  }

  CerrarModal() {
    this.VerTopping = '0';
    this.MuestraIndividual = '0';
    this.MuestraGrupal = '0';
    this.MuestraCantIndiv = '0';
    this.modalService.dismissAll();
  }
}
