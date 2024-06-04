import { Component, OnInit, ViewChild } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { CrearofertaService } from 'src/app/core/crearoferta.service';
import { ReporteService } from 'src/app/core/reporte.service';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-modificar-oferta-publica',
  templateUrl: './modificar-oferta-publica.component.html',
  styleUrls: ['./modificar-oferta-publica.component.css']
})
export class ModificarOfertaPublicaComponent implements OnInit {
  @ViewChild('ModalRespuesta', { static: false }) ModalMensaje: any;
  //VariablesFiltro Oferta
  ArrayOferta: any = [];
  keywordOferta: string = '';
  SelectorOferta: string = '0';
  OfertaSelect: string = '';
  Oferta: string = '';
  IdOfertaSelect: string = '';

  DataSectores: any[];
  keywordSec: string = '';
  CodigoOferSector: any;
  VlrFletSect: any;
  SessionCantSector: any;
  SessionSectorSel: any;
  IdOferta: string;
  SectorBlock: boolean = false;
  Sector: string = '';

  //SessionOferta: any;
  DataOferta: any[] = [];
  keyword: string = '';
  DataTipoOferta: any[] = []
  DataTipoComisiono: any[] = []
  MuestraValoReferencia: string = '';
  MuestraIndividual: string = '';
  MuestraGrupal: string = '';
  MuestraFijo: string = '';
  MuestraFijoI: string = '';
  MuestraPorcentaje: string = '';
  MuestraPorcentajeI: string = '';
  MuestraVigencial: string = '';
  MuestraValUnidades: string = '';
  VlReferencia: any;
  VlrComFijaI: string = '';
  MinUnidI: any;
  MaxUnidI: any;
  PreFinI: any;
  VlrDomiI: string;
  Respuesta: string = '';
  modalRespuesta: NgbModalRef | undefined;
  modalPublicar: NgbModalRef | undefined;
  SessionTipoOferta: any;
  SessionTipoComI: any;
  SessionTipoComG: any;
  VigenDesde: any;
  VigenHasta: any;
  HoraIni: any;
  HoraFin: any;
  FechaEntrega: any;
  Observaciones: any;
  VlrComPorI: string = '';
  VlrComPorG: string = '';
  VlrComFijaG: any;
  MinUnidLider: any;
  MaxUnidLider: any;
  PorcDescLider: any;
  VlrDomiG: any;
  CantGrupos: any;
  UnidXGrupos: any;
  MinUnidPart: any;
  MaxUnidPart: any;
  CantComprI: any;
  PrecioFinLider: any;
  PrecioFinPart: any;
  TipoOferta: any;
  ArrayTipoOferCon: any = [];
  ArrayTipoComICon: any = [];
  ArrayTipoComGCon: any = [];
  RutaImagen: string;
  ValidaTipoOfer: string;
  MuestraCantIndiv: string;
  MuestraBtnIndividual: string;
  MuestraBtnGrupal: string;
  MuestraBtnMixta: string;
  PubliOferObser: any;
  ValidaVigencia: string;
  ArrayCamposValida: any = []
  ValidaCam: string;
  SumaPrecios: number;
  DataValores: any[];
  ValorUni: string = '';
  ValidaToppings: string;
  DataTipotopping: { id: number; name: string; }[];
  DataTipotoppingVenta: { id: number; name: string; }[];
  DataToppings: any[];
  ValidaConsulta: string = '0';
  txtValidaCons: string = 'No se encuentran adicionales asociados a la oferta';
  DesTopp: string = '';
  VlrUniTopp: string;
  UnidMaxTopp: string = '5';
  SessionTipoTopp: string = '';
  SessionTipoToppVenta: string = '';
  ValidaTipoTopp: boolean;
  keywordTipTopp: string;
  keywordTipToppVenta: string;
  TipoTopp: string;
  TipoToppVenta: string;
  SessionFechaRecogida: any;
  UnidOferta: string = '30';
  imagenesAdicionales: string = '';
  imagenesCorreo: string = '';
  //consultaimagen: string = '';
  RutaImagenTopping: string = '';
  IsEnables: boolean = false;
  IsEnablesValor: boolean = false;
  LinkSms: string = '';
  RutaLanding: string = '';
  DataTipoDescuento: { id: number; name: string; }[];
  SessionTipoDescuento: string = '';
  ArrayTextoModifica: any = [];
  //Previsucorreo: string = '';
  //EnvioCorreo: boolean = false;
  //EnvioSms: boolean = false;
  UrlPubli: string = '';
  UrlParticipante: string = '';
  UrlParticipanteC: any;
  //UrlPubliC: any; 
  RutaImagenes: string = '';
  RutaImageneSector: string = this.SeriviciosGenerales.RecuperaRutaImagenes();


  banderaAgregarAncla: string = '1';
  banderaAgregarAdicional: string = '1';

  //Adicionales
  DescLargaAdd: string = '';
  DescCortaAdd: string = '';
  Add1: string = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  Add2: string = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  Add3: string = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  NomImagen1: string = '';
  NomImagen2: string = '';
  NomImagen3: string = '';
  ValorRefAdd: string = '';
  DescripTipoVenta: string = '';
  //#region Cupon
  ArrayDataCupon: any = [];
  keywordCupon: string = "NombreCupon";
  IdTipoCupon: string = "0";
  TipoCupon: string = "";
  DescripcionRegalo: string = "";
  //#endregion Cupon
  IndexTipoDescuento: number = -1;
  IndexTipoCupon: number = -1;


  //Cupones
  ArrayCupones: any = [];
  IdCupon: string = '';
  DescCupon: string = '';
  keywordCuponOfer: string = 'codigo_Mostrar';
  ArrayCuponesOferta: any = [];
  NumeroUsuariosCupon: string = "";

  //#region Domicilio
  ArrayDomicilio: any = [];
  keywordDomicilio: string = "";
  Domicilio: string = "";
  IdDomicilio: string = "0";

  VlrDomiIValormenora: string = "";

  ValorDomicilioGrup: string = "";
  ValorDomcilioGrupValorMenora: string = "";
  Valorapartirde: string = "";

  indexTipoDomicilio: number = 0;
  //#endregion Domicilio

  //#region AgregarTopping
  VerTipoDescripcion: string = "0";
  ArrayProductos: any = [];
  keywordProductos = '';
  ProdTipoTpp: string = "";
  IdProdTipoTopping: string = "0";
  ProductoNgModel: string = "";
  AuxIdRelacion: string = '';

  //Presentacion
  Presentacion: string = "";
  ArrayPresentaciones: any = [];
  PresentacionSelect: any = "";
  PesoPresentacion: string = '0';

  //Campesino
  ArrayCampesino: any = []
  keywordCampesino: string = 'NOMBRES_PERSONA';
  IdCampesino: string = '0';
  DesCampesino: string = ''

  //Modal Presentaciones
  UnidadesOferta: string = '30';
  MaximoUnidades: string = '5';


  ValorReal: string = "";
  ValorReferencia: string = "";
  SmsError: string = "";

  //GrillaRelacionTopping
  ArrayProdTopping: any = [];
  itemEliminar: any;
  IdToppingSelect: string = "";

  DescripcionProductoTopping: string = "";
  DescripcionPresentacion: string = "";

  //#region AgregaPresentacionesProdAncla
  UnidadesProdAncla: string = '30';
  MaxinoProdAncla: string = '5';
  PresentacionProdAncla: string = "";
  IdProductoAncla_: string = "0";
  ArrayPresentacionesProdPrincipal: any[];
  PresentacionProdAnclaSelect: any = "";
  PesoPresentacionProdAncla: string = "0";

  //Editar
  IndexPresentacionProdAncla_: number = -1;

  //PresentacionesTopping
  IdProductoTopping_: string = "0";
  ArrayPresentacionesTopping: any[];
  PresentacionToppingSelect: any = "";
  PesoPresentacionTopping: string = "0";
  PresentacionTopping: string = "0";
  //Editar
  IndexPresentacionTopping_: number = -1;

  ValorProdAncla: string = "";
  ValorReferenciaProdAncla: string = "";

  //Grilla
  ArrayPresentacionesProdAncla: any = [];
  //#endregion AgregaPresentacionesProdAncla

  //#region OfertaDirigidaA
  ArrayOfertaDirigida: any = [
    {
      Id: 1,
      Descripcion: "Registros"
    },
    {
      Id: 2,
      Descripcion: "Ventas"
    }
  ];
  OfertaDirigidaA: any;
  IdOfertaDirigidaA: string = "";
  IndexOfertaDirigidaA: number = 0;
  //#endregion OfertaDirigidaA

  sessionDescripcionOferta: string = '';
  ConfirmacionModal: string = '';
  SessionIdUsuario: any;
  seleczona: string = '0';
  DataZonas: any = [];
  keywordZonasAsignaSector: string = '';
  Cant: string = '';
  ZonaAsignaSector: string = '';
  DataSector: any;
  keywordS: string = '';
  Sectores: string;
  SessionNombreSector: any;
  ValidaMapSector: string = '0';
  UserSector: string = '';
  ImgMapaSec: string = './../../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  ValidaImgMapa: string = '0';
  SectModif: string = '';
  RespuestaImgMapa: any;
  file: FileList | undefined;
  ImagenSector: string = "";
  public respuestaImagenEnviada: any;
  public resultadoCarga: any;

  SessionCDMunicipio: any;
  SessionCDRegion: any;
  NomImagenSector: string = '';



  //#region AdminOrdenProd
  ArrayProdAdminOrden: any = [];
  ArrayPresentacionesProdSelect: any = [];
  //#endregion AdminOrdenProd

  constructor(private serviciosvaloracion: ValorarofertaService,
    private modalService: NgbModal,
    public sectoresservices: ValorarofertaService,
    public rutas: Router,
    private SeriviciosGenerales: MetodosglobalesService,
    private formatofecha: DatePipe,
    private cookies: CookieService,
    private serviciosreportes: ReporteService,
    private ServiciosOferta: CrearofertaService) { }
  geocoder = new google.maps.Geocoder();
  SessionCiudad: any;
  Sessioncoordenada: any;
  map: google.maps.Map;


  ngOnInit(): void {
    this.ConsultaOferta();
    this.ValidaVigencia = '0';
    this.ListaTipoDomicilio();
    this.ConsultaCupones();
    this.ListaProductos();
    this.LimpiaProductoTopp();
    this.CargaInfoCupon();
    this.ConsultaCiudadOferta();
    this.ConsultaSectoresOferta();
    this.ConsultaCampesino();
    this.SessionCDMunicipio = '0';
    this.SessionCiudad = '0';
    this.SessionCDRegion = '0';
    this.Cant = '';
    this.keyword = 'name';
    this.keywordSec = 'name';
    this.RutaImagenes = this.SeriviciosGenerales.RecuperaRutaImagenes();
    this.DataTipoOferta = [
      {
        id: 1,
        name: 'Individual'
      },
      {
        id: 3,
        name: 'Mixta'
      }
    ];
    this.DataTipoComisiono = [
      {
        id: 1,
        name: 'Valor Fijo'
      },
      {
        id: 2,
        name: 'Porcentaje'
      }
    ]
    this.DataTipoDescuento = [
      {
        id: 1,
        name: 'Registro'
      },
      {
        id: 2,
        name: 'Unidades'
      }
    ]
    this.DataTipotopping = []
    this.DataTipotoppingVenta = [];
    this.SessionTipoTopp = '0';
    this.SessionTipoToppVenta = '0';
    this.MuestraVigencial = '0';
    this.MuestraGrupal = '0';
    this.MuestraValoReferencia = '0';
    this.MuestraIndividual = '0';
    this.ValidaVigencia = '0';
    this.ValidaTipoOfer = '0';
    this.CantGrupos = '';
    //this.UnidXGrupos = '2';
    this.SessionCantSector = '';
    this.SessionTipoComI = '';
    this.MaxUnidI = '1';
    this.MinUnidI = '1';
    this.VlrComFijaI = '';
    this.PreFinI = '';
    this.VlReferencia = '';
    this.VlrComFijaG = '';
    this.VlrDomiG = '';
    this.VlrComPorG = '';
    this.MinUnidLider = '';
    this.MaxUnidLider = '';
    this.MinUnidPart = '';
    this.MaxUnidPart = '';
    this.PorcDescLider = '';
    this.PubliOferObser = '';
    this.VigenDesde = '';
    this.VigenHasta = '';
    this.FechaEntrega = '';

    this.DataValores = [];
    this.DataToppings = [];
    this.RutaImagen = this.SeriviciosGenerales.RecuperaRutaImagenes();
    this.RutaLanding = this.SeriviciosGenerales.RecuperarRutaVista('1');
    this.RutaImagenTopping = this.SeriviciosGenerales.RecuperarRutasOtrasImagenes('4');
    this.SessionIdUsuario = this.cookies.get('IDU');
    this.DataProducts = [];
    this.Consultatoppings();
    this.consultaProductos();
  }


  ConsultaOferta() {
    const datosbusqueda = {
      UsuCodig: 0,
      Producto: 0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: 0,
      VigenciaHasta: 0,
      IdEstado_Oferta: 0,
      CD_RGION: 0,
      CD_MNCPIO: 0
    }
    this.serviciosvaloracion.BusquedaOferta('2', this.SelectorOferta, '0', '0', datosbusqueda).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      this.keywordOferta = 'Producto';

    })
  }
  LimpiaOferta(Valor: string) {
    this.Oferta = Valor;
    this.SelectorOferta = '0';
    this.SectorBlock = false;
    this.LimpiaSector();

  }
  selectOfertaFiltro(item: any) {
    this.SelectorOferta = item.cd_cnsctvo.toString();
    this.OfertaSelect = item.Producto;
    const IdOferta = item.Producto.split(' ');
    this.IdOfertaSelect = IdOferta[0];
    this.ConsultaSectores(this.SelectorOferta)
    this.SectorBlock = true;
  }
  ConsultaSectores(sectorOferta: string) {
    this.serviciosvaloracion.ConsultaSectoresOferta('2', sectorOferta).subscribe(ResultConsulta => {
      if (ResultConsulta.length > 0) {
        this.keywordSec = 'DSCRPCION_SCTOR';
        this.DataSectores = ResultConsulta;
        this.NombreSector = this.DataSectores[0].DSCRPCION_SCTOR;
      }
    })
  }
  NombreSector: any;
  selectSector(item: any) {
    this.ValidaVigencia = '1';

    this.CodigoOferSector = item.COD_OFERTA_SECTOR;
    this.VlrFletSect = item.VLOR_FLTE_SGRDOForm;
    this.SessionCantSector = item.CNTDAD
    this.SessionSectorSel = item.ID_SCTOR_OFRTA
    this.IdOferta = item.CD_CNSCTVO;
    this.ConsultaDetalleOferta();
    this.ConsultaVigenciaOferta();
    this.consultaToppingsOferta();
    this.ConsultaValoracionOferta();
    //this.ConsultaLinks();  
    this.GrillaTextoModal();
    this.ValidaVigencia = '1';
  }

  LimpiaSector() {
    this.Sector = '';
    this.CodigoOferSector = '';
    this.VlrFletSect = '';
    this.SessionSectorSel = ''
    this.ValidaVigencia = '0'
    this.MuestraValoReferencia = '0';
    this.MuestraIndividual = '0';
    this.MuestraGrupal = '0'
  }

  AbreModalConfirmacion(template: any, item: any) {
    this.ConfirmacionModal = '¿Esta seguro de publicar la oferta ' + item.COD_OFR_PUBLICO + '-' + item.Nombre_Producto + '?';
    this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title' });
  }



  CerrarOfertaModal(template: any, item: any) {
    this.ConfirmacionModal = '¿Esta seguro de cerrar la oferta ' + item.COD_OFR_PUBLICO + '-' + item.Nombre_Producto + '?';
    this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title' });
  }

  PublicarOferta(modalRespuesta: any) {
    const datosPublica = {
      usucodig: this.SessionIdUsuario,
      cnctivoOferta: this.SelectorOferta,
      ObsEstado: "",
      estado: 10,
      parametro1: "",
      parametro2: "",
      parametro3: ""
    }
    this.serviciosvaloracion.ModificaEstadoOferta('3', datosPublica).subscribe(Resultado => {
      var arrayrespuesta = Resultado.split('|');
      this.Respuesta = arrayrespuesta[1];
      this.ConsultaDetalleOferta();
    })
    this.modalService.dismissAll();
    this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  CerrarOferta(modalRespuesta: any) {
    const datosCerrar = {
      usucodig: this.SessionIdUsuario,
      cnctivoOferta: this.SelectorOferta,
      ObsEstado: "",
      estado: 6,
      parametro1: "",
      parametro2: "",
      parametro3: ""
    }
    this.serviciosvaloracion.ModificaEstadoOferta('3', datosCerrar).subscribe(Resultado => {
      var arrayrespuesta = Resultado.split('|');
      this.Respuesta = arrayrespuesta[1];
      this.ConsultaDetalleOferta();
    })
    this.modalService.dismissAll();
    this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  ConsultaDetalleOferta() {
    this.serviciosvaloracion.ConsultaOferta('1', this.IdOfertaSelect).subscribe(ResultConsu => {
      this.DataOferta = ResultConsu;
      this.SessionFechaRecogida = this.DataOferta[0].fecha_recogida;
      this.IdProductoAncla_ = this.DataOferta[0].Producto;
    })
  }

  ConsultaCiudadOferta() {
    this.serviciosvaloracion.ConsultaCiudadOferta('1', this.SelectorOferta).subscribe(ResultadoCons => {
      this.SessionCiudad = ResultadoCons[0].Cuidad;
      this.SessionCDMunicipio = ResultadoCons[0].CD_MNCPIO;
      this.SessionCDRegion = ResultadoCons[0].CD_RGION;
      this.ConsultaZonas(this.SessionCDMunicipio, this.SessionCDRegion);
    })
  }

  ConsultaZonas(idCiudad: string, IdDepartamento: string) {
    const descripcion = {
      "Descripcion": ""
    }
    this.serviciosvaloracion.ConsZona('1', '0', idCiudad, IdDepartamento, descripcion).subscribe(ResultadoCons => {
      this.DataZonas = ResultadoCons;
      this.keywordZonasAsignaSector = 'Descripcion';
    })
  }

  ConsultaSectoresSelect(IdZona: string) {
    this.serviciosvaloracion.ConsultaSectoresEtv('1', '0', IdZona, this.SelectorOferta).subscribe(Result => {
      this.DataSector = Result;
      this.keywordS = 'DSCRPCION_SCTOR';
    })
  }

  selectZona(item: any) {
    this.seleczona = '1';
    this.ConsultaSectoresSelect(item.id);
    if (this.Cant != "" && this.Cant != "0") {
      this.seleczona = '1';
    }
  }
  LimpiaZona(result: string) {
    this.ZonaAsignaSector = result;
    this.seleczona = '0';
    this.Sectores = '';
    this.Cant = '';
  }

  ID_SCTOR_OFRTAAUX: string;
  imagen_sctorAux: string;

  selectSectores(item: any, modalmapa: any) {
    this.ConsultaUserSector(item);
    this.modalService.open(modalmapa, { size: 'lg' });
    this.ValidaMapSector = '1';
    // this.VlrFle = '';
    // this.SectSelec = item.SCTOR_OFRTA;
    this.SessionNombreSector = item.DSCRPCION_SCTOR;
    this.Sessioncoordenada = item.coordenadas;
    this.ConsultaMapaSector();
    // this.ValidaCoord = '3';
    // this.ConsultaBodegas();

    this.ID_SCTOR_OFRTAAUX = item.SCTOR_OFRTA;
    this.imagen_sctorAux = item.imagen_sctor;
  }
  LimpiaSectores(result: string) {
    this.Sector = result;
    // this.ValidaCoord = "";
    this.UserSector = "";
  }


  ConsultaMapaSector() {
    this.geocoder.geocode({ address: this.SessionCiudad }).then((result) => {
      const { results } = result;
      var bounds = new google.maps.LatLngBounds;
      var coords = this.Sessioncoordenada.split('|').map(function (data: string) {
        var info = data.split(','), // Separamos por coma
          coord = { // Creamos el obj de coordenada
            lat: parseFloat(info[0]),
            lng: parseFloat(info[1])
          };
        // Agregamos la coordenada al bounds
        bounds.extend(coord);
        return coord;
      });
      var area = new google.maps.Polygon({
        paths: coords,
        strokeColor: '#397c97',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#B1B0B0',
        fillOpacity: 0.35
      });
      this.map = new google.maps.Map(
        document.getElementById("mapCS") as HTMLElement,
        {
          zoom: 15,
          center: bounds.getCenter(),
          mapTypeId: "terrain",
        }
      );
      area.setMap(this.map);
    })

  }

  ConsultaUserSector(sector: any) {
    var selectSector = sector.SCTOR_OFRTA;
    //this.IdSectorSelect = sector.SCTOR_OFRTA;
    this.serviciosvaloracion.ConsultaNumUsuariosSector('3', selectSector).subscribe(ResultadoCons => {
      this.UserSector = ResultadoCons.toString();
    })
  }

  ConsultaVigenciaOferta() {
    this.serviciosvaloracion.ConsultaVigenciaOferta('1', this.SelectorOferta, this.SessionSectorSel).subscribe(ResultCons => {
      if (ResultCons.length > 0) {
        this.VigenDesde = ResultCons[0].vgncia_desde;
        this.VigenHasta = ResultCons[0].vgncia_hasta;
        this.FechaEntrega = ResultCons[0].fcha_vgncia;
        this.Observaciones = ResultCons[0].observaciones;
      }
    })
  }

  AbreModalConfSector(template: any) {
    this.ConfirmacionModal = '¿Esta seguro de actualizar el sector?';
    this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title' });
  }

  ActualizarSector(template: any) {
    const body = {
      cd_cnstvo: this.SelectorOferta,
      Id_sectorNuevo: this.ID_SCTOR_OFRTAAUX,
      Id_sectorViejo: this.SessionSectorSel
    }
    this.serviciosvaloracion.ActualizarSector('1', body).subscribe(Resultado => {
      this.Respuesta = Resultado;
      //this.LimpiaZona('');
      this.ConsultaSectores(this.SelectorOferta);
    })
    this.modalService.dismissAll();
    this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title' });
  }

  EditarImgMapa(Modalmapa: any, ID_SCTOR_OFRTA: string, imagen_sctor: string) {
    if (ID_SCTOR_OFRTA == '') {
      ID_SCTOR_OFRTA = this.ID_SCTOR_OFRTAAUX;
      imagen_sctor = this.imagen_sctorAux;
    }

    this.ValidaImgMapa = '0'
    this.SectModif = ID_SCTOR_OFRTA
    if (imagen_sctor != '') {
      this.ImgMapaSec = this.RutaImageneSector + imagen_sctor;
    } else {
      this.ImgMapaSec = './../../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
    }
    this.modalService.open(Modalmapa, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    this.ConsultaSectoresOferta();
  }

  ConsultaSectoresOferta() {
    this.sectoresservices.ConsultaSectoresOferta('1', this.SelectorOferta).subscribe(ResultConsulta => {
      if (ResultConsulta.length > 0) {
        this.ImagenSector = ResultConsulta[0].imagen_sctor;
        this.ValidaConsulta = '0';
      }
    })

  }

  GuardarImgMapa() {
    if (!this.ImgMapaSec.includes('SubirImagen')) {
      const datos = {
        ID_SECTOR: this.SectModif,
        NOMBRE_IMG: this.NomImagenSector
      }
      this.sectoresservices.ModificarImagenSector('3', datos).subscribe(Resultado => {
        this.modalService.dismissAll();
        this.ConsultaSectoresOferta();
      })
      this.ValidaImgMapa = '0';
    } else {
      this.ValidaImgMapa = '1';
      this.RespuestaImgMapa = 'Debe seleccionar una imagen para guardar';
    }

  }

  SubirImgMapa(event: any, imagen: string) {
    this.file = event.target.files[0];
    if (event.target.files[0] != "" && event.target.files[0] != undefined && event.target.files[0] != null) {
      this.ImagenSector = event.target.files[0];
      this.ServiciosOferta.postFileImagen(event.target.files[0]).subscribe(
        response => {
          this.respuestaImagenEnviada = response;
          if (this.respuestaImagenEnviada <= 1) {
          } else {
            if (this.respuestaImagenEnviada == 'Archivo Subido Correctamente') {
              if (imagen == '1') {
                this.ImgMapaSec = this.RutaImageneSector + event.target.files[0].name;
                this.NomImagenSector = event.target.files[0].name;
              }
            } else {
              this.resultadoCarga = 2;
            }

          }
        },
        error => {

        }
      );
    } else {
      this.ImagenSector = "";
      alert("Fallando (Asignación imagen)");
    }
  }

  AbrirMensaje(ModalRespuesta: any) {
    this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title' });
    this.Respuesta = 'Debe seleccionar un sector primero, para poder modificar su imagen';
  }

  ValidaVigencias(templateMensaje: any, bandera: string) {

    var fechaA = new Date();
    var fechaD = this.VigenDesde;
    var fechaH = this.VigenHasta;
    var fechaR = this.SessionFechaRecogida;
    var fechaE = this.FechaEntrega;

    var fechaAF = this.formatofecha.transform(fechaA, "yyyy-MM-dd")!;
    var fechaDF = this.formatofecha.transform(fechaD, "yyyy-MM-dd")!;
    var fechaHF = this.formatofecha.transform(fechaH, "yyyy-MM-dd")!;
    var fechaRF = this.formatofecha.transform(fechaR, "yyyy-MM-dd")!;
    var fechaEF = this.formatofecha.transform(fechaE, "yyyy-MM-dd")!;

    if (bandera == '1') {
      if (fechaDF < fechaAF) {
        this.VigenDesde = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha inicio de la vigencia no puede ser menor a la fecha actual, favor valida tu información.';
      }
      else if (fechaDF <= fechaHF) {
        this.VigenDesde = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha inicio de la vigencia no puede ser mayor a la fecha final de la vigencia, favor valida tu información.';
      }
    }

    if (bandera == '2') {
      if (fechaDF > fechaHF) {
        this.VigenHasta = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha fin de la vigencia no puede ser menor a la fecha inicio de la vigencia, favor valida tu información.';
      }
      else if (fechaHF < fechaAF) {
        this.VigenHasta = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha fin de la vigencia no puede ser menor a la fecha actual, favor valida tu información.';
      } else if (fechaHF > fechaEF) {
        this.VigenHasta = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha fin de la vigencia no puede ser mayor a la fecha de entrega, favor valida tu información.';
      }
    }
    if (bandera == '3') {
      if (fechaEF < fechaHF) {
        this.FechaEntrega = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha entrega no puede ser menor a la fecha vigencia hasta, favor valida tu información.';
      }
    }
    if (bandera == '4') {
      if (fechaRF > fechaEF) {
        this.SessionFechaRecogida = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha de recogida no puede ser mayor a la fecha entrega, favor valida tu información.';
      }
    }
  }
  LimpiarFechas() {
    this.VigenDesde = '';
    this.VigenHasta = '';
    this.FechaEntrega = '';
    this.SessionFechaRecogida = '';
  }

  GuardaVigencia(templateMensaje: any) {
    this.ConsultaCuponesOferta();
    this.Respuesta = '';
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    if (this.VigenDesde == '' || this.VigenHasta == '' || this.FechaEntrega == '' || this.SessionFechaRecogida == '') {
      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'VigenDesde',
          campof: 'Vigencia desde',
          class: '',
          imagen: ''
        },
        {
          campo: 'VigenHasta',
          campof: 'Vigencia hasta',
          class: '',
          imagen: ''
        },
        {
          campo: 'FechaEntrega',
          campof: 'Fecha entrega',
          class: '',
          imagen: ''
        },
        {
          campo: 'SessionFechaRecogida',
          campof: 'Fecha recogida',
          class: '',
          imagen: ''
        },

      ]
      for (var i = 0; i < this.ArrayCamposValida.length; i++) {
        if (this.ArrayCamposValida[i].campo == 'VigenDesde') {
          if (this.VigenDesde == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'VigenHasta') {
          if (this.VigenHasta == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'FechaEntrega') {
          if (this.FechaEntrega == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'SessionFechaRecogida') {
          if (this.SessionFechaRecogida == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
      }
    }
    else {
      this.ValidaCam = '0';
      this.ArrayCamposValida = []
      const Body = {
        cd_cnsctvo: this.SelectorOferta,
        IdSector: this.SessionSectorSel,
        FechaInicio: this.VigenDesde,
        FechaFin: this.VigenHasta,
        FechaEntrega: this.FechaEntrega,
        FechaPartida: this.SessionFechaRecogida
      }
      this.serviciosvaloracion.ActualizarFechasOferta('1', Body).subscribe(ResultUpdate => {
        this.Respuesta = ResultUpdate;

      })
    }

  }

  ConsultaCuponesOferta() {
    this.serviciosvaloracion.ConsultaCuponesOferta('1', this.IdOferta, '0').subscribe(Resultado => {
      this.ArrayCuponesOferta = Resultado;
    })
  }

  ConsultaValoracionOferta() {
    this.serviciosvaloracion.ConsultaValoracionOferta('1', this.SelectorOferta, this.SessionSectorSel).subscribe(ResultCons => {
      if (ResultCons[0].IDTIPODOMICILIO != null && ResultCons[0].IDTIPODOMICILIO != '') {
        for (var i = 0; i < this.ArrayDomicilio.length; i++) {
          if (this.ArrayDomicilio[i].IdDomicilio == ResultCons[0].IDTIPODOMICILIO) {
            this.Domicilio = this.ArrayDomicilio[i].Descripcion;
            this.indexTipoDomicilio = i;
            break;
          }
        }
      }
      if (ResultCons[0].DirRegistroVentas != null && ResultCons[0].DirRegistroVentas != '') {
        this.IndexOfertaDirigidaA = ResultCons[0].DirRegistroVentas;
        if (ResultCons[0].DirRegistroVentas == "1") {
          this.OfertaDirigidaA = "Registros";
        } else if (ResultCons[0].DirRegistroVentas == "2") {
          this.OfertaDirigidaA = "Ventas";
        }
      }

      this.Valorapartirde = ResultCons[0].VLORAPRTRDMCLIO.toString();
      if (ResultCons[0].TPO_OFRTA.toString() == "1") {
        this.VlrDomiIValormenora = ResultCons[0].vlor_dmnclio_indvdual.toString();
      } else if (ResultCons[0].TPO_OFRTA.toString() == "3") {
        this.ValorDomcilioGrupValorMenora = ResultCons[0].vlor_dmnclio_grpal.toString();
      }
      this.ArrayTipoOferCon = [
        {
          id: ResultCons[0].TPO_OFRTA,
          name: ResultCons[0].Dscpcion_tpo_ofrta
        }
      ]
      this.ArrayTipoComICon = [
        {
          id: ResultCons[0].tpo_cmsion_indvdual,
          name: ResultCons[0].Nom_tpo_cmsion_indvdual
        }
      ]
      this.ArrayTipoComGCon = [
        {
          id: ResultCons[0].tpo_cmsion_grpal,
          name: ResultCons[0].Nom_tpo_cmsion_grpal
        }
      ]
      this.SessionTipoOferta = ResultCons[0].TPO_OFRTA;
      this.sessionDescripcionOferta = ResultCons[0].Dscpcion_tpo_ofrta;
      if (ResultCons[0].TPO_OFRTA == '1') {
        this.MuestraValoReferencia = '1';
        this.MuestraIndividual = '1';
        this.MuestraGrupal = '0';
        this.MuestraCantIndiv = '1';
        if (ResultCons[0].tpo_cmsion_indvdual == '1') {
          this.VlrComFijaI = ResultCons[0].vlor_cmsion_indvdual;
        }
        else {
          this.VlrComPorI = ResultCons[0].vlor_cmsion_indvdual;
        }
        this.MinUnidI = ResultCons[0].mnmo_unddes_indvdual;
        this.MaxUnidI = ResultCons[0].mxmo_unddes_indvdual;
        this.VlrDomiI = ResultCons[0].vlor_dmnclio_indvdual;
        this.PreFinI = ResultCons[0].vlor_fnal_indvdual;
        this.VlReferencia = ResultCons[0].valorReferenciaProd;
      }

      else if (ResultCons[0].TPO_OFRTA == '2') {
        this.MuestraValoReferencia = '1';
        this.MuestraIndividual = '0';
        this.MuestraGrupal = '1';
        this.MuestraCantIndiv = '0';
        if (ResultCons[0].tpo_cmsion_grpal == '1') {
          this.VlrComFijaG = ResultCons[0].vlor_cmsion_grpal;
        }
        else {
          this.VlrComPorG = ResultCons[0].vlor_cmsion_grpal;
        }
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
        this.VlReferencia = ResultCons[0].valorReferenciaProd;
      }
      else if (ResultCons[0].TPO_OFRTA == 3) {
        if (ResultCons[0].tpo_descuento != null || ResultCons[0].tpo_descuento != 0 || ResultCons[0].tpo_descuento != '') {
          this.PreCargaLIstasTipoDes(Number(ResultCons[0].tpo_descuento));
        }
        if (ResultCons[0].tipo_cupon != null || ResultCons[0].tipo_cupon != 0 || ResultCons[0].tipo_cupon != '') {
          this.PreCargaListaTipoCupon(ResultCons[0].tipo_cupon);
        }
        if (ResultCons[0].img_cupon != null || ResultCons[0].img_cupon != '') {
          this.ImagenRegalo = this.RutaImagenTopping + ResultCons[0].img_cupon;
          this.RutaImagenes = ResultCons[0].img_cupon;
        }
        if (ResultCons[0].desc_cupon != null || ResultCons[0].desc_cupon != '') {
          this.DescripcionRegalo = ResultCons[0].desc_cupon;
        }
        if (ResultCons[0].NumUsuaCupo != null || ResultCons[0].NumUsuaCupo != '') {
          this.NumeroUsuariosCupon = ResultCons[0].NumUsuaCupo;
        }
        this.VlrDomiI = ResultCons[0].vlor_dmnclio_grpal;

        this.MuestraValoReferencia = '1';
        this.MuestraIndividual = '1';
        this.MuestraGrupal = '1';
        this.MuestraCantIndiv = '1';
        if (ResultCons[0].tpo_cmsion_indvdual == '1') {
          this.VlrComFijaI = ResultCons[0].vlor_cmsion_indvdual;
        }
        else {
          this.VlrComPorI = ResultCons[0].vlor_cmsion_indvdual;
        }
        this.MinUnidI = ResultCons[0].mnmo_unddes_indvdual;
        this.MaxUnidI = ResultCons[0].mxmo_unddes_indvdual;
        //this.VlrDomiI = ResultCons[0].vlor_dmnclio_indvdual;
        this.PreFinI = ResultCons[0].vlor_fnal_indvdual;
        if (ResultCons[0].tpo_cmsion_grpal == '1') {
          this.VlrComFijaG = ResultCons[0].vlor_cmsion_grpal;
        }
        else {
          this.VlrComPorG = ResultCons[0].vlor_cmsion_grpal;
        }
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
        this.VlReferencia = ResultCons[0].valorReferenciaProd;
      }
    })
  }

  PreCargaLIstasTipoDes(IdTipoDes: number) {
    for (var i = 0; i < this.DataTipoDescuento.length; i++) {
      if (IdTipoDes == this.DataTipoDescuento[i].id) {
        this.IndexTipoDescuento = i;
        break;
      }
    }
  }

  PreCargaListaTipoCupon(IdTipoCupon: number) {
    for (var j = 0; j < this.ArrayDataCupon.length; j++) {
      if (IdTipoCupon == this.ArrayDataCupon[j].IdCupon) {
        this.IndexTipoCupon = j;
        break;
      }
    }
  }

  LimpiaTipoOferta(item: any) {
    this.MuestraGrupal = '0';
    this.MuestraIndividual = '0';
    this.MuestraVigencial = '0';
    this.MuestraValoReferencia = '0';
  }

  selectTipOferta(item: any) {

    this.consultaValoresUni();
    this.consultaDescuento()
    this.SessionTipoOferta = item.id;
    this.MuestraVigencial = '1';
    if (item.id == 1) {
      this.MuestraValoReferencia = '1';
      this.MuestraIndividual = '1';
      this.MuestraGrupal = '0';
      this.MuestraCantIndiv = '1';
      this.MuestraBtnIndividual = '1';
      this.MuestraBtnGrupal = '0';
      this.MuestraBtnMixta = '0';
    }
    else if (item.id == 2) {
      this.MuestraValoReferencia = '1';
      this.MuestraIndividual = '0';
      this.MuestraGrupal = '1';
      this.MuestraCantIndiv = '0';
      this.MuestraBtnIndividual = '0';
      this.MuestraBtnGrupal = '1';
      this.MuestraBtnMixta = '0';
    }
    else if (item.id == 3) {
      this.MinUnidI = '1';
      this.MaxUnidI = '1';
      //this.VlrDomiI = '0';
      this.MuestraValoReferencia = '1';
      this.MuestraIndividual = '0';
      this.MuestraGrupal = '1';
      this.MuestraCantIndiv = '0';
      this.MuestraBtnIndividual = '0';
      this.MuestraBtnGrupal = '0';
      this.MuestraBtnMixta = '1';
    }
    else {
      this.MuestraVigencial = '0';
      this.MuestraValoReferencia = '0';
      this.MuestraIndividual = '0';
      this.MuestraGrupal = '0';
      this.MuestraCantIndiv = '0';
      this.MuestraBtnIndividual = '0';
      this.MuestraBtnGrupal = '0';
      this.MuestraBtnMixta = '0';
    }
  }

  consultaValoresUni() {
    this.serviciosvaloracion.ConsultaValUnidades('1', this.SelectorOferta, this.SessionSectorSel).subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        this.DataValores = Resultcons;
      }
      else {
        this.DataValores = [];
      }
    })
  }

  LimpiaTipoComisionI(item: any) {
    this.SessionTipoComI = '';
    this.MuestraFijoI = '0';
    this.MuestraPorcentajeI = '0';
    this.PreFinI = '';
    this.VlrComPorI = '';
    this.VlrComFijaI = '';
  }

  selectTipComiI(item: any) {
    this.SessionTipoComI = item.id;
    if (item.name == 'Valor Fijo') {
      this.MuestraFijoI = '1';
      this.MuestraPorcentajeI = '0';
    }
    else {
      this.MuestraFijoI = '0';
      this.MuestraPorcentajeI = '1';
    }
  }

  CalcuPreFinInd() {
    if (this.SessionTipoComI != '') {
      if (this.SessionTipoComI == '1') {
        this.serviciosvaloracion.CalculaPFIndividual('1', this.SelectorOferta, this.SessionSectorSel, this.SessionTipoComI, this.VlrComFijaI).subscribe(ResultCons => {
          this.PreFinI = ResultCons[0].PRECIO_FINAL;
        })
      }
      else if (this.SessionTipoComI == '2') {
        this.serviciosvaloracion.CalculaPFIndividual('1', this.SelectorOferta, this.SessionSectorSel, this.SessionTipoComI, this.VlrComPorI).subscribe(ResultCons => {
          this.PreFinI = ResultCons[0].PRECIO_FINAL;
        })
      }
    }
  }

  ValidaCantidadMinimaIndiv(Cantidad: string, templateMensaje: any) {
    var cantidadmin: number = parseInt(Cantidad);
    if (this.DataOferta[0].Unidades_disponibles <= cantidadmin) {
      this.MinUnidI = '';
      this.Respuesta = 'Válida que el número de unidades mínimas sea menor que el número total de unidades para la oferta';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
  }
  ValidaCantidadmaxIndiv(Cantidad: string, templateMensaje: any) {
    var cantidadmin: number = parseInt(this.MinUnidI);
    var cantidadmax: number = parseInt(Cantidad);
    if (cantidadmax > this.DataOferta[0].Unidades_disponibles) {
      this.MaxUnidI = '';
      this.Respuesta = 'Válida que el número máximo de unidades no supere el número total de unidades para la oferta';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
    if (cantidadmin > cantidadmax) {
      this.MaxUnidI = '';
      this.MinUnidI = '';
      this.Respuesta = 'Válida que el número mínimo de unidades no supere el número máximo de unidades para la oferta';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
  }

  ValidacionesGrupal(Cantidad: string, templateMensaje: any) {
    var cantidadmaxLider: number = parseInt(this.MaxUnidLider);
    var cantidadmaxParticipante: number = parseInt(this.MaxUnidPart);
    var cantidadminLider: number = parseInt(this.MinUnidLider);
    var UnidadesTotaleGrupos: number = parseInt(Cantidad);
    if (UnidadesTotaleGrupos > (cantidadmaxLider + cantidadmaxParticipante)) {
      this.Respuesta = 'Válida las unidades totales por grupo no sea mayor a la suma de las unidades maximas por participante y lider';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
      this.UnidXGrupos = '';
    }
    if (UnidadesTotaleGrupos < (cantidadminLider + cantidadmaxParticipante)) {
      this.Respuesta = 'Válida las unidades totales por grupo no sea menor a la suma de las unidades minimas para el lider y las unidades maximas para el participante';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
      this.UnidXGrupos = '';
    }
  }

  ValidaCantidadMinimaLid(Cantidad: string, templateMensaje: any) {
    var cantidadmin: number = parseInt(Cantidad);
    if (this.DataOferta[0].Unidades_disponibles <= cantidadmin) {
      this.MinUnidLider = '';
      this.Respuesta = 'Válida que el número de unidades mínimas sea menor que el número total de unidades para la oferta';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
  }

  ValidaCantidadmaxLid(Cantidad: string, templateMensaje: any) {
    var cantidadmin: number = parseInt(this.MinUnidLider);
    var cantidadmax: number = parseInt(Cantidad);
    if (this.DataOferta[0].Unidades_disponibles < cantidadmax) {
      this.MaxUnidLider = '';
      this.Respuesta = 'Válida que el número máximo de unidades no supere el número total de unidades para la oferta';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
    if (cantidadmin > cantidadmax) {
      this.MaxUnidLider = '';
      this.MinUnidLider = '';
      this.Respuesta = 'Válida que el número mínimo de unidades no supere el número máximo de unidades para la oferta';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
  }
  ValidaCantidadMinimaPart(Cantidad: string, templateMensaje: any) {
    var cantidadmin: number = parseInt(Cantidad);
    if (this.DataOferta[0].Unidades_disponibles <= cantidadmin) {
      this.MinUnidPart = '';
      this.Respuesta = 'Válida que el número de unidades mínimas sea menor que el número total de unidades para la oferta';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
  }
  ValidaCantidadmaxPart(Cantidad: string, templateMensaje: any) {
    var cantidadmin: number = parseInt(this.MinUnidPart);
    var cantidadmax: number = parseInt(Cantidad);
    if (this.DataOferta[0].Unidades_disponibles < cantidadmax) {
      this.MaxUnidPart = '';
      this.Respuesta = 'Válida que el número máximo de unidades no supere el número total de unidades para la oferta';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
    if (cantidadmin > cantidadmax) {
      this.MaxUnidPart = '';
      this.MinUnidPart = '';
      this.Respuesta = 'Válida que el número mínimo de unidades no supere el número máximo de unidades para la oferta';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
  }

  LimpiaTipoDomicilio(item: any) {
    this.Domicilio = "";
    this.IdDomicilio = "0";
  }
  selectDomicilio(item: any) {
    this.IdDomicilio = item.IdDomicilio;
  }

  //#region OfertaDirigidaA
  LimpiaOfertaDirigidaA(item: any) {
    this.OfertaDirigidaA = "";
    this.IdOfertaDirigidaA = "";
  }
  selectOfertaDirigidaA(item: any) {
    this.IdOfertaDirigidaA = item.Id;
  }
  //#endregion OfertaDirigidaA

  selectCuponOferta(item: any) {
    this.IdCupon = item.codigo_grupo.toString();
  }

  AsociarCupon() {
    const DatosInsert = {
      cd_cnsctivo: this.IdOferta,
      Id_cuponCodigo: this.IdCupon
    }
    this.serviciosvaloracion.ModificarCupon('3', DatosInsert).subscribe(Resultado => {
      this.ConsultaCuponesOferta();
    })
  }

  //#region Cupon
  ImagenRegalo: string = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  NomImgRegalo: string = '';
  CargaInfoCupon() {
    this.serviciosvaloracion.ConsCupon('1').subscribe(ResultCorreo => {
      this.ArrayDataCupon = ResultCorreo;
    });
  }

  selectTipoCupon(item: any) {
    this.IdTipoCupon = item.IdCupon;
  }
  LimpiaTipoCupon(value: string) {
    this.IdTipoCupon = "0";
    this.TipoCupon = value;
  }

  Eliminar(registro: any) {
    const DatosInsert = {
      cd_cnsctivo: registro.Cd_cnsctvo,
      Id_cuponCodigo: registro.codigo_grupo
    }
    this.serviciosvaloracion.ModificarCupon('4', DatosInsert).subscribe(Resultado => {
      this.ConsultaCuponesOferta();
    })

  }
  //#endregion Cupon

  //#region AÑADEPRODUCTOS
  banderaAgregar: string = '1';
  DataProducts: any[];
  cerrarModal: NgbModalRef;
  ArregloEliminaProduct: any;

  DesProduct: string = '';
  PrfjoProduct: string = '';
  CaractCorta: string = '';
  CaractLarga: string = '';
  auxCD_PRDCTO: string = '';
  AddProducto1: string = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  AddProducto2: string = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  AddProducto3: string = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  NomProductImagen1: string = '';
  NomProductImagen2: string = '';
  NomProductImagen3: string = '';

  consultaProductos() {
    this.serviciosvaloracion.consultaCTipoProducto('1').subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        this.DataProducts = Resultcons;
      }
      else {
        this.DataProducts = [];
      }
    })
  }

  GuardarProducto(bandera: string, templateMensaje: any) {
    this.Respuesta = ''
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' });

    if (this.DesProduct == '' || this.DesProduct == null || this.PrfjoProduct == null || this.PrfjoProduct == '' || this.CaractCorta == '' ||
      this.CaractCorta == null || this.CaractLarga == '' || this.CaractLarga == null || (this.NomProductImagen1 == '' && this.imagenesAdicionales == '')) {

      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'DesProduct',
          campof: 'Descripción',
          class: '',
          imagen: ''
        },
        {
          campo: 'PrfjoProduct',
          campof: 'Prefijo',
          class: '',
          imagen: ''
        },
        {
          campo: 'CaractCorta',
          campof: 'Caracterización corta',
          class: '',
          imagen: ''
        },
        {
          campo: 'CaractLarga',
          campof: 'Caracterización larga',
          class: '',
          imagen: ''
        },
        {
          campo: 'NomProductImagen1',
          campof: 'Imagen',
          class: '',
          imagen: ''
        }
      ]
      for (var i = 0; i < this.ArrayCamposValida.length; i++) {
        if (this.ArrayCamposValida[i].campo == 'DesProduct') {
          if (this.DesProduct == '' || this.DesProduct == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'PrfjoProduct') {
          if (this.PrfjoProduct == '' || this.PrfjoProduct == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'CaractCorta') {
          if (this.CaractCorta == '' || this.CaractCorta == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'CaractLarga') {
          if (this.CaractLarga == '' || this.CaractLarga == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }

        else if (this.ArrayCamposValida[i].campo == 'NomProductImagen1') {
          if ((this.NomProductImagen1 == '' || this.NomProductImagen1 == null) && this.imagenesAdicionales == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
      }
    }
    else {
      this.ValidaCam = '0';
      this.ArrayCamposValida = [];
      if (bandera == '2') {
        const Body = {
          DSCRPCION: this.DesProduct,
          imagen: this.NomProductImagen1,
          imagenDos: this.NomProductImagen2,
          imagenTres: this.NomProductImagen3,
          crctzcionCrta: this.CaractCorta,
          crctzcionLrga: this.CaractLarga,
          ESTADO: 1,
          CD_PRDCTO: 0,
          PREFIJO: this.PrfjoProduct
        }
        this.serviciosvaloracion.ModificaCTipoProducto('2', Body).subscribe(ResultOper => {
          this.Respuesta = ResultOper;
          const partesRespuesta = this.Respuesta.split('|');
          if (partesRespuesta.length > 1) {
            this.Respuesta = partesRespuesta.slice(1).join('|');
          }
          this.consultaProductos();
          this.LimpiarADDProduct();
          this.ListaProductos();
          this.LimpiaProductoTopp();
        })
      }
      else if (bandera == '3') {
        var aux: string = "0";
        const Body = {
          DSCRPCION: this.DesProduct,
          imagen: this.NomProductImagen1,
          imagenDos: this.NomProductImagen2,
          imagenTres: this.NomProductImagen3,
          crctzcionCrta: this.CaractCorta,
          crctzcionLrga: this.CaractLarga,
          ESTADO: 1,
          CD_PRDCTO: this.auxCD_PRDCTO,
          PREFIJO: this.PrfjoProduct
        }
        this.serviciosvaloracion.ModificaCTipoProducto('3', Body).subscribe(ResultOper => {
          this.Respuesta = ResultOper;
          const partesRespuesta = this.Respuesta.split('|');
          if (partesRespuesta.length > 1) {
            this.Respuesta = partesRespuesta.slice(1).join('|');
          }
          this.consultaProductos();
          this.LimpiarADDProduct();
          this.ListaProductos();
          this.LimpiaProductoTopp();
        })
      }
    }
  }

  EliminarProd(producto: any, modalmensaje: any) {
    this.cerrarModal = this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title' })
    this.ArregloEliminaProduct = {
      DSCRPCION: producto.DSCRPCION,
      imagen: producto.imagen,
      imagenDos: producto.imagenDos,
      imagenTres: producto.imagenTres,
      crctzcionCrta: producto.crctzcionCrta,
      crctzcionLrga: producto.crctzcionLrga,
      ESTADO: producto.CD_ESTADO,
      CD_PRDCTO: producto.CD_PRDCTO,
      PREFIJO: producto.PRFJO
    }
  }

  AceptEliminarProd(modalmensaje: any) {
    this.Respuesta = '';
    this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title' })
    this.cerrarModal?.close();
    this.serviciosvaloracion.ModificaCTipoProducto('4', this.ArregloEliminaProduct).subscribe(ResultOper => {
      this.Respuesta = ResultOper;
      const partesRespuesta = this.Respuesta.split('|');
      if (partesRespuesta.length > 1) {
        this.Respuesta = partesRespuesta.slice(1).join('|');
      }
      this.consultaProductos();
      this.ListaProductos();
      this.LimpiaProductoTopp();
    })
  }

  EditarProducto(producto: any) {
    this.auxCD_PRDCTO = producto.CD_PRDCTO;
    this.DesProduct = producto.DSCRPCION;
    this.PrfjoProduct = producto.PRFJO;
    this.CaractCorta = producto.crctzcionCrta;
    this.CaractLarga = producto.crctzcionLrga;
    if (producto.imagen == '' || producto.imagen == null) {
      this.AddProducto1 = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
    } else {
      this.AddProducto1 = this.RutaImagenTopping + producto.imagen;
      this.NomProductImagen1 = producto.imagen;
    }
    if (producto.imagenDos == '' || producto.imagenDos == null) {
      this.AddProducto2 = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
    } else {
      this.AddProducto2 = this.RutaImagenTopping + producto.imagenDos;
      this.NomProductImagen2 = producto.imagenDos;
    }
    if (producto.imagenTres == '' || producto.imagenTres == null) {
      this.AddProducto3 = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
    } else {
      this.AddProducto3 = this.RutaImagenTopping + producto.imagenTres;
      this.NomProductImagen3 = producto.imagenTres;
    }
    this.banderaAgregar = '2';
  }

  CrearEditarproduct(modalmensaje: any) {
    this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
    this.banderaAgregar = '1';
  }

  LimpiarADDProduct() {
    this.DesProduct = "";
    this.PrfjoProduct = "";
    this.CaractCorta = "";
    this.CaractLarga = "";
    this.AddProducto1 = "./../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png";
    this.AddProducto2 = "./../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png";
    this.AddProducto3 = "./../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png";
    this.banderaAgregar = '1';
    this.NomProductImagen1 = "";
    this.NomProductImagen2 = "";
    this.NomProductImagen3 = "";
  }

  public CargarImagenProducto(event: any, imagen: string, modalmensaje: any) {

    if (!(/\.(jpg|png|jpeg)$/i).test(event.target.files[0].name)) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, valide la extención, las permitidas son .jpg .png .jpeg";
    }
    else if (event.target.files[0].name.includes(" ")) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, el nombre no debe contener espacios";
    }
    else if (event.target.files[0].size > 1300000) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El peso del archivo no puede exceder 1.3 megabyte";
    } else {
      this.serviciosvaloracion.postImgToppings(event.target.files[0]).subscribe(
        response => {
          if (response == 'Archivo Subido Correctamente') {
            if (imagen == '1') {
              this.AddProducto1 = this.RutaImagenTopping + event.target.files[0].name;
              this.NomProductImagen1 = event.target.files[0].name;
            }
            if (imagen == '2') {
              this.AddProducto2 = this.RutaImagenTopping + event.target.files[0].name;
              this.NomProductImagen2 = event.target.files[0].name;
            }
            if (imagen == '3') {
              this.AddProducto3 = this.RutaImagenTopping + event.target.files[0].name;
              this.NomProductImagen3 = event.target.files[0].name;
            }
            event.target.value = '';
          }
        },
        error => {
          this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.Respuesta = "No hemos podido subir el archivo, intente nuevamente.";
        }
      );
    }
  }

  ArrayProductoSeleccionado: any[] = [];
  visualizaImagenProducto(ModalImagen: any, producto: any) {
    this.Respuesta = '';
    this.ArrayProductoSeleccionado = [];
    const propiedadesImagenes = ['imagen', 'imagenDos', 'imagenTres'];

    // Verifica y agrega las imágenes al ArrayProductoSeleccionado
    for (const propiedad of propiedadesImagenes) {
      if (producto[propiedad] !== null && producto[propiedad] !== undefined) {
        this.ArrayProductoSeleccionado.push({ imagen: producto[propiedad] });
      }
    }

    // Si no hay imágenes, muestra un mensaje
    if (this.ArrayProductoSeleccionado.length === 0) {
      this.Respuesta = 'No hay imágenes';
    } else {
      // Si hay imágenes, verifica si imagenDos e imagenTres están presentes
      const tieneImagenDos = this.ArrayProductoSeleccionado.some(item => item.imagenDos);
      const tieneImagenTres = this.ArrayProductoSeleccionado.some(item => item.imagenTres);

      // Filtra las imágenes para mostrar solo imagen, imagenDos o imagenTres según corresponda
      this.ArrayProductoSeleccionado = this.ArrayProductoSeleccionado.filter(item => {
        if (tieneImagenDos && tieneImagenTres) {
          return item.imagen || item.imagenDos || item.imagenTres;
        } else if (tieneImagenDos) {
          return item.imagen || item.imagenDos;
        } else if (tieneImagenTres) {
          return item.imagen || item.imagenTres;
        } else {
          return item.imagen;
        }
      });
    }
    // Abre el modal
    this.modalService.open(ModalImagen, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }


  // ================ RECETAS / CONSERVACION ==============================
  DataReceta: any[];
  DataCnsvcion: any[];
  BAddReceta: string = '1';
  BAddCrctrstca: string = '1';
  INDescReceta: string = '';
  INLinkReceta: string = '';
  INDesConsrv: string = '';
  INLinkConsrv: string = '';
  CodeProduct: string = '';
  NombProducto: string = '';

  AbrirModalLinks(modalmensaje: any, producto: any) {
    this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
    this.CodeProduct = producto.CD_PRDCTO;
    this.NombProducto = producto.DSCRPCION;
    this.consultaRecetas();
    this.consultaConservacion();
  }

  consultaRecetas() {
    this.serviciosvaloracion.ConsultaEnlaces('1', '1', this.CodeProduct).subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        this.DataReceta = Resultcons;
      }
      else {
        this.DataReceta = [];
      }
    })
  }

  consultaConservacion() {

    this.serviciosvaloracion.ConsultaEnlaces('1', '2', this.CodeProduct).subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        this.DataCnsvcion = Resultcons;
      }
      else {
        this.DataCnsvcion = [];
      }
    })
  }


  AgregarReceta(bandera: string) {
    if (this.INDescReceta == null || this.INDescReceta == '') {
      this.Respuesta = 'El campo Descripción receta es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else if (this.INLinkReceta == null || this.INLinkReceta == '') {
      this.Respuesta = 'El campo Link receta es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else {

      if (bandera == '3') {
        const Body = {
          IdLinkProducto: 0,
          cd_prdcto: this.CodeProduct,
          Descripcion: this.INDescReceta,
          Link: this.INLinkReceta,
          TipoLink: 1
        }
        this.serviciosvaloracion.AgregaEnlaces(bandera, Body).subscribe(ResultOper => {
          this.consultaRecetas();
          this.INDescReceta = '';
          this.INLinkReceta = '';
        })
      } else if (bandera == '2') {
        const Body = {
          IdLinkProducto: this.auxIdEnlace,
          cd_prdcto: this.CodeProduct,
          Descripcion: this.INDescReceta,
          Link: this.INLinkReceta,
          TipoLink: 1
        }
        this.serviciosvaloracion.AgregaEnlaces(bandera, Body).subscribe(ResultOper => {
          this.consultaRecetas();
          this.INDescReceta = '';
          this.INLinkReceta = '';
          this.BAddReceta = '1';
        })
      }
    }
  }

  auxIdEnlace: string = '';
  EditaReceta(enlace: any) {
    this.auxIdEnlace = enlace.IdLinkProducto;
    this.INDescReceta = enlace.Descripcion;
    this.INLinkReceta = enlace.Link;
    this.BAddReceta = '2';
  }

  EliminaReceta(enlace: any) {
    const Body = {
      IdLinkProducto: enlace.IdLinkProducto,
      cd_prdcto: enlace.cd_prdcto,
      Descripcion: enlace.Descripcion,
      Link: enlace.Link,
      TipoLink: 1
    }
    this.serviciosvaloracion.AgregaEnlaces('4', Body).subscribe(ResultOper => {
      this.consultaRecetas();
    })
  }

  AgregarConservacion(bandera: string) {
    if (this.INDesConsrv == null || this.INDesConsrv == '') {
      this.Respuesta = 'El campo Descripción conservación es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else if (this.INLinkConsrv == null || this.INLinkConsrv == '') {
      this.Respuesta = 'El campo Link conservación es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else {

      if (bandera == '3') {
        const Body = {
          IdLinkProducto: 0,
          cd_prdcto: this.CodeProduct,
          Descripcion: this.INDesConsrv,
          Link: this.INLinkConsrv,
          TipoLink: 2
        }
        this.serviciosvaloracion.AgregaEnlaces(bandera, Body).subscribe(ResultOper => {
          this.consultaConservacion();
          this.INDesConsrv = '';
          this.INLinkConsrv = '';
        })
      } else if (bandera == '2') {
        const Body = {
          IdLinkProducto: this.auxIdCnsvcion,
          cd_prdcto: this.CodeProduct,
          Descripcion: this.INDesConsrv,
          Link: this.INLinkConsrv,
          TipoLink: 2
        }
        this.serviciosvaloracion.AgregaEnlaces(bandera, Body).subscribe(ResultOper => {
          this.consultaConservacion();
          this.INDesConsrv = '';
          this.INLinkConsrv = '';
          this.BAddCrctrstca = '1';
        })
      }
    }
  }

  auxIdCnsvcion: string = '';
  EditaConservacion(enlace: any) {
    this.auxIdCnsvcion = enlace.IdLinkProducto;
    this.INDesConsrv = enlace.Descripcion;
    this.INLinkConsrv = enlace.Link;
    this.BAddCrctrstca = '2';
  }

  EliminaConservacion(enlace: any) {
    const Body = {
      IdLinkProducto: enlace.IdLinkProducto,
      cd_prdcto: enlace.cd_prdcto,
      Descripcion: enlace.Descripcion,
      Link: enlace.Link,
      TipoLink: 2
    }
    this.serviciosvaloracion.AgregaEnlaces('4', Body).subscribe(ResultOper => {
      this.consultaConservacion();
    })
  }







  //#endregion AÑADEPRODUCTOS


  //#region AgregaTopping
  ListaProductos() {
    this.serviciosvaloracion.consultaCTipoProducto('1').subscribe(ResultUpdate => {
      this.ArrayProductos = ResultUpdate;
      this.keywordProductos = 'DSCRPCION';
    });
  }
  selectProductoTopp(item: any) {
    this.ProdTipoTpp = item.DSCRPCION;
    this.IdProdTipoTopping = item.CD_PRDCTO;
    this.CargaListaPresentaciones(item.CD_PRDCTO);

    //Precarga imagenes con lo que trae el servicio
    if (item.imagen != null && item.imagen != '' && item.imagen != 'null') {
      this.Add1 = this.RutaImagenTopping + item.imagen;
      this.NomImagen1 = item.imagen;
    }
    if (item.imagenDos != null && item.imagenDos != '' && item.imagenDos != 'null') {
      this.Add2 = this.RutaImagenTopping + item.imagenDos;
      this.NomImagen2 = item.imagenDos;
    }
    if (item.imagenTres != null && item.imagenTres != '' && item.imagenTres != 'null') {
      this.Add3 = this.RutaImagenTopping + item.imagenTres;
      this.NomImagen3 = item.imagenTres;
    }

    //Pecarga las caracterizaciones
    this.DescCortaAdd = item.crctzcionCrta;
    this.DescLargaAdd = item.crctzcionLrga;
  }

  LimpiaProductoTopp() {
    this.ProductoNgModel = "";
    this.ProdTipoTpp = "";
    this.IdProdTipoTopping = "0";
    this.LimpiaPresentacion();
    this.ArrayPresentaciones = [];

    //Limpia Las imagenes
    this.Add1 = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
    this.Add2 = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
    this.Add3 = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
    this.NomImagen1 = "";
    this.NomImagen2 = "";
    this.NomImagen3 = "";

    //Limpia las caracterizaciones
    this.DescCortaAdd = "";
    this.DescLargaAdd = "";

    //Limpia la presentacion del empaque
    this.Presentacion = "";
  }


  AbreAdminPresentaciones(Presentaciones: any, topping: any) {
    this.IdProductoTopping_ = topping.Id_Producto;
    this.modalService.open(Presentaciones, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
    this.IdToppingSelect = topping.IdTopping;
    this.DescripcionProductoTopping = topping.Descripcion;
    this.ListaPresentacionesTopping(topping.IdTopping);
    this.CargaListaPresentacionesTopping();
    this.modalService.open(Presentaciones, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }
  CierraModalPresentacion() {
    this.modalService.dismissAll();

    this.UnidadesOferta = "";
    this.MaximoUnidades = "";
    this.LimpiaPresentacionTopping();
    this.ValorReal = "";
    this.ValorReferencia = "";
    this.IdToppingSelect = "";
  }

  ListaPresentacionesTopping(IdTopping: string) {
    this.serviciosvaloracion.consCRelacionProducTopping('1', IdTopping, this.SessionSectorSel).subscribe(ResultUpdate => {
      this.ArrayProdTopping = ResultUpdate;
    });
  }
  LimpiarCamposModalPresentacion() {
    this.UnidadesOferta = "";
    this.MaximoUnidades = "";

    this.LimpiaPresentacionTopping();
    this.ValorReal = "";
    this.ValorReferencia = "";
    this.banderaAgregarAdicional = '1';
  }
  AgregarPresentacion(bandera: string) {
    this.SmsError = "";
    if (this.UnidadesOferta == '' || this.UnidadesOferta == '0' || Number(this.UnidadesOferta) < 1) {
      this.SmsError = "Define agregar unidades para la oferta";
    } else if (this.MaximoUnidades == '' || this.MaximoUnidades == '0' || Number(this.MaximoUnidades) < 1) {
      this.SmsError = "Define la cantidad máxima por compra";
    } else if (this.PresentacionTopping == '') {
      this.SmsError = "Define la presentación";
    } else if (this.PesoPresentacionTopping == '' || this.PesoPresentacionTopping == '0' || Number(this.PesoPresentacionTopping) < 1) {
      this.SmsError = "Define el peso del producto";
    } else if (this.ValorReal == '' || this.ValorReal == '0' || Number(this.ValorReal) < 1) {
      this.SmsError = "Define el Valor del producto en esta presentación";
    } else if (this.ValorReferencia == '' || this.ValorReferencia == '0' || Number(this.ValorReferencia) < 1) {
      this.SmsError = "Define su valor referencia";
    } else if (Number(this.ValorReal) > Number(this.ValorReferencia)) {
      this.SmsError = "El valor real no puede ser mayor que el valor referencia";
    } else {  
      this.SmsError = "";
      //Agrega la presentacion
      if (bandera == '2') {
        const body = {
          IdTopping: this.IdToppingSelect,
          IdRelacion: 0,
          Presentacion: this.PresentacionTopping,
          ValorReal: this.ValorReal,
          ValorReferencia: this.ValorReferencia,
          UnidadesOferta: this.UnidadesOferta,
          MximoUnidades: this.MaximoUnidades,
          Id_Sector: this.SessionSectorSel,
          PesoUnidad: this.PesoPresentacionTopping,
          UnidadesPeso: this.UniProdTpp,
          DefectoUnidadesPeso: this.DefectoUniProdTpp,
        }
    
        this.serviciosvaloracion.modCRelacionProductoTopping('2', body).subscribe(Respu => {
          var split = Respu.toString().split("|");
          if (split[0] == "1") {
            this.ListaPresentacionesTopping(this.IdToppingSelect);
            this.LimpiarCamposModalPresentacion();
          } else {
            this.SmsError = split[1];
          }
        });
      } else if (bandera == '3') {
        const body = {
          IdTopping: this.IdToppingSelect,
          IdRelacion: this.AuxIdRelacion,
          Presentacion: this.PresentacionTopping,
          ValorReal: this.ValorReal,
          ValorReferencia: this.ValorReferencia,
          UnidadesOferta: this.UnidadesOferta,
          MximoUnidades: this.MaximoUnidades,
          Id_Sector: this.SessionSectorSel,
          PesoUnidad: this.PesoPresentacionTopping,
          UnidadesPeso: this.UniProdTpp,
          DefectoUnidadesPeso: this.DefectoUniProdTpp,
        }
        this.serviciosvaloracion.modCRelacionProductoTopping('3', body).subscribe(Respu => {
          var split = Respu.toString().split("|");
          if (split[0] == "1") {
            this.ListaPresentacionesTopping(this.IdToppingSelect);
            this.LimpiarCamposModalPresentacion();
          } else {
            this.SmsError = split[1];
          }
        });
      }
    }
  }

  EditarAdicional(Adicional: any) {
    this.AuxIdRelacion = Adicional.IdRelacion;
    this.UnidadesOferta = Adicional.cantidadReserva;
    this.MaximoUnidades = Adicional.MaxCantidad;
    this.ValorReal = Adicional.ValorUnitario;
    this.ValorReferencia = Adicional.VlorRefencia;
    this.banderaAgregarAdicional = '2';

    for (var i = 0; i < this.ArrayPresentacionesTopping.length; i++) {
      if (Adicional.Presentacion == this.ArrayPresentacionesTopping[i].des_empaque) {
        this.IndexPresentacionTopping_ = i;
        break;
      }
    }
  }

  ConfirmacionEliminar(item: any, ModalConfirmacion: any) {
    this.SmsError = "";
    this.itemEliminar = item;
    this.DescripcionPresentacion = item.Presentacion;
    this.modalService.open(ModalConfirmacion, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  EliminaPresentacion() {
    const body = {
      IdTopping: '0',
      IdRelacion: this.itemEliminar.IdRelacion,
      Presentacion: this.itemEliminar.Presentacion,
      ValorReal: this.itemEliminar.ValorUnitario,
      ValorReferencia: this.itemEliminar.VlorRefencia,
      UnidadesOferta: this.itemEliminar.cantidadReserva,
      MximoUnidades: this.itemEliminar.MaxCantidad,
      Id_Sector: this.SessionSectorSel,
      PesoUnidad: this.itemEliminar.PesoKilos
    }
    this.serviciosvaloracion.modCRelacionProductoTopping('4', body).subscribe(Respu => {
      var split = Respu.toString().split("|");
      if (split[0] == "1") {
        this.ListaPresentacionesTopping(this.IdToppingSelect);
        this.LimpiarCamposModalPresentacion();
      } else {
        this.SmsError = split[1].toString();
      }
    });
  }
  LimpiSmsError() {
    this.SmsError = "";
  }
  //#endregion AgregaTopping


  GuardaIndividual(templateMensaje: any) {

    var valorDomicilio: boolean = false;
    var AuxValDomicilio: string = "0";
    var AuxValorApartirde: string = "0";

    if (this.IdDomicilio == '1') {
      if (this.VlrDomiI == "") {
        valorDomicilio = false;
      } else {
        AuxValDomicilio = this.VlrDomiI;
        valorDomicilio = true;
      }
    } else if (this.IdDomicilio == '2') {
      if (this.VlrDomiIValormenora == "" || this.Valorapartirde == "") {
        valorDomicilio = false;
      } else {
        AuxValorApartirde = this.Valorapartirde
        AuxValDomicilio = this.VlrDomiIValormenora;
        valorDomicilio = true;
      }
    } else if (this.IdDomicilio == '0') {
      valorDomicilio = false;
    } else {
      AuxValDomicilio = "0";
      valorDomicilio = true;
    }


    this.Respuesta = '';
    var validacomision = '';
    if (this.SessionTipoComI == '1') {
      validacomision = this.VlrComFijaI
    }
    else {
      validacomision = this.VlrComPorI
    }

    if (this.VlrDomiI == '' || this.VlrDomiI == undefined || this.VlrDomiI == null) {
      this.VlrDomiI = '0'
    }

    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    if ((this.SessionTipoComI == null || this.SessionTipoComI == '') || (this.MinUnidI == '' || this.MinUnidI == null) || (this.MaxUnidI == '' || this.MaxUnidI == null)
      || (this.PreFinI == '' || this.PreFinI == null) || (validacomision == '' || validacomision == null) || valorDomicilio == false || (this.IdOfertaDirigidaA == '' || this.IdOfertaDirigidaA == null)) {
      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'SessionTipoComI',
          campof: 'Tipo comisión',
          class: '',
          imagen: ''
        },
        {
          campo: 'validacomision',
          campof: 'Valor comisión',
          class: '',
          imagen: ''
        },
        {
          campo: 'MinUnidI',
          campof: 'Minimo unidades',
          class: '',
          imagen: ''
        },
        {
          campo: 'MaxUnidI',
          campof: 'Maximo unidades',
          class: '',
          imagen: ''
        },
        {
          campo: 'PreFinI',
          campof: 'Precio final',
          class: '',
          imagen: ''
        },
        {
          campo: 'ValDomicilio',
          campof: 'Valor domicilió',
          class: '',
          imagen: ''
        },
        {
          campo: 'OfertaDirigidaa',
          campof: 'Oferta dirigida a',
          class: '',
          imagen: ''
        }
      ]
      for (var i = 0; i < this.ArrayCamposValida.length; i++) {
        if (this.ArrayCamposValida[i].campo == 'SessionTipoComI') {
          if (this.SessionTipoComI == '' || this.SessionTipoComI == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'validacomision') {
          if (validacomision == '' || validacomision == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'MinUnidI') {
          if (this.MinUnidI == '' || this.MinUnidI == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'MaxUnidI') {
          if (this.MaxUnidI == '' || this.MaxUnidI == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'PreFinI') {
          if (this.PreFinI == '' || this.PreFinI == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        } else if (this.ArrayCamposValida[i].campo == 'ValDomicilio') {
          if (valorDomicilio == false) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        } else if (this.ArrayCamposValida[i].campo == 'OfertaDirigidaa') {
          if (this.IdOfertaDirigidaA == '' || this.IdOfertaDirigidaA == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
      }
    }
    else {
      this.ValidaCam = '0';
      this.ArrayCamposValida = [];

      // bitly.shorten(this.RutaLanding +this.SessionSectorSel+'/'+this.SessionOferta+'/0/0').then(result => {}catch{result.link}

      this.LinkSms = 'https://bit.ly/3HbpHIJ';
      const Body = {
        CD_CNSCTVO: this.SelectorOferta,
        TPO_OFRTA: this.SessionTipoOferta,
        TPO_CMSION_INDVDUAL: Number(this.SessionTipoComI),
        VLOR_CMSION_INDVDUAL: validacomision,
        MNMO_UNDDES_INDVDUAL: this.MinUnidI,
        MXMO_UNDDES_INDVDUAL: this.MaxUnidI,
        VLOR_DMNCLIO_INDVDUAL: AuxValDomicilio,
        VLOR_FNAL_INDVDUAL: this.PreFinI,
        TPO_CMSION_GRPAL: 0,
        VLOR_CMSION_GRPAL: "0",
        MNMO_UNDDES_LIDER: "0",
        MXMO_UNDDES_LIDER: "0",
        PRCNTJE_DCTO_LIDER: "0",
        VLOR_DMNCLIO_GRPAL: AuxValDomicilio,
        CNTDAD_GRPOS: "0",
        MNMO_PRSNAS_XGRUPO: "0",
        MNMO_UNDDES_PRCPNTE: "0",
        MXMO_UNDDES_PRCPNTE: "0",
        CNTDAD_CMPRAS_INDVDLES: "0",
        VLOR_ARRNQUE_LIDER: "0",
        VLOR_FNAL_PRTCPNTE: "0",
        ID_SCTOR_OFRTA: this.SessionSectorSel,
        LINKLANDIGN: this.LinkSms,
        VALOR_REFERENCIA: "0",
        TIPO_CUPON: 0,
        DES_CUPONREGALO: "0",
        IMG_CUPONREGALO: "0",
        IDTIPODOMICILIO: this.IdDomicilio,
        VLORAPRTRDMCLIO: AuxValorApartirde,
        NumUsuaCupo: 0,
        DirigidaRegiVent: this.IdOfertaDirigidaA
      }
      this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
        var arreglores = ResultUpdate.split('|')
        this.Respuesta = arreglores[1];
      })
      this.SumaPrecios = parseInt(this.VlrDomiI) + parseInt(this.PreFinI);
      this.ValorUni = this.SumaPrecios.toString();
      this.consultaValoresUni();
      this.consultaDescuento();
    }
  }

  LimpiaTipoComision(item: any) {
    this.SessionTipoComG = '';
    this.MuestraFijo = '0';
    this.MuestraPorcentaje = '0';
    this.VlrComPorG = '';
    this.VlrComFijaG = '';
  }

  selectTipComiG(item: any) {
    this.SessionTipoComG = item.id;
    if (item.id == 1) {
      this.MuestraFijo = '1';
      this.MuestraPorcentaje = '0';
    }
    else {
      this.MuestraFijo = '0';
      this.MuestraPorcentaje = '1';
    }
  }

  CalculaPreoferGrupalM() {
    var validadomi, validaunixgru, validaVlrComF, validaVlrComP = '0';
    if (this.VlrDomiG == '' || this.VlrDomiG == null) {
      validadomi = '0';
    }
    else {
      validadomi = this.VlrDomiG;
    }
    if (this.UnidXGrupos == '' || this.UnidXGrupos == null) {
      validaunixgru = '0';
    }
    else {
      validaunixgru = this.UnidXGrupos;
    }
    if (this.VlrComFijaG == '' || this.VlrComFijaG == null) {
      validaVlrComF = '0';
    }
    else {
      validaVlrComF = this.VlrComFijaG;
    }
    if (this.VlrComPorG == '' || this.VlrComPorG == null) {
      validaVlrComP = '0';
    }
    else {
      validaVlrComP = this.VlrComPorG;
    }
    if (this.SessionTipoComG == '1') {
      this.serviciosvaloracion.CalculaPreOferGrupal('1', this.SelectorOferta, this.SessionSectorSel, this.SessionTipoComG, validaVlrComF, validadomi, validaunixgru).subscribe(ResultCons => {
        this.PrecioFinLider = ResultCons[0].PRECIO_ARRANQUE_LIDER;
        this.PrecioFinPart = ResultCons[0].PRECIO_FINAL_PARTICIPANTE;
      })
    }
    else if (this.SessionTipoComG == '2') {
      this.serviciosvaloracion.CalculaPreOferGrupal('1', this.SelectorOferta, this.SessionSectorSel, this.SessionTipoComG, validaVlrComP, validadomi, validaunixgru).subscribe(ResultCons => {
        this.PrecioFinLider = ResultCons[0].PRECIO_ARRANQUE_LIDER;
        if (this.DataValores.length > 0) {
          this.PrecioFinPart = this.DataValores[0].ValorUnidad;
        } else {
          this.PrecioFinPart = ResultCons[0].PRECIO_ARRANQUE_LIDER;
        }
      })
    }
  }

  selectTipDescuento(item: any) {
    this.SessionTipoDescuento = item.id;
  }

  LimpiaTipoDescuento(item: any) {
    this.SessionTipoDescuento = '';
    this.PorcDescLider = '';
    this.UnidXGrupos = '';
  }

  CalculaCCI(templateMensaje: any) {
    this.CalculaPreoferGrupalM();
    if (this.CantGrupos != '' && this.UnidXGrupos != '') {
      this.CantComprI = this.CantGrupos * this.UnidXGrupos
      this.CantComprI = this.SessionCantSector - this.CantComprI
      if (this.CantComprI < 0) {
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
        this.Respuesta = 'La cantidad asignada para los grupos supera la cantidad registrada para el sector (' + this.SessionCantSector + '), favor valida tu información.';
        this.CantGrupos = '';
        this.UnidXGrupos = '';
        this.CantComprI = '';
      }
    }
    else {

    }
  }

  public CargaImagen(event: any, modalmensaje: any) {
    if (!(/\.(jpg|png|jpeg)$/i).test(event.target.files[0].name)) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, valide la extención, las permitidas son .jpg .png .jpeg";
    }
    else if (event.target.files[0].name.includes(" ")) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, el nombre no debe contener espacios";
    }
    else if (event.target.files[0].size > 1300000) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El peso del archivo no puede exceder 1.3 megabyte";
    } else {
      this.serviciosvaloracion.postImgToppings(event.target.files[0]).subscribe(response => {
        if (response != 'Archivo Subido Correctamente') {
        } else {
          if (response == 'Archivo Subido Correctamente') {

            this.ImagenRegalo = this.RutaImagenTopping + event.target.files[0].name;
            this.NomImgRegalo = event.target.files[0].name;
            //event.target.value = '';
          } else {
            //this.resultadoCarga = 2;
          }

        }

      });
    }

  }

  ConsultaCupones() {
    var oferta = '0'
    if (this.IdOferta != '') {
      oferta = this.IdOferta
    }
    const datos = {
      FechaCreacion: '0'
    }
    this.serviciosvaloracion.ConsultaCupones('1', '0', '0', '0', '1', datos).subscribe(Resultado => {
      if (Resultado.length > 0) {
        this.ArrayCupones = Resultado
      }
    })
  }

  ListaTipoDomicilio() {
    this.serviciosvaloracion.consTipoDomicilio('1').subscribe(Resultcons => {
      this.ArrayDomicilio = Resultcons;
      this.keywordDomicilio = "Descripcion";
    });
  }

  GuardarMixta(templateMensaje: any) {
    var valorDomicilio: boolean = false;
    var AuxValDomicilio: string = "0";
    var AuxValorApartirde: string = "0";

    if (this.IdDomicilio == '1') {
      if (this.VlrDomiI == "") {
        valorDomicilio = false;
      } else {
        AuxValDomicilio = this.VlrDomiI;
        valorDomicilio = true;
      }
    } else if (this.IdDomicilio == '2') {
      if (this.ValorDomcilioGrupValorMenora == "" || this.Valorapartirde == "") {
        valorDomicilio = false;
      } else {
        AuxValorApartirde = this.Valorapartirde
        AuxValDomicilio = this.ValorDomcilioGrupValorMenora;
        valorDomicilio = true;
      }
    } else if (this.IdDomicilio == '0') {
      valorDomicilio = false;
    } else {
      AuxValDomicilio = "0";
      valorDomicilio = true;
    }


    this.Respuesta = '';
    var validacomision = '';
    var validacomisionG = '';

    if (this.SessionTipoComI == '1') {
      validacomision = this.VlrComFijaI
    }
    else {
      validacomision = this.VlrComPorI
    }

    if (this.SessionTipoComG == '1') {
      validacomisionG = this.VlrComFijaG
    }
    else {
      validacomisionG = this.VlrComPorG
    }

    if (this.VlrDomiI == '' || this.VlrDomiI == undefined || this.VlrDomiI == null) {
      this.VlrDomiI = '0'
    }

    var auxres: boolean = false;
    if (this.IdTipoCupon != "" && this.IdTipoCupon != "0") {
      if (this.IdTipoCupon == "1") {
        if ((this.DescripcionRegalo == '' || this.DescripcionRegalo == null) || (this.NumeroUsuariosCupon == '' || this.NumeroUsuariosCupon == null) || (this.ImagenRegalo == './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png')) {
          auxres = false;
        } else {
          auxres = true;
        }
      } else {
        if ((this.PorcDescLider == '' || this.PorcDescLider == null) || (this.UnidXGrupos == "" || this.UnidXGrupos == null)) {
          auxres = false;
        } else {
          auxres = true;
        }
      }

    } else {
      auxres = false;
    }

    if (
      (this.SessionTipoComG == '' || this.SessionTipoComG == null) ||
      (validacomisionG == '' || validacomisionG == null) ||
      (this.SessionTipoDescuento == '0' || this.SessionTipoDescuento == null || this.SessionTipoDescuento == '') ||
      (this.IdTipoCupon == '0' || this.IdTipoCupon == null) ||
      (auxres == false) ||
      (this.MinUnidLider == '' || this.MinUnidLider == null) ||
      (this.MaxUnidLider == '' || this.MaxUnidLider == null) ||
      (valorDomicilio == false) ||
      (this.PrecioFinPart == '' || this.PrecioFinPart == null) ||
      (this.IdOfertaDirigidaA == '' || this.IdOfertaDirigidaA == null)
    ) {
      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'TipoCom',
          campof: 'Tipo comisión',
          class: '',
          imagen: ''
        },
        {
          campo: 'ValorComicion',
          campof: 'Valor comisión fija',
          class: '',
          imagen: ''
        },
        {
          campo: 'TipoDesc',
          campof: 'Tipo de descuento',
          class: '',
          imagen: ''
        },
        {
          campo: 'TipoCupon',
          campof: 'Tipo de cupon',
          class: '',
          imagen: ''
        },
        {
          campo: 'DescTipoCupon',
          campof: '',
          class: '',
          imagen: ''
        },
        {
          campo: 'UndMin',
          campof: 'Unidades mínimo',
          class: '',
          imagen: ''
        },
        {
          campo: 'UndMax',
          campof: 'Unidades máximo',
          class: '',
          imagen: ''
        },
        {
          campo: 'ValDomicilio',
          campof: 'Valor domicilio',
          class: '',
          imagen: ''
        },
        {
          campo: 'ValFinalParticipante',
          campof: 'Precio final participante',
          class: '',
          imagen: ''
        },
        {
          campo: 'OfertaDirigidaa',
          campof: 'Oferta dirigida a',
          class: '',
          imagen: ''
        }
      ];

      for (var i = 0; i < this.ArrayCamposValida.length; i++) {
        if (this.ArrayCamposValida[i].campo == 'TipoCom') {
          if (this.SessionTipoComG == '' || this.SessionTipoComG == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine';
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png';
          }
        } else if (this.ArrayCamposValida[i].campo == 'ValorComicion') {
          if (this.SessionTipoComG == '1') {
            if (this.VlrComFijaG == '' || this.VlrComFijaG == null) {
              this.ArrayCamposValida[i].campof = 'Valor comisión fija';
              this.ArrayCamposValida[i].class = 'TextAlert';
              this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png';
            } else {
              this.ArrayCamposValida[i].campof = 'Valor comisión fija';
              this.ArrayCamposValida[i].class = 'TextFine';
              this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png';
            }
          } else if (this.SessionTipoComG == '2') {
            if (this.VlrComPorG == '' || this.VlrComPorG == null) {
              this.ArrayCamposValida[i].campof = 'Valor comisión porcentaje';
              this.ArrayCamposValida[i].class = 'TextAlert';
              this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png';
            } else {
              this.ArrayCamposValida[i].campof = 'Valor comisión porcentaje';
              this.ArrayCamposValida[i].class = 'TextFine';
              this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png';
            }
          }

        } else if (this.ArrayCamposValida[i].campo == 'TipoDesc') {
          if (this.SessionTipoDescuento == '0' || this.SessionTipoDescuento == null || this.SessionTipoDescuento == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        } else if (this.ArrayCamposValida[i].campo == 'TipoCupon') {
          if (this.IdTipoCupon == '0' || this.IdTipoCupon == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        } else if (this.ArrayCamposValida[i].campo == 'DescTipoCupon') {
          if (this.IdTipoCupon == '1') {
            if ((this.DescripcionRegalo == '' || this.DescripcionRegalo == null) || (this.NumeroUsuariosCupon == '' || this.NumeroUsuariosCupon == null) || (this.ImagenRegalo == './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png')) {
              this.ArrayCamposValida[i].campof = 'Campos regalo'
              this.ArrayCamposValida[i].class = 'TextAlert'
              this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
            }
            else {
              this.ArrayCamposValida[i].campof = 'Campos regalo'
              this.ArrayCamposValida[i].class = 'TextFine'
              this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
            }
          } else if (this.IdTipoCupon == '2') {
            if ((this.PorcDescLider == '' || this.PorcDescLider == null) || (this.UnidXGrupos == "" || this.UnidXGrupos == null)) {
              this.ArrayCamposValida[i].campof = 'Campos descuento'
              this.ArrayCamposValida[i].class = 'TextAlert'
              this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
            }
            else {
              this.ArrayCamposValida[i].campof = 'Campos descuento'
              this.ArrayCamposValida[i].class = 'TextFine'
              this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
            }
          } else if (Number(this.IdTipoCupon) < 1) {
            this.ArrayCamposValida[i].campof = 'Descripcion tipo regalo'
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
        } else if (this.ArrayCamposValida[i].campo == 'UndMin') {
          if ((this.MinUnidLider == '' || this.MinUnidLider == null)) {
            this.ArrayCamposValida[i].class = 'TextAlert';
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png';
          } else {
            this.ArrayCamposValida[i].class = 'TextFine';
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png';
          }
        } else if (this.ArrayCamposValida[i].campo == 'UndMax') {
          if ((this.MaxUnidLider == '' || this.MaxUnidLider == null)) {
            this.ArrayCamposValida[i].class = 'TextAlert';
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png';
          } else {
            this.ArrayCamposValida[i].class = 'TextFine';
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png';
          }
        } else if (this.ArrayCamposValida[i].campo == 'ValDomicilio') {
          if (valorDomicilio == false) {
            this.ArrayCamposValida[i].class = 'TextAlert';
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png';
          } else {
            this.ArrayCamposValida[i].class = 'TextFine';
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png';
          }
        } else if (this.ArrayCamposValida[i].campo == 'ValFinalParticipante') {
          if ((this.PrecioFinPart == '' || this.PrecioFinPart == null)) {
            this.ArrayCamposValida[i].class = 'TextAlert';
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png';
          } else {
            this.ArrayCamposValida[i].class = 'TextFine';
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png';
          }
        } else if (this.ArrayCamposValida[i].campo == 'OfertaDirigidaa') {
          if (this.IdOfertaDirigidaA == '' || this.IdOfertaDirigidaA == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
      }
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
    else {
      this.ValidaCam = '0';
      this.ArrayCamposValida = [];

      // bitly.shorten(this.RutaLanding +this.SessionSectorSel+'/'+this.SessionOferta+'/0/0').then(result => {  }catch{ }
      this.LinkSms = 'https://bit.ly/3HbpHIJ';

      let item = {
        TPO_CMSION_INDVDUAL: "0",
        VLOR_CMSION_INDVDUAL: "0",
        MNMO_UNDDES_INDVDUAL: "0",
        MXMO_UNDDES_INDVDUAL: "0",
        VLOR_DMNCLIO_INDVDUAL: "0",
        VLOR_FNAL_INDVDUAL: "0"
      };
      if (this.SessionTipoOferta == 3) {
        item = {
          TPO_CMSION_INDVDUAL: "0",
          VLOR_CMSION_INDVDUAL: "0",
          MNMO_UNDDES_INDVDUAL: "0",
          MXMO_UNDDES_INDVDUAL: "0",
          VLOR_DMNCLIO_INDVDUAL: "0",
          VLOR_FNAL_INDVDUAL: "0"
        }
      } else {
        item = {
          TPO_CMSION_INDVDUAL: this.SessionTipoComI,
          VLOR_CMSION_INDVDUAL: validacomision,
          MNMO_UNDDES_INDVDUAL: this.MinUnidLider,
          MXMO_UNDDES_INDVDUAL: this.MaxUnidLider,
          VLOR_DMNCLIO_INDVDUAL: this.VlrDomiI,
          VLOR_FNAL_INDVDUAL: this.PreFinI
        }
      }

      let SelectTipoCupon = {
        PRCNTJE_DCTO_LIDER: "0",
        MNMO_PRSNAS_XGRUPO: "0",

        DES_CUPONREGALO: "0",
        IMG_CUPONREGALO: "0"
      }
      if (Number(this.IdTipoCupon) == 1) {
        SelectTipoCupon = {
          PRCNTJE_DCTO_LIDER: "0",
          MNMO_PRSNAS_XGRUPO: "0",

          DES_CUPONREGALO: this.DescripcionRegalo,
          IMG_CUPONREGALO: this.NomImgRegalo
        }
      } else {
        SelectTipoCupon = {
          PRCNTJE_DCTO_LIDER: this.PorcDescLider,
          MNMO_PRSNAS_XGRUPO: this.UnidXGrupos,

          DES_CUPONREGALO: "0",
          IMG_CUPONREGALO: "0"
        }
      }
      const Body = {
        CD_CNSCTVO: this.SelectorOferta,
        TPO_OFRTA: this.SessionTipoOferta,
        TPO_CMSION_INDVDUAL: item.TPO_CMSION_INDVDUAL,
        VLOR_CMSION_INDVDUAL: item.VLOR_CMSION_INDVDUAL,
        MNMO_UNDDES_INDVDUAL: item.MNMO_UNDDES_INDVDUAL,
        MXMO_UNDDES_INDVDUAL: item.MXMO_UNDDES_INDVDUAL,
        VLOR_DMNCLIO_INDVDUAL: AuxValDomicilio,
        VLOR_FNAL_INDVDUAL: item.VLOR_FNAL_INDVDUAL,
        TPO_CMSION_GRPAL: Number(this.SessionTipoComG),
        VLOR_CMSION_GRPAL: validacomisionG,
        MNMO_UNDDES_LIDER: this.MinUnidLider,
        MXMO_UNDDES_LIDER: this.MaxUnidLider,
        PRCNTJE_DCTO_LIDER: SelectTipoCupon.PRCNTJE_DCTO_LIDER,
        VLOR_DMNCLIO_GRPAL: AuxValDomicilio,
        CNTDAD_GRPOS: 0,
        MNMO_PRSNAS_XGRUPO: SelectTipoCupon.MNMO_PRSNAS_XGRUPO,
        MNMO_UNDDES_PRCPNTE: this.MinUnidLider,
        MXMO_UNDDES_PRCPNTE: this.MaxUnidLider,
        CNTDAD_CMPRAS_INDVDLES: 0,
        VLOR_ARRNQUE_LIDER: this.PrecioFinLider,
        VLOR_FNAL_PRTCPNTE: this.PrecioFinPart,
        ID_SCTOR_OFRTA: this.SessionSectorSel,
        LINKLANDIGN: this.LinkSms,
        TPO_DESCUENTO: Number(this.SessionTipoDescuento),
        VALOR_REFERENCIA: "0",
        TIPO_CUPON: Number(this.IdTipoCupon),
        DES_CUPONREGALO: SelectTipoCupon.DES_CUPONREGALO,
        IMG_CUPONREGALO: SelectTipoCupon.IMG_CUPONREGALO,
        IDTIPODOMICILIO: this.IdDomicilio,
        VLORAPRTRDMCLIO: AuxValorApartirde,
        NumUsuaCupo: this.NumeroUsuariosCupon,
        DirigidaRegiVent: this.IdOfertaDirigidaA
      }
      this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
        this.Respuesta = '';
        var arreglores = ResultUpdate.split('|')
        this.Respuesta = arreglores[1];
        if (Number(arreglores[0]) > 0) {
          this.serviciosvaloracion.constextosoferta('1', this.SelectorOferta, this.SessionSectorSel).subscribe(ResultUpdate => {
            if (ResultUpdate.length > 0) {
              this.ArrayTextoModifica = ResultUpdate;
              if (this.ArrayTextoModifica[0].TextoSms == null || this.ArrayTextoModifica[0].TextoSms == undefined || this.ArrayTextoModifica[0].TextoSms == "") {
                this.ArrayTextoModifica[0].TextoSms = "@NombrePersona Tenemos una oferta de @NombreProducto para ti, adquiérela ingresando a " + this.UrlParticipanteC;
              }
              this.imagenesCorreo = ResultUpdate[0].ImgCorreo;
            }
          })
        }

      })
      this.MuestraValUnidades = '0';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }
  }

  EliminaValorUni(idValor: any) {
    const Body = {
      Cd_cnsctvo: Number(this.SelectorOferta),
      IdSector: Number(this.SessionSectorSel),
      IdValor: idValor.IdValor,
      ValorUnd: this.ValorUni
    }
    this.serviciosvaloracion.ModValoresUnidades('4', Body).subscribe(ResultOper => {
      this.Respuesta = ResultOper;
      this.consultaValoresUni();
    })
  }

  ActualizaValorReferencia(ValorReferencia: string, templateMensaje: any) {
    if (ValorReferencia != "" && ValorReferencia != "0" && ValorReferencia != null && ValorReferencia != undefined) {
      const Body = {
        CD_CNSCTVO: this.SelectorOferta,
        TPO_OFRTA: this.SessionTipoOferta,
        TPO_CMSION_INDVDUAL: "0",
        VLOR_CMSION_INDVDUAL: "0",
        MNMO_UNDDES_INDVDUAL: "0",
        MXMO_UNDDES_INDVDUAL: "0",
        VLOR_DMNCLIO_INDVDUAL: "0",
        VLOR_FNAL_INDVDUAL: "0",
        TPO_CMSION_GRPAL: 0,
        VLOR_CMSION_GRPAL: "0",
        MNMO_UNDDES_LIDER: "0",
        MXMO_UNDDES_LIDER: "0",
        PRCNTJE_DCTO_LIDER: "0",
        VLOR_DMNCLIO_GRPAL: "0",
        CNTDAD_GRPOS: "0",
        MNMO_PRSNAS_XGRUPO: "0",
        MNMO_UNDDES_PRCPNTE: "0",
        MXMO_UNDDES_PRCPNTE: "0",
        CNTDAD_CMPRAS_INDVDLES: "0",
        VLOR_ARRNQUE_LIDER: "0",
        VLOR_FNAL_PRTCPNTE: "0",
        ID_SCTOR_OFRTA: this.SessionSectorSel,
        LINKLANDIGN: "0",
        VALOR_REFERENCIA: ValorReferencia,
        TIPO_CUPON: 0,
        DES_CUPONREGALO: "0",
        IMG_CUPONREGALO: "0",
        IDTIPODOMICILIO: "0",
        VLORAPRTRDMCLIO: "0",
        NumUsuaCupo: 0
      }
      this.serviciosvaloracion.ActualizarOfertaValoracion('6', Body).subscribe(ResultUpdate => {
        var arreglores = ResultUpdate.split('|');
        if (arreglores[0].toString() != "-1") {
          this.ValidaToppings = '1';
          this.MuestraValUnidades = '1';

        }
        this.Respuesta = arreglores[1];
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
      });
    }
  }
  //#region AgregaPresentacionesProdAncla
  AbreModalPresentacioProdAncla(PresentacionesProdAncla: any) {

    this.ListaPresentacionesProdAncla();
    this.CargaListaPresentacionesProdAncla();
    this.modalService.open(PresentacionesProdAncla, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }
  ListaPresentacionesProdAncla() {
    this.serviciosvaloracion.consCRelacionProducTopping('4', this.SelectorOferta, this.SessionSectorSel).subscribe(Respu => {
      this.ArrayPresentacionesProdAncla = Respu;
    });
  }
  AgregarPresentacionProdPrin(bandera: string) {
    this.SmsError = "";

    if (this.UnidadesProdAncla == '' || this.UnidadesProdAncla == '0' || Number(this.UnidadesProdAncla) < 1) {
      this.SmsError = "Define agregar unidades para la oferta";
    } else if (this.MaxinoProdAncla == '' || this.MaxinoProdAncla == '0' || Number(this.MaxinoProdAncla) < 1) {
      this.SmsError = "Define la cantidad máxima por compra";
    } else if (this.PresentacionProdAncla == '') {
      this.SmsError = "Define la presentación";
    } else if (this.PesoPresentacionProdAncla == '' || this.PesoPresentacionProdAncla == '0' || Number(this.PesoPresentacionProdAncla) < 1) {
      this.SmsError = "Define el peso del producto";
    } else if (this.ValorProdAncla == '' || this.ValorProdAncla == '0' || Number(this.ValorProdAncla) < 1) {
      this.SmsError = "Define el Valor del producto en esta presentación";
    } else if (this.ValorReferenciaProdAncla == '' || this.ValorReferenciaProdAncla == '0' || Number(this.ValorReferenciaProdAncla) < 1) {
      this.SmsError = "Define su valor referencia";
    } else if (Number(this.ValorProdAncla) > Number(this.ValorReferenciaProdAncla)) {
      this.SmsError = "El valor real no puede ser mayor que el valor referencia";
    } else {
      this.SmsError = "";
      //Agrega la presentacion
      if (bandera == '5') {
        const body = {
          IdTopping: this.SelectorOferta,
          IdRelacion: 0,
          Presentacion: this.PresentacionProdAncla,
          ValorReal: this.ValorProdAncla,
          ValorReferencia: this.ValorReferenciaProdAncla,
          UnidadesOferta: this.UnidadesProdAncla,
          MximoUnidades: this.MaxinoProdAncla,
          Id_Sector: this.SessionSectorSel,
          PesoUnidad: this.PesoPresentacionProdAncla
        }
        this.serviciosvaloracion.modCRelacionProductoTopping('5', body).subscribe(Respu => {

          var split = Respu.toString().split("|");
          if (split[0] == "1") {
            this.ListaPresentacionesProdAncla();
            this.LimpiaCamposPresentacioProdAncla();
          } else {
            if (split.length > 0) {
              this.SmsError = split[1];
            } else {
              this.SmsError = split[0];
            }
          }
        });
      } else if (bandera == '3') {
        const body = {
          IdTopping: this.SelectorOferta,
          IdRelacion: this.AuxIdRelacion,
          Presentacion: this.PresentacionProdAncla,
          ValorReal: this.ValorProdAncla,
          ValorReferencia: this.ValorReferenciaProdAncla,
          UnidadesOferta: this.UnidadesProdAncla,
          MximoUnidades: this.MaxinoProdAncla,
          Id_Sector: this.SessionSectorSel,
          PesoUnidad: this.PesoPresentacionProdAncla
        }
        this.serviciosvaloracion.modCRelacionProductoTopping('3', body).subscribe(Respu => {
          var split = Respu.toString().split("|");
          if (split[0] == "1") {
            this.ListaPresentacionesProdAncla();
            this.LimpiaCamposPresentacioProdAncla();
          } else {
            if (split.length > 0) {
              this.SmsError = split[1];
            } else {
              this.SmsError = split[0];
            }
          }
        });
      }
    }
  }

  EditarAncla(producto: any) {
    this.AuxIdRelacion = producto.IdRelacion;
    this.UnidadesProdAncla = producto.cantidadReserva;
    this.MaxinoProdAncla = producto.MaxCantidad;
    this.PresentacionProdAncla = producto.Presentacion;
    this.ValorProdAncla = producto.ValorUnitario;
    this.ValorReferenciaProdAncla = producto.VlorRefencia;
    this.banderaAgregarAncla = '2';
    for (var i = 0; i < this.ArrayPresentacionesProdPrincipal.length; i++) {
      if (producto.Presentacion == this.ArrayPresentacionesProdPrincipal[i].des_empaque) {
        this.IndexPresentacionProdAncla_ = i;
        break;
      }
    }
  }


  ConfirmacionEliminarProdPrincipal(item: any, ModalConfirmacion: any) {
    this.SmsError = "";
    this.itemEliminar = item;
    this.DescripcionPresentacion = item.Presentacion;
    this.modalService.open(ModalConfirmacion, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  EliminaPresentacionProdPinsipal() {
    const body = {
      IdTopping: this.SelectorOferta,
      IdRelacion: this.itemEliminar.IdRelacion,
      Presentacion: this.itemEliminar.Presentacion,
      ValorReal: this.itemEliminar.ValorUnitario,
      ValorReferencia: this.itemEliminar.VlorRefencia,
      UnidadesOferta: this.itemEliminar.cantidadReserva,
      MximoUnidades: this.itemEliminar.MaxCantidad,
      Id_Sector: this.SessionSectorSel,
      PesoUnidad: this.itemEliminar.PesoKilos
    }
    this.serviciosvaloracion.modCRelacionProductoTopping('6', body).subscribe(Respu => {
      var split = Respu.toString().split("|");
      if (split[0] == "1") {
        this.ListaPresentacionesProdAncla();
        this.LimpiarCamposModalPresentacion();
      } else {
        this.SmsError = split[1].toString();
      }
    });
  }


  LimpiaCamposPresentacioProdAncla() {
    this.UnidadesProdAncla = "";
    this.MaxinoProdAncla = "";
    this.LimpiaPresentacionProdAncla();
    this.ValorProdAncla = "";
    this.ValorReferenciaProdAncla = "";
    this.banderaAgregarAncla = '1';
  }
  //#endregion AgregaPresentacionesProdAncla

  ValorDesc: string = '';
  PorcentajeDesc: string = '';
  DataValDesc: any[];

  AgregarDescuento() {
    if (this.ValorDesc == null || this.ValorDesc == '' || this.ValorDesc == undefined) {
      this.Respuesta = 'El campo Valor es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else if (this.PorcentajeDesc == null || this.PorcentajeDesc == '' || this.PorcentajeDesc == undefined) {
      this.Respuesta = 'El campo Porcentaje es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else {
      const Body = {
        Cd_cnsctvo: this.SelectorOferta,
        Id_sector: this.SessionSectorSel,
        ValorDesde: this.ValorDesc,
        PorceDescuento: this.PorcentajeDesc
      }
      this.serviciosvaloracion.ModDescuento("1", Body).subscribe(ResultOper => {
        this.Respuesta = ResultOper;
        console.log(ResultOper);
        this.ValorDesc = '';
        this.PorcentajeDesc = '';
        this.consultaDescuento();
      })

    }
  }
  
  EliminaDescuento(idValor: any) {
    const Body = {
      Cd_cnsctvo: idValor.Cd_cnsctvo,
      Id_sector: idValor.id_sctor,
      ValorDesde: idValor.ValorDesde,
      PorceDescuento: idValor.Descuento
    }
    this.serviciosvaloracion.ModDescuento("2", Body).subscribe(ResultOper => {
      this.Respuesta = '';     
      var respuesta = ResultOper.split('|')
      this.Respuesta = respuesta[1];
      this.consultaDescuento();
    })
  }

  consultaDescuento() {
    this.serviciosvaloracion.ConsultaDescuento('1', this.SelectorOferta, this.SessionSectorSel).subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        this.DataValDesc = Resultcons;
      }
      else {
        this.DataValDesc = [];
      }
    })
  }


  AgregaValorUni(templateMensaje: any) {
    var auxmaxunidades: number = 0;

    if (this.MuestraGrupal == '1') {
      auxmaxunidades = parseInt(this.MaxUnidLider);
    } else if (this.MuestraIndividual == '1') {
      auxmaxunidades = parseInt(this.MaxUnidI)
    }



    if (this.DataValores.length < auxmaxunidades) {
      this.Respuesta = ''
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' });
      if (this.ValorUni == '' || this.ValorUni == null || this.ValorUni == '0') {
        this.ValidaCam = '1';
        this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
        this.ArrayCamposValida = [
          {
            campo: 'ValorUni',
            campof: 'Valor',
            class: '',
            imagen: ''
          }
        ]
        for (var i = 0; i < this.ArrayCamposValida.length; i++) {
          if (this.ArrayCamposValida[i].campo == 'ValorUni') {
            if (this.ValorUni == '' || this.ValorUni == null) {
              this.ArrayCamposValida[i].class = 'TextAlert'
              this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
            }
            else {
              this.ArrayCamposValida[i].class = 'TextFine'
              this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
            }
          }
        }
      }
      else {
        this.ValidaCam = '0';
        this.ArrayCamposValida = [];

        const Body = {
          Cd_cnsctvo: Number(this.SelectorOferta),
          IdSector: Number(this.SessionSectorSel),
          IdValor: 0,
          ValorUnd: this.ValorUni
        }
        this.serviciosvaloracion.ModValoresUnidades('2', Body).subscribe(ResultOper => {
          this.Respuesta = ResultOper;
          this.consultaValoresUni();
        })
        this.ValorUni = '';

      }
    } else {
      this.Respuesta = "No es posible agregar una nueva referencia de compra, ya que has llegado al máximo permito por las unidades a comprar";
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' });
    }
  }

  selectTipTopp(item: any) {
    // item.id 1 producto adicional, 2 caracteristicaSobre El producto
    this.SessionTipoTopp = item.id;
    if (item.id == 2) {
      this.VerTipoDescripcion = "1";
      this.ValidaTipoTopp = true;
      this.UnidMaxTopp = '1';
      this.UnidOferta = this.DataSectores[0].CNTDAD;
      this.IsEnables = true;
      this.imagenesAdicionales = '1';
    }
    else {
      this.ListaProductos();
      this.VerTipoDescripcion = "2";
      this.ValidaTipoTopp = false;
      this.UnidMaxTopp = '5';
      this.UnidOferta = '30';
      this.IsEnables = false;
      this.imagenesAdicionales = '';
    }
  }

  LimpiaTipoToppVenta() {
    this.SessionTipoTopp = '0';
  }

  LimpiaTipoTopp() {

    this.VerTipoDescripcion = "0";
    this.SessionTipoTopp = '0';
    this.ValidaTipoTopp = false;
    this.IsEnables = false;
    this.LimpiaProductoTopp();
  }

  selectTipToppVenta(item: any) {
    this.SessionTipoToppVenta = item.IdTipo;
    this.DescripTipoVenta = item.Observacion;
    if (item.IdTipo == '1') {
      this.IsEnablesValor = false;
    } else {
      this.IsEnablesValor = true;
      this.VlrUniTopp = '0';
      this.ValorRefAdd = '0';
    }
  }

  public CargaImagenAdicionales(event: any, imagen: string, modalmensaje: any) {
    if (!(/\.(jpg|png|jpeg)$/i).test(event.target.files[0].name)) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, valide la extención, las permitidas son .jpg .png .jpeg";
    }
    else if (event.target.files[0].name.includes(" ")) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, el nombre no debe contener espacios";
    }
    else if (event.target.files[0].size > 1300000) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El peso del archivo no puede exceder 1.3 megabyte";
    } else {
      this.serviciosvaloracion.postImgToppings(event.target.files[0]).subscribe(
        response => {
          if (response == 'Archivo Subido Correctamente') {
            if (imagen == '1') {
              this.Add1 = this.RutaImagenTopping + event.target.files[0].name;
              this.NomImagen1 = event.target.files[0].name;
            }
            if (imagen == '2') {
              this.Add2 = this.RutaImagenTopping + event.target.files[0].name;
              this.NomImagen2 = event.target.files[0].name;
            }
            if (imagen == '3') {
              this.Add3 = this.RutaImagenTopping + event.target.files[0].name;
              this.NomImagen3 = event.target.files[0].name;
            }

            //this.imagenesAdicionales = event.target.files[0].name;
            this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
            this.Respuesta = "Imagen cargada correctamente.";
            event.target.value = '';
          }
        },
        error => {
          this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.Respuesta = "No hemos podido subir el archivo, intente nuevamente.";
        }
      );
    }
  }

  GuardaTopping(templateMensaje: any) {
    this.ArrayCamposValida = [];
    this.Respuesta = ''
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' });


    var auxPresentacion: boolean = false;
    if (this.VerTipoDescripcion == "2" && (this.Presentacion == "" || this.Presentacion == null)) {
      auxPresentacion = true;
    }

    var auxPesoTopping: boolean = false;
    if (this.VerTipoDescripcion == "2" && (this.PesoPresentacion == "0" || this.PesoPresentacion == null)) {
      auxPesoTopping = true;
    }

    if (this.ProdTipoTpp == '' || this.VlrUniTopp == null || this.ValorRefAdd == null || this.DescCortaAdd == '' || this.DescCortaAdd == null ||
      this.DescLargaAdd == '' || this.DescLargaAdd == null || this.UnidMaxTopp == '' || this.SessionTipoTopp == '0' ||
      this.UnidOferta == '' || (this.NomImagen1 == '' || this.NomImagen1 == null) || this.SessionTipoToppVenta == '0' || this.ProdTipoTpp == '' || this.ProdTipoTpp == null || auxPresentacion == true) {
      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'DesTopp',
          campof: 'Descripción',
          class: '',
          imagen: ''
        },
        {
          campo: 'VlrUniTopp',
          campof: 'Valor unitario',
          class: '',
          imagen: ''
        },
        {
          campo: 'ValorRefAdd',
          campof: 'Valor referencia',
          class: '',
          imagen: ''
        },
        {
          campo: 'DescCortaAdd',
          campof: 'Descripción corta',
          class: '',
          imagen: ''
        },
        {
          campo: 'DescLargaAdd',
          campof: 'Descripción larga',
          class: '',
          imagen: ''
        },
        {
          campo: 'SessionTipoTopp',
          campof: 'Tipo',
          class: '',
          imagen: ''
        },
        {
          campo: 'SessionTipoToppVenta',
          campof: 'Tipo venta topping',
          class: '',
          imagen: ''
        },
        {
          campo: 'UnidOferta',
          campof: 'Unidades para la oferta',
          class: '',
          imagen: ''
        },
        {
          campo: 'UnidMaxTopp',
          campof: 'Maximo unidades por cada compra',
          class: '',
          imagen: ''
        },
        // {
        //   campo: 'PesoTopping',
        //   campof: 'Peso de adición (kilogramos)',
        //   class: '',
        //   imagen: ''
        // },
        {
          campo: 'NomImagen1',
          campof: 'Imagen',
          class: '',
          imagen: ''
        }
      ];
      if (this.VerTipoDescripcion == "2") {
        this.ArrayCamposValida.push({
          campo: 'Presentacion',
          campof: 'Presentación',
          class: '',
          imagen: ''
        });
      }
      if (this.VerTipoDescripcion == "2") {
        this.ArrayCamposValida.push({
          campo: 'PesoTopping',
          campof: 'Peso de adición (kilogramos)',
          class: '',
          imagen: ''
        });
      }


      for (var i = 0; i < this.ArrayCamposValida.length; i++) {
        if (this.ArrayCamposValida[i].campo == 'DesTopp') {
          if (this.ProdTipoTpp == '' || this.ProdTipoTpp == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'VlrUniTopp') {
          if (this.VlrUniTopp == null || this.VlrUniTopp == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'ValorRefAdd') {
          if (this.ValorRefAdd == null || this.ValorRefAdd == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'DescCortaAdd') {
          if (this.DescCortaAdd == null || this.DescCortaAdd == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'DescLargaAdd') {
          if (this.DescLargaAdd == null || this.DescLargaAdd == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'SessionTipoTopp') {
          if (this.SessionTipoTopp == '0' || this.SessionTipoTopp == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'SessionTipoToppVenta') {
          if (this.SessionTipoToppVenta == '0' || this.SessionTipoToppVenta == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'UnidMaxTopp') {
          if (this.UnidMaxTopp == '' || this.UnidMaxTopp == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'UnidOferta') {
          if (this.UnidOferta == '' || this.UnidOferta == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        } else if (this.ArrayCamposValida[i].campo == 'PesoTopping' && this.VerTipoDescripcion == "2") {
          if (this.PesoPresentacion == '0' || this.PesoPresentacion == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'NomImagen1') {
          if (this.NomImagen1 == '' || this.NomImagen1 == null || this.NomImagen1 == './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          } else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        } else if (this.ArrayCamposValida[i].campo == 'Presentacion' && this.VerTipoDescripcion == "2") {
          if (this.Presentacion == '' || this.Presentacion == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
      }
    }
    else {

      var AuxIdProdTopping: string = "0";
      var Auxpresentacion: string = "0";

      if (this.VerTipoDescripcion == "2") {
        AuxIdProdTopping = this.IdProdTipoTopping;
        Auxpresentacion = this.Presentacion;
      }


      this.ValidaCam = '0';
      this.ArrayCamposValida = [];

      const Body = {
        IdTopping: 0,
        Id_Sector: Number(this.SessionSectorSel),
        cd_cnctivo: Number(this.SelectorOferta),
        Descricpcion: this.ProdTipoTpp,
        MaxCantidad: Number(this.UnidMaxTopp),
        IdTipoTopping: Number(this.SessionTipoTopp),
        ValorUnitario: Number(this.VlrUniTopp),
        cantidadReserva: Number(this.UnidOferta),
        imagen: this.NomImagen1,
        PesoKiloUnd: this.PesoPresentacion,
        CrctrzcionCrta: this.DescCortaAdd,
        CrctrzcionLrga: this.DescLargaAdd,
        ImgDos: this.NomImagen2,
        ImgTres: this.NomImagen3,
        VlorRefencia: this.ValorRefAdd,
        IdTipoTopingVenta: this.SessionTipoToppVenta,
        IdProdTopin: AuxIdProdTopping,
        PresentacionProd: Auxpresentacion,
        IdCampesino: this.IdCampesino,
        UnidadesPeso: this.UnidadesPeso,
        DefectoUnidadesPeso: this.DefectoUndPeso
      }
      this.serviciosvaloracion.ModificaTopping('2', Body).subscribe(ResultOper => {
        this.Respuesta = ResultOper;
        this.consultaToppingsOferta();
        this.DesCampesino = '';
        this.DesTopp = '';
        this.VlrUniTopp = '';
        this.SessionTipoTopp = '0';
        this.SessionTipoToppVenta = '0';
        this.TipoTopp = '';
        this.TipoToppVenta = '';
        this.DescripTipoVenta = '';
        this.UnidMaxTopp = '';
        this.UnidOferta = '';
        this.ValidaTipoTopp = false;
        this.IsEnables = false;
        this.imagenesAdicionales = '';
        this.DescCortaAdd = '';
        this.DescLargaAdd = '';
        this.ValorRefAdd = '';
        this.NomImagen1 = '';
        this.NomImagen2 = '';
        this.NomImagen3 = '';
        this.Add1 = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
        this.Add2 = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
        this.Add3 = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';

        this.LimpiaProductoTopp();
      })
    }
  }

  consultaToppingsOferta() {
    this.serviciosvaloracion.ConsultaToppingOfer('5', this.SessionSectorSel, this.SelectorOferta, '0').subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        this.DataToppings = Resultcons;
        this.ValidaConsulta = '0';
      }
      else {
        this.DataToppings = [];
        this.ValidaConsulta = '1';
      }
    })
  }

  ModificaTopping(bandera: string, topping: any, templateMensaje: any) {
    const Body = {
      IdTopping: topping.IdTopping,
      Id_Sector: Number(this.SessionSectorSel),
      cd_cnctivo: Number(this.SelectorOferta),
      Descricpcion: topping.Descripcion,
      MaxCantidad: topping.MaxCantidad,
      IdTipoTopping: topping.IdTipoTopping,
      ValorUnitario: topping.ValorUnitario,
      cantidadReserva: topping.cantidadReserva,
    }
    if (bandera == '1') {
      if (topping.Estado == '1') {
        this.serviciosvaloracion.ModificaTopping('4', Body).subscribe(ResultOper => {
          this.consultaToppingsOferta();
        })
      }
      else {
        this.serviciosvaloracion.ModificaTopping('5', Body).subscribe(ResultOper => {
          this.consultaToppingsOferta();
        })
      }
    }
    else {
      this.serviciosvaloracion.ModificaTopping('3', Body).subscribe(ResultOper => {
        this.consultaToppingsOferta();
        this.Respuesta = ResultOper
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' });
      })
    }
  }

  ArrayToppingSeleccionado: any[] = [];
  visualizaImagenTopping(ModalImagen: any, topping: any) {
    this.ArrayToppingSeleccionado = [];
    const propiedadesImagenes = ['imagen', 'ImgDos', 'ImgTres'];
    // Verifica y agrega las imágenes al ArrayToppingSeleccionado
    for (const propiedad of propiedadesImagenes) {
      if (topping[propiedad] !== null && topping[propiedad] !== undefined) {
        this.ArrayToppingSeleccionado.push({ imagen: topping[propiedad] });
      }
    }
    const tieneImagenDos = this.ArrayToppingSeleccionado.some(item => item.ImgDos);
    const tieneImagenTres = this.ArrayToppingSeleccionado.some(item => item.ImgTres);
    this.ArrayToppingSeleccionado = this.ArrayToppingSeleccionado.filter(item => {
      if (tieneImagenDos && tieneImagenTres) {
        return item.imagen || item.ImgDos || item.ImgTres;
      } else if (tieneImagenDos) {
        return item.imagen || item.ImgDos;
      } else if (tieneImagenTres) {
        return item.imagen || item.ImgTres;
      } else {
        return item.imagen;
      }
    });
    this.modalService.open(ModalImagen, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }
  Consultatoppings() {
    this.serviciosvaloracion.ConsultaTipoTopping('1').subscribe(Resultcons => {
      this.DataTipotopping = Resultcons;
      this.keywordTipTopp = 'Descripcion';
    })

    this.serviciosvaloracion.consCTipoTpingVenta('1').subscribe(Resultcons => {
      this.DataTipotoppingVenta = Resultcons;
      this.keywordTipToppVenta = 'Descripcion';
      //IdTipo
    })
  }

  //#region Textosparaoferta
  //Modulo Textosparaoferta 
  TextMod1: string = '';
  TextMod2: string = '';
  TextMod3: string = '';
  AddModal: string = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  DataTxtModal: any = [];
  NomImagenTxt: string = '';

  LimpiarTextosModals() {
    this.TextMod1 = '';
    this.TextMod2 = '';
    this.TextMod3 = '';
    this.AddModal = './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  }

  GrillaTextoModal() {
    this.serviciosvaloracion.ConsultaTextosModal('4', this.SelectorOferta, this.SessionSectorSel).subscribe(Respu => {
      this.DataTxtModal = Respu;
    });
  }
  PrecargarInfo() {
    this.serviciosvaloracion.ConsultaTextosModal('4', '0', '0').subscribe(Respu => {
      this.TextMod1 = Respu[0].TextoUno;
      this.TextMod2 = Respu[0].TextoDos;
      this.TextMod3 = Respu[0].TextoTres;
      this.AddModal = Respu[0].ImagenUno;
      // Obtén el nombre del archivo de la URL
      const url = Respu[0].ImagenUno;
      const nombreArchivo = this.obtenerNombreArchivo(url);
      this.NomImagenTxt = nombreArchivo;
    });
  }

  obtenerNombreArchivo(url: string): string {
    const partesURL = url.split('/');
    const nombreArchivo = partesURL[partesURL.length - 1];
    return nombreArchivo;
  }

  GuardarTxtModal(templateMensaje: any) {
    this.ArrayCamposValida = [];
    this.Respuesta = ''
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' });
    if (this.TextMod1 == '' || this.TextMod1 == null || this.TextMod2 == null || this.TextMod2 == '' || this.TextMod3 == null ||
      this.TextMod3 == '' || (this.NomImagenTxt == '' || this.NomImagenTxt == null)) {
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [

        {
          campo: 'TextMod1',
          campof: 'Texto modal uno',
          class: '',
          imagen: ''
        },
        {
          campo: 'TextMod2',
          campof: 'Texto modal dos',
          class: '',
          imagen: ''
        },
        {
          campo: 'TextMod3',
          campof: 'Texto modal tres',
          class: '',
          imagen: ''
        },
        {
          campo: 'NomImagenTxt',
          campof: 'Imagen modal',
          class: '',
          imagen: ''
        }
      ]
      for (var i = 0; i < this.ArrayCamposValida.length; i++) {
        if (this.ArrayCamposValida[i].campo == 'TextMod1') {
          if (this.TextMod1 == '' || this.TextMod1 == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'TextMod2') {
          if (this.TextMod2 == null || this.TextMod2 == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'TextMod3') {
          if (this.TextMod3 == null || this.TextMod3 == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }

        else if (this.ArrayCamposValida[i].campo == 'NomImagenTxt') {
          if (this.NomImagenTxt == '' || this.NomImagenTxt == null || this.NomImagenTxt == './../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          } else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
      }
    }
    else {
      this.ArrayCamposValida = [];
      const Body = {
        cd_cnsctivo: this.IdOferta,
        idsector: this.SessionSectorSel,
        ModalRegistroTextoUno: this.TextMod1,
        ModalRegistroTextoDos: this.TextMod2,
        ModalRegistroTextoTres: this.TextMod3,
        ModalRegistroImagenUno: this.NomImagenTxt
      }
      this.serviciosvaloracion.GuardarTextosModal('4', Body).subscribe(Respu => {
        this.Respuesta = Respu;
        this.GrillaTextoModal();
        this.LimpiarTextosModals();
      });
    }
  }

  public CargaImagenTxtModal(event: any, modalmensaje: any) {
    if (!(/\.(jpg|png|jpeg)$/i).test(event.target.files[0].name)) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, valide la extención, las permitidas son .jpg .png .jpeg";
    }
    else if (event.target.files[0].name.includes(" ")) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, el nombre no debe contener espacios";
    }
    else if (event.target.files[0].size > 1300000) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El peso del archivo no puede exceder 1.3 megabyte";
    } else {
      this.serviciosvaloracion.postImgToppings(event.target.files[0]).subscribe(
        response => {
          if (response == 'Archivo Subido Correctamente') {

            this.AddModal = this.RutaImagenTopping + event.target.files[0].name;
            this.NomImagenTxt = event.target.files[0].name;

            //this.imagenesAdicionales = event.target.files[0].name;
            this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
            this.Respuesta = "Imagen cargada correctamente.";
            event.target.value = '';
          }
        },
        error => {
          this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.Respuesta = "No hemos podido subir el archivo, intente nuevamente.";
        }
      );
    }
  }
  ArrayModalSelec: any[] = [];
  visualizaImagenModal(ModalImagen: any, imagen: any) {
    this.ArrayModalSelec = [];
    const propiedadesImagenes = ['ImagenUno'];
    // Verifica y agrega las imágenes al ArrayToppingSeleccionado
    for (const propiedad of propiedadesImagenes) {
      if (imagen[propiedad] !== null && imagen[propiedad] !== undefined) {
        this.ArrayModalSelec.push({ imagen: imagen[propiedad] });
      }
    }
    const ImagenM = this.ArrayModalSelec.some(item => item.ImagenUno);

    this.ArrayModalSelec = this.ArrayModalSelec.filter(item => {
      if (ImagenM) {
        return item.ImagenUno
      }
    });
    this.modalService.open(ModalImagen, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }


  //#endregion Textosparaoferta

  UnidadesPeso: string = '';
  DefectoUndPeso: string = '';

  //Topping principal
  CargaListaPresentaciones(IdProd: string) {
    this.serviciosvaloracion.ConsultaPresentaciones(IdProd).subscribe(Respu => {
      this.ArrayPresentaciones = Respu;
    });
  }
  SelectPresentacion(item: any) {
    this.PresentacionSelect = item.des_empaque;
    this.PesoPresentacion = item.PESO;
    this.Presentacion = item.des_empaque;
    this.UnidadesPeso = item.unidades;
    this.DefectoUndPeso = item.defecto;

  }
  LimpiaPresentacion() {
    this.PresentacionSelect = "";
    this.PesoPresentacion = '0';
    this.Presentacion = "0";
  }

  //ProdAncla
  CargaListaPresentacionesProdAncla() {
    this.serviciosvaloracion.ConsultaPresentaciones(this.IdProductoAncla_).subscribe(Respu => {
      this.ArrayPresentacionesProdPrincipal = Respu;
    });
  }
  SelectPresentacionRodAncla(item: any) {
    this.PresentacionProdAnclaSelect = item.des_empaque;
    this.PesoPresentacionProdAncla = item.PESO;
    this.PresentacionProdAncla = item.des_empaque;
  }
  LimpiaPresentacionProdAncla() {
    this.PresentacionProdAnclaSelect = "";
    this.PesoPresentacionProdAncla = '0';
    this.PresentacionProdAncla = "0";
    this.IndexPresentacionProdAncla_ = -1;
  }


  UniProdTpp: string = '';
  DefectoUniProdTpp: string = '';
  //Toping
  CargaListaPresentacionesTopping() {
    this.serviciosvaloracion.ConsultaPresentaciones(this.IdProductoTopping_).subscribe(Respu => {
      this.ArrayPresentacionesTopping = Respu;
    });
  }
  SelectPresentacionTopping(item: any) {
    this.PresentacionToppingSelect = item.des_empaque;
    this.PesoPresentacionTopping = item.PESO;
    this.PresentacionTopping = item.des_empaque;
    this.UniProdTpp = item.unidades;
    this.DefectoUniProdTpp = item.defecto;
  
  }
  LimpiaPresentacionTopping() {
    this.PresentacionToppingSelect = "";
    this.PesoPresentacionTopping = '0';
    this.PresentacionTopping = "0";
    this.IndexPresentacionTopping_ = -1;
  }


  ConsultaCampesino() {
    const Data = {
      CD_TPO_PRSNA: 1,
      CORREO_PERSONA: "0",
      CELULAR_PERSONA: "0",
      DOCUMENTO_USUARIO: "0",
      NOMBRES_PERSONA: "0"
    }
    this.serviciosreportes.ConsultaListaPersona('3', Data).subscribe(Resultado => {
      this.ArrayCampesino = Resultado;
    })
  }

  selectCampesino(item: any) {
    this.IdCampesino = item.USUCODIG;
    this.DesCampesino = item.NOMBRES_PERSONA;
  }




  //#region AdminOrdenProd
  AbreModalOrden(AdminOrdenProd: any) {
    this.ArrayPresentacionesProdSelect = [];
    this.ArrayProdAdminOrden = [];
    this.modalService.open(AdminOrdenProd, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
    this.ConsultaProd();

  }


  ConsultaProd() {
    this.ArrayProdAdminOrden = [];
    this.serviciosvaloracion.ConsultaProdOferta('1', this.SelectorOferta, this.SessionSectorSel).subscribe(Respu => {
      for (var i = 0; i < Respu.length; i++) {
        this.ArrayProdAdminOrden.push({ Id: Respu[i].Id, IdProducto: Respu[i].IdProducto, ancla: Respu[i].ancla, NombreProducto: Respu[i].NombreProducto, Imagen: Respu[i].Imagen, Orden: Respu[i].Orden, Check: false });
      }
    });
  }
  dropProd(event: CdkDragDrop<string[]>, Array: any) {
    moveItemInArray(Array, event.previousIndex, event.currentIndex);
    var cadenaorden: string = "";
    for (var i = 0; i < this.ArrayProdAdminOrden.length; i++) {
      if (this.ArrayProdAdminOrden[i].ancla.toString() == "2") {
        cadenaorden += "-" + this.ArrayProdAdminOrden[i].IdProducto + "|";
      } else {
        cadenaorden += this.ArrayProdAdminOrden[i].IdProducto + "|";
      }
    }
    const body = {
      CadenaOrden: cadenaorden
    }
    this.serviciosvaloracion.ModOrdenProductos('1', body).subscribe(Respu => {
      this.consultaToppingsOferta();
    });
  }
  SelectProducto(item: any) {
    const Position = this.ArrayProdAdminOrden.findIndex((obj: any) => obj.Id === item.Id);
    this.ArrayProdAdminOrden[Position].Check = true;
    for (var i = 0; i < this.ArrayProdAdminOrden.length; i++) {
      if (this.ArrayProdAdminOrden[i].Id != item.Id) {
        this.ArrayProdAdminOrden[i].Check = false;
      }
    }
    if (this.ArrayProdAdminOrden[Position].ancla.toString() == "2") {
      this.ListPresentacionesProdAnclaSelect(item.IdProducto);
    } else {
      this.ListPresentacionesToopingSelect(item.IdProducto);
    }
  }



  ListPresentacionesProdAnclaSelect(IdProd: string) {
    this.ArrayPresentacionesProdSelect = [];
    this.serviciosvaloracion.consCRelacionProducTopping('4', IdProd, this.SessionSectorSel).subscribe(Respu => {
      this.ArrayPresentacionesProdSelect = Respu;
    });
  }
  ListPresentacionesToopingSelect(IdProd: string) {
    this.ArrayPresentacionesProdSelect = [];
    this.serviciosvaloracion.consCRelacionProducTopping('1', IdProd, this.SessionSectorSel).subscribe(Respu => {
      this.ArrayPresentacionesProdSelect = Respu;
    });
  }
  dropPresentacion(event: CdkDragDrop<string[]>, Array: any) {
    moveItemInArray(Array, event.previousIndex, event.currentIndex);
    var cadenaorden: string = "";
    for (var i = 0; i < this.ArrayPresentacionesProdSelect.length; i++) {
      if (this.ArrayPresentacionesProdSelect[i].Ancla.toString() == "2") {
        cadenaorden += "-" + this.ArrayPresentacionesProdSelect[i].IdRelacion + "|";
      } else {
        cadenaorden += this.ArrayPresentacionesProdSelect[i].IdRelacion + "|";
      }
    }
    const body = {
      CadenaOrden: cadenaorden
    }
    this.serviciosvaloracion.ModOrdenPresentaciones('1', body).subscribe(Respu => {
    });
  }


  SelectVerPrimero(item: any) {
    const body = {
      Ancla: item.Ancla,
      IdProducto: item.IdRelacion,
      Cd_cnsctvo: this.SelectorOferta,
      Id_Sector: this.SessionSectorSel
    }
    this.serviciosvaloracion.ModVerPrimeroLista('1', body).subscribe(Respu => {

      for (var i = 0; i < this.ArrayPresentacionesProdSelect.length; i++) {
        if (item.IdRelacion == this.ArrayPresentacionesProdSelect[i].IdRelacion) {
          this.ArrayPresentacionesProdSelect[i].PrimeroVer = "1";
        } else {
          this.ArrayPresentacionesProdSelect[i].PrimeroVer = null;
        }
      }
    });

  }
  //#endregion AdminOrdenProd

}