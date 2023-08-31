import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { Router } from '@angular/router'
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { DatePipe } from '@angular/common';
import { CrearofertaService } from 'src/app/core/crearoferta.service';
//import { BitlyClient } from 'bitly';
//const bitly = new BitlyClient('07d0baa590598f6b9a8d9963c05d2b1a37f2e824', {});

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css']
})
export class ValoracionComponent implements OnInit {
  SessionOferta: any;
  DataOferta: any[] = [];
  keyword: string = '';
  keywordSec: string = '';
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
  SessionIdUsuario: any;
  DataSectores: any[];
  RutaImagen: string;
  ValidaTipoOfer: string;
  CodigoOferSector: any;
  VlrFletSect: any;
  MuestraCantIndiv: string;
  SessionCantSector: any;
  SessionSectorSel: any;
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
  DataToppings: any[];
  ValidaConsulta: string = '0';
  txtValidaCons: string = 'No se encuentran adicionales asociados a la oferta';
  DesTopp: string = '';
  VlrUniTopp: string;
  UnidMaxTopp: string;
  SessionTipoTopp: string = '';
  ValidaTipoTopp: boolean;
  keywordTipTopp: string;
  TipoTopp: string;
  SessionFechaRecogida: any;
  UnidOferta: string;
  imagenesAdicionales: string = '';
  imagenesCorreo: string = '';
  consultaimagen: string = '';
  RutaImagenTopping: string = '';
  IsEnables: boolean = false;
  LinkSms: string = '';
  RutaLanding: string = '';
  DataTipoDescuento: { id: number; name: string; }[];
  SessionTipoDescuento: string = '';
  ArrayTextoModifica: any = [];
  Previsucorreo: string = '';
  EnvioCorreo: boolean = false;
  EnvioSms: boolean = false;
  UrlPubli: string = '';
  UrlParticipante: string = '';
  IdOferta: string;
  UrlParticipanteC: any;
  UrlPubliC: any;
  PesoTopping: string = '';
  RutaImagenes: string = "";

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


  constructor(private ServiciosOferta: CrearofertaService, private serviciosvaloracion: ValorarofertaService, ConfigAcord: NgbAccordionConfig, private modalService: NgbModal, private cookies: CookieService, public rutas: Router, private SeriviciosGenerales: MetodosglobalesService, private formatofecha: DatePipe) {
    ConfigAcord.closeOthers = true;
  }

  ngOnInit(): void {
    this.ConsultaCupones();

    this.CargaInfoCupon();
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
    this.SessionTipoTopp = '0';
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
    this.UnidOferta = '';
    this.DataValores = [];
    this.DataToppings = [];
    this.RutaImagen = this.SeriviciosGenerales.RecuperaRutaImagenes();
    this.RutaLanding = this.SeriviciosGenerales.RecuperarRutaVista('1');
    this.RutaImagenTopping = this.SeriviciosGenerales.RecuperarRutasOtrasImagenes('4');
    this.SessionOferta = this.cookies.get('IDO');
    this.SessionIdUsuario = this.cookies.get('IDU');
    this.ConsultaDetalleOferta();
    this.ConsultaSectores();
    this.Consultatoppings();
  }
  consultaToppingsOferta() {
    this.serviciosvaloracion.ConsultaToppingOfer('5', this.SessionSectorSel, this.SessionOferta, '0').subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        this.DataToppings = Resultcons;
        this.ValidaConsulta = '0';
      }
      else {
        this.DataToppings = [];
        this.ValidaConsulta = '1';
      }

      this.CargarTextoCorreoIndividual();
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
          Cd_cnsctvo: Number(this.SessionOferta),
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

  EliminaValorUni(idValor: any) {
    const Body = {
      Cd_cnsctvo: Number(this.SessionOferta),
      IdSector: Number(this.SessionSectorSel),
      IdValor: idValor.IdValor,
      ValorUnd: this.ValorUni
    }
    this.serviciosvaloracion.ModValoresUnidades('4', Body).subscribe(ResultOper => {
      this.Respuesta = ResultOper;
      this.consultaValoresUni();
    })
  }

  consultaValoresUni() {
    this.serviciosvaloracion.ConsultaValUnidades('1', this.SessionOferta, this.SessionSectorSel).subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        this.DataValores = Resultcons;
        this.PrecioFinPart = this.DataValores[0].ValorUnidad;
      }
      else {
        this.DataValores = [];
      }
    })
  }

  GuardaTopping(templateMensaje: any) {
    this.Respuesta = ''
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' });
    if (this.DesTopp == '' || this.VlrUniTopp == null || this.UnidMaxTopp == '' || this.SessionTipoTopp == '0' || this.UnidOferta == '' || this.imagenesAdicionales == '' || this.PesoTopping == '') {
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
          campo: 'SessionTipoTopp',
          campof: 'Tipo',
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
        {
          campo: 'PesoTopping',
          campof: 'Peso de adición (kilogramos)',
          class: '',
          imagen: ''
        },
        {
          campo: 'imagenesAdicionales',
          campof: 'Imagen',
          class: '',
          imagen: ''
        }
      ]
      for (var i = 0; i < this.ArrayCamposValida.length; i++) {
        if (this.ArrayCamposValida[i].campo == 'DesTopp') {
          if (this.DesTopp == '' || this.DesTopp == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'VlrUniTopp') {
          if (this.VlrUniTopp == null) {
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
        }
        else if (this.ArrayCamposValida[i].campo == 'imagenesAdicionales') {
          if (this.imagenesAdicionales == '' || this.imagenesAdicionales == null) {
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
      var validaImagen = '';
      if (this.imagenesAdicionales == '1') {
        validaImagen = '';
      } else {
        validaImagen = this.imagenesAdicionales;
      }
      const Body = {
        IdTopping: 0,
        Id_Sector: Number(this.SessionSectorSel),
        cd_cnctivo: Number(this.SessionOferta),
        Descricpcion: this.DesTopp,
        MaxCantidad: Number(this.UnidMaxTopp),
        IdTipoTopping: Number(this.SessionTipoTopp),
        ValorUnitario: Number(this.VlrUniTopp),
        cantidadReserva: Number(this.UnidOferta),
        imagen: validaImagen,
        PesoKiloUnd: Number(this.PesoTopping)
      }
      this.serviciosvaloracion.ModificaTopping('2', Body).subscribe(ResultOper => {
        this.Respuesta = ResultOper;
        this.consultaToppingsOferta();
      })
      this.DesTopp = '';
      this.VlrUniTopp = '';
      this.SessionTipoTopp = '0';
      this.UnidMaxTopp = '';
      this.TipoTopp = '';
      this.UnidOferta = '';
      this.ValidaTipoTopp = false;
      this.IsEnables = false;
      this.imagenesAdicionales = '';
      this.PesoTopping = '';
    }

  }

  ModificaTopping(bandera: string, topping: any) {
    const Body = {
      IdTopping: topping.IdTopping,
      Id_Sector: Number(this.SessionSectorSel),
      cd_cnctivo: Number(this.SessionOferta),
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
      })
    }
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
      else if (fechaDF > fechaHF) {
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
        this.Respuesta = 'La fecha entrega no puede ser menor a la fecha fin de la vigencia, favor valida tu información.';
      }
    }

  }


  selectTipTopp(item: any) {
    this.SessionTipoTopp = item.id;
    if (item.id == 2) {
      this.ValidaTipoTopp = true;
      this.UnidMaxTopp = '1';
      this.UnidOferta = this.DataSectores[0].CNTDAD;
      this.IsEnables = true;
      this.imagenesAdicionales = '1';
    }
    else {
      this.ValidaTipoTopp = false;
      this.UnidMaxTopp = '';
      this.UnidOferta = '';
      this.IsEnables = false;
      this.imagenesAdicionales = '';
    }
  }

  LimpiaTipoTopp() {
    this.UnidMaxTopp = ''
    this.ValidaTipoTopp = false;
    this.SessionTipoTopp = '0';
    this.UnidOferta = '';
    this.IsEnables = false;
  }

  ConsultaVigenciaOferta() {
    this.serviciosvaloracion.ConsultaVigenciaOferta('1', this.SessionOferta, this.SessionSectorSel).subscribe(ResultCons => {
      if (ResultCons.length > 0) {
        this.VigenDesde = ResultCons[0].vgncia_desde;
        this.VigenHasta = ResultCons[0].vgncia_hasta;
        this.HoraIni = ResultCons[0].hora_desde;
        this.HoraFin = ResultCons[0].hora_hasta;
        this.FechaEntrega = ResultCons[0].fcha_vgncia;
        this.Observaciones = ResultCons[0].observaciones;
      }

    })
  }

  ConsultaDetalleOferta() {
    this.serviciosvaloracion.ConsultaOferta('1', this.SessionOferta).subscribe(ResultConsu => {
      this.DataOferta = ResultConsu;
      this.VlReferencia = parseInt(this.DataOferta[0].VR_UNDAD_EMPQUE) + 5000;
      this.SessionFechaRecogida = this.DataOferta[0].fecha_recogida;
    })
  }

  ConsultaSectores() {
    this.serviciosvaloracion.ConsultaSectoresOferta('2', this.SessionOferta).subscribe(ResultConsulta => {
      if (ResultConsulta.length > 0) {
        this.keywordSec = 'DSCRPCION_SCTOR';
        this.DataSectores = ResultConsulta;
      }
    })
  }

  ConsultaValoracionOferta() {
    this.serviciosvaloracion.ConsultaValoracionOferta('1', this.SessionOferta, this.SessionSectorSel).subscribe(ResultCons => {
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
        this.VlReferencia = ResultCons[0].valorReferenciaProd
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
        this.VlReferencia = ResultCons[0].valorReferenciaProd
      }
      else if (ResultCons[0].TPO_OFRTA == 3) {
        if (ResultCons[0].tpo_descuento != null || ResultCons[0].tpo_descuento != 0 || ResultCons[0].tpo_descuento != '') {
          this.PreCargaLIstasTipoDes(Number(ResultCons[0].tpo_descuento));
        }
        if (ResultCons[0].tipo_cupon != null || ResultCons[0].tipo_cupon != 0 || ResultCons[0].tipo_cupon != '') {
          this.PreCargaListaTipoCupon(ResultCons[0].tipo_cupon);
        }
        if (ResultCons[0].img_cupon != null || ResultCons[0].img_cupon != '') {
          this.ImagenRegalo = this.RutaImagenes + ResultCons[0].img_cupon;
          this.RutaImagenes = ResultCons[0].img_cupon;
        }
        if (ResultCons[0].desc_cupon != null || ResultCons[0].desc_cupon != '') {
          this.DescripcionRegalo = ResultCons[0].desc_cupon;
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
        this.VlReferencia = ResultCons[0].valorReferenciaProd
      }
    })
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


  CalcuPreFinInd() {
    if (this.SessionTipoComI != '') {
      if (this.SessionTipoComI == '1') {
        this.serviciosvaloracion.CalculaPFIndividual('1', this.SessionOferta, this.SessionSectorSel, this.SessionTipoComI, this.VlrComFijaI).subscribe(ResultCons => {
          this.PreFinI = ResultCons[0].PRECIO_FINAL;
        })
      }
      else if (this.SessionTipoComI == '2') {
        this.serviciosvaloracion.CalculaPFIndividual('1', this.SessionOferta, this.SessionSectorSel, this.SessionTipoComI, this.VlrComPorI).subscribe(ResultCons => {
          this.PreFinI = ResultCons[0].PRECIO_FINAL;
        })
      }
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
      this.serviciosvaloracion.CalculaPreOferGrupal('1', this.SessionOferta, this.SessionSectorSel, this.SessionTipoComG, validaVlrComF, validadomi, validaunixgru).subscribe(ResultCons => {
        this.PrecioFinLider = ResultCons[0].PRECIO_ARRANQUE_LIDER;
        this.PrecioFinPart = ResultCons[0].PRECIO_FINAL_PARTICIPANTE;
      })
    }
    else if (this.SessionTipoComG == '2') {
      this.serviciosvaloracion.CalculaPreOferGrupal('1', this.SessionOferta, this.SessionSectorSel, this.SessionTipoComG, validaVlrComP, validadomi, validaunixgru).subscribe(ResultCons => {
        this.PrecioFinLider = ResultCons[0].PRECIO_ARRANQUE_LIDER;
        if (this.DataValores.length > 0) {
          this.PrecioFinPart = this.DataValores[0].ValorUnidad;
        } else {
          this.PrecioFinPart = ResultCons[0].PRECIO_ARRANQUE_LIDER;
        }
      })
    }
  }

  LimpiaSector() {
    this.CodigoOferSector = '';
    this.VlrFletSect = '';
    this.SessionSectorSel = ''
    this.ValidaVigencia = '0'
    this.ValidaTipoOfer = '0'
    this.MuestraValoReferencia = '0';
    this.MuestraIndividual = '0';
    this.MuestraGrupal = '0'
  }

  selectSector(item: any) {
    this.ValidaVigencia = '1';
    this.CodigoOferSector = item.COD_OFERTA_SECTOR;
    this.VlrFletSect = item.VLOR_FLTE_SGRDOForm;
    this.SessionCantSector = item.CNTDAD
    this.SessionSectorSel = item.ID_SCTOR_OFRTA
    this.IdOferta = item.CD_CNSCTVO;
    this.ConsultaVigenciaOferta();
    this.consultaToppingsOferta();
    this.ConsultaLinks();


    //this.UrlPubli = this.SeriviciosGenerales.RecuperarRutaAmbiente() + 'home/compras?ido=' + this.SessionOferta + '&idu=0&tu=2&ids=' + this.SessionSectorSel + '&idc=1&itc=1&or=1';
    //this.UrlParticipante = this.SeriviciosGenerales.RecuperarRutaAmbiente() + 'home/compras?ido=' + this.SessionOferta + '&idu=0&tu=2&ids=' + this.SessionSectorSel + '&idc=1&itc=1';
  }

  ConsultaLinks() {

    this.serviciosvaloracion.ConsultaLinks('1', this.IdOferta, this.SessionSectorSel).subscribe(Resultado => {
      for (var i = 0; Resultado.length >= i; i++) {
        if (Resultado[i].Tipo_Link == '1') {
          this.UrlParticipante = Resultado[i].link_largo;
          this.UrlParticipanteC = Resultado[i].link_corto;
        } else if (Resultado[i].Tipo_Link == '2') {
          this.UrlPubli = Resultado[i].link_largo;
          this.UrlPubliC = Resultado[i].link_corto;
        }
      }
    })
  }

  selectTipOferta(item: any) {

    this.consultaValoresUni();
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

  selectTipDescuento(item: any) {
    this.SessionTipoDescuento = item.id;
  }

  LimpiaTipoOferta(item: any) {
    this.MuestraGrupal = '0';
    this.MuestraIndividual = '0';
    this.MuestraVigencial = '0';
    this.MuestraValoReferencia = '0';
  }

  LimpiaTipoComisionI(item: any) {
    this.SessionTipoComI = '';
    this.MuestraFijoI = '0';
    this.MuestraPorcentajeI = '0';
    this.PreFinI = '';
    this.VlrComPorI = '';
    this.VlrComFijaI = '';
  }

  LimpiaTipoComision(item: any) {
    this.SessionTipoComG = '';
    this.MuestraFijo = '0';
    this.MuestraPorcentaje = '0';
    this.VlrComPorG = '';
    this.VlrComFijaG = '';
  }

  LimpiaTipoDescuento(item: any) {
    this.SessionTipoDescuento = '';
    this.PorcDescLider = '';
    this.UnidXGrupos = '';
  }

  GuardaIndividual(templateMensaje: any) {
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
    if ((this.VlReferencia == null || this.VlReferencia == '' || this.SessionTipoComI == null || this.SessionTipoComI == '') || (this.MinUnidI == '' || this.MinUnidI == null) || (this.MaxUnidI == '' || this.MaxUnidI == null)
      || (this.PreFinI == '' || this.PreFinI == null) || (validacomision == '' || validacomision == null)) {
      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'VlReferencia',
          campof: 'Valor referencia',
          class: '',
          imagen: ''
        },
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
        }
      ]
      for (var i = 0; i < this.ArrayCamposValida.length; i++) {
        if (this.ArrayCamposValida[i].campo == 'VlReferencia') {
          if (this.VlReferencia == '' || this.VlReferencia == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'SessionTipoComI') {
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
        }
      }
    }
    else {
      this.ValidaCam = '0';
      this.ArrayCamposValida = [];

      // bitly.shorten(this.RutaLanding +this.SessionSectorSel+'/'+this.SessionOferta+'/0/0').then(result => {}catch{result.link}

      this.LinkSms = 'https://bit.ly/3HbpHIJ';
      const Body = {
        CD_CNSCTVO: this.SessionOferta,
        TPO_OFRTA: this.SessionTipoOferta,
        TPO_CMSION_INDVDUAL: Number(this.SessionTipoComI),
        VLOR_CMSION_INDVDUAL: validacomision,
        MNMO_UNDDES_INDVDUAL: this.MinUnidI,
        MXMO_UNDDES_INDVDUAL: this.MaxUnidI,
        VLOR_DMNCLIO_INDVDUAL: this.VlrDomiI,
        VLOR_FNAL_INDVDUAL: this.PreFinI,
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
        LINKLANDIGN: this.LinkSms,
        VALOR_REFERENCIA: this.VlReferencia
      }
      this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
        var arreglores = ResultUpdate.split('|')
        this.Respuesta = arreglores[1];
        this.ValidaToppings = '1';
        this.MuestraValUnidades = '1';
        this.CargarTextoCorreoIndividual();
      })
      this.SumaPrecios = parseInt(this.VlrDomiI) + parseInt(this.PreFinI);
      this.ValorUni = this.SumaPrecios.toString();
      this.consultaValoresUni();
    }
  }

  CargarTextoCorreoIndividual() {
    this.serviciosvaloracion.constextosoferta('1', this.SessionOferta, this.SessionSectorSel).subscribe(ResultUpdate => {
      this.ArrayTextoModifica = ResultUpdate;
      if (this.ArrayTextoModifica[0].TextoSms == null || this.ArrayTextoModifica[0].TextoSms == undefined || this.ArrayTextoModifica[0].TextoSms == "") {
        this.ArrayTextoModifica[0].TextoSms = "@NombrePersona Tenemos una oferta de @NombreProducto para ti, adquiérela ingresando a " + this.UrlParticipanteC;
      }
      this.imagenesCorreo = ResultUpdate[0].ImgCorreo;
    })
  }

  GuardarMixta(templateMensaje: any) {
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
        if ((this.DescripcionRegalo == '' || this.DescripcionRegalo == null) || (this.ImagenRegalo == "../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png")) {
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
      (this.VlReferencia == '' || this.VlReferencia == null) ||
      (this.SessionTipoComG == '' || this.SessionTipoComG == null) ||
      (validacomisionG == '' || validacomisionG == null) ||
      (this.SessionTipoDescuento == '0' || this.SessionTipoDescuento == null || this.SessionTipoDescuento == '') ||
      (this.IdTipoCupon == '0' || this.IdTipoCupon == null) ||
      (auxres == false) ||
      (this.MinUnidLider == '' || this.MinUnidLider == null) ||
      (this.MaxUnidLider == '' || this.MaxUnidLider == null) ||
      (this.VlrDomiI == '' || this.VlrDomiI == null) ||
      (this.PrecioFinPart == '' || this.PrecioFinPart == null)
    ) {
      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'VlReferencia',
          campof: 'Valor referencia',
          class: '',
          imagen: ''
        },
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
        }
      ];

      for (var i = 0; i < this.ArrayCamposValida.length; i++) {
        if (this.ArrayCamposValida[i].campo == 'VlReferencia') {
          if (this.VlReferencia == '' || this.VlReferencia == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'TipoCom') {
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
            if ((this.DescripcionRegalo == '' || this.DescripcionRegalo == null) || (this.ImagenRegalo == "../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png")) {
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
          if ((this.VlrDomiI == '' || this.VlrDomiI == null)) {
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
        CD_CNSCTVO: this.SessionOferta,
        TPO_OFRTA: this.SessionTipoOferta,
        TPO_CMSION_INDVDUAL: item.TPO_CMSION_INDVDUAL,
        VLOR_CMSION_INDVDUAL: item.VLOR_CMSION_INDVDUAL,
        MNMO_UNDDES_INDVDUAL: item.MNMO_UNDDES_INDVDUAL,
        MXMO_UNDDES_INDVDUAL: item.MXMO_UNDDES_INDVDUAL,
        VLOR_DMNCLIO_INDVDUAL: item.VLOR_DMNCLIO_INDVDUAL,
        VLOR_FNAL_INDVDUAL: item.VLOR_FNAL_INDVDUAL,
        TPO_CMSION_GRPAL: Number(this.SessionTipoComG),
        VLOR_CMSION_GRPAL: validacomisionG,
        MNMO_UNDDES_LIDER: this.MinUnidLider,
        MXMO_UNDDES_LIDER: this.MaxUnidLider,
        PRCNTJE_DCTO_LIDER: SelectTipoCupon.PRCNTJE_DCTO_LIDER,
        VLOR_DMNCLIO_GRPAL: this.VlrDomiI,
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
        VALOR_REFERENCIA: this.VlReferencia,
        TIPO_CUPON: Number(this.IdTipoCupon),
        DES_CUPONREGALO: SelectTipoCupon.DES_CUPONREGALO,
        IMG_CUPONREGALO: SelectTipoCupon.IMG_CUPONREGALO
      }
      this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
        this.Respuesta = '';
        var arreglores = ResultUpdate.split('|')
        this.Respuesta = arreglores[1];
        if (Number(arreglores[0]) > 0) {
          this.ValidaToppings = '1';
          this.serviciosvaloracion.constextosoferta('1', this.SessionOferta, this.SessionSectorSel).subscribe(ResultUpdate => {
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

  GuardaVigencia(templateMensaje: any) {
    this.ConsultaCuponesOferta();
    this.Respuesta = '';
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    if (this.VigenDesde == '' || this.VigenHasta == '' || this.FechaEntrega == '') {
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
      }
    }
    else {
      this.ValidaCam = '0';
      this.ArrayCamposValida = []
      const Body = {
        CD_CNSCTVO: this.SessionOferta,
        VGNCIA_DESDE: this.VigenDesde,
        VGNCIA_HASTA: this.VigenHasta,
        HORA_DESDE: this.HoraIni,
        HORA_HASTA: this.HoraFin,
        FCHA_ENTRGA: this.FechaEntrega,
        OBSERVACIONES: this.Observaciones,
        ID_SCTOR_OFRTA: this.SessionSectorSel
      }
      this.serviciosvaloracion.ModificarVigenciaOferta('2', Body).subscribe(ResultUpdate => {
        this.Respuesta = '';
        var arreglores = ResultUpdate.split('|')
        this.Respuesta = arreglores[1];
        this.ValidaTipoOfer = '1';
        this.ConsultaValoracionOferta();
      })
    }
  }
  Consultatoppings() {
    this.serviciosvaloracion.ConsultaTipoTopping('1').subscribe(Resultcons => {
      this.DataTipotopping = Resultcons;
      this.keywordTipTopp = 'Descripcion';
    })
  }

  AbrePublica(templatePublicar: any) {
    this.modalPublicar = this.modalService.open(templatePublicar, { ariaLabelledBy: 'modal-basic-title' })
  }

  PublicaOferta(templateMensaje: any) {
    if (this.DataValores.length > 0 && this.ValidaTipoOfer == '1') {
      const Body = {
        usucodig: this.SessionIdUsuario,
        cnctivoOferta: this.SessionOferta,
        ObsEstado: this.PubliOferObser,
        estado: 10,
        parametro1: "",
        parametro2: "",
        parametro3: ""
      }
      this.serviciosvaloracion.ActualizaEstadoOferta('3', Body).subscribe(ResultUpda => {
        this.Respuesta = '';
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
        var respuesta = ResultUpda.split('|')
        this.Respuesta = respuesta[1];
        if (respuesta[0] != '-1') {
          this.modalPublicar?.close();
          this.rutas.navigateByUrl('/home/buscaroferta');
          this.EnvioCorreoMaisivo();
          this.EnvioSmsMasivo();
        }
      });
    } else {
      this.modalPublicar?.close();
      this.Respuesta = '';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = "Por favor ingresa los valores de referencia para la compra";;
    }
  }


  public CargaImagenAdicionales(event: any, modalmensaje: any) {

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
            this.imagenesAdicionales = event.target.files[0].name;
            this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
            this.Respuesta = "Imagen cargada correctamente.";
          }
        },
        error => {
          this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.Respuesta = "No hemos podido subir el archivo, intente nuevamente.";
        }
      );
    }
  }

  visualizaImagenTopping(ModalImagen: any, imagenesAdicional: string) {
    this.modalService.open(ModalImagen, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    this.consultaimagen = this.RutaImagenTopping + imagenesAdicional;
  }



  //WILLIAM
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

  public CargaImagenCorreo(event: any, modalmensaje: any) {

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
            this.imagenesCorreo = this.RutaImagenTopping + event.target.files[0].name;

            const Bodymod = {
              idSector: this.SessionSectorSel,
              cd_cnctivo: this.SessionOferta,
              TextoCorreo: "0",
              TextoWhat: "0",
              ImgCorreo: this.imagenesCorreo
            }

            this.serviciosvaloracion.TextosOferta('2', Bodymod).subscribe(ResultCorreo => {
            })

            this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
            this.Respuesta = "Imagen cargada correctamente.";
          }
        },
        error => {
          this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.Respuesta = "No hemos podido subir el archivo, intente nuevamente.";
        }
      );
    }
  }


  GuardarTexto(modalmensaje: any) {

    const Bodymod = {
      idSector: this.SessionSectorSel,
      cd_cnctivo: this.SessionOferta,
      TextoCorreo: this.ArrayTextoModifica[0].TextoCorreo,
      TextoWhat: this.ArrayTextoModifica[0].TextoWhat,
      ImgCorreo: this.imagenesCorreo,
      TextoSms: this.ArrayTextoModifica[0].TextoSms
    }

    this.serviciosvaloracion.TextosOferta('1', Bodymod).subscribe(ResultCorreo => {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = ResultCorreo;

    })

  }

  PrevisualizarCorreo(Previsualizarcion: any) {

    this.Previsucorreo = this.ArrayTextoModifica[0].Plantilla.replace("[imgCorreoMasivo]", this.imagenesCorreo.trim());

    this.Previsucorreo = this.Previsucorreo.replace("[ContenidoMasivo]", this.ArrayTextoModifica[0].TextoCorreo);
    this.modalService.open(Previsualizarcion, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })

  }

  EnvioCorreoMaisivo() {
    if (this.EnvioCorreo == true) {
      if (this.DataSectores.length > 0) {
        for (var i = 0; i < this.DataSectores.length; i++) {
          this.serviciosvaloracion.CorreoMasivo('1', '9', '2', this.SessionOferta, this.DataSectores[i].ID_SCTOR_OFRTA).subscribe(ResultCorreo => {
          })
        }
      }
    }
  }

  EnvioSmsMasivo() {
    if (this.EnvioSms == true) {
      if (this.DataSectores.length > 0) {
        for (var i = 0; i < this.DataSectores.length; i++) {
          this.serviciosvaloracion.EnviarSms('7', '0', this.SessionOferta, this.DataSectores[i].ID_SCTOR_OFRTA, '0', '0', '0').subscribe(Resultado => {
          })
        }
      }
    }
  }


  //#region Cupon
  ImagenRegalo: string = "../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png";
  NomImgRegalo: "";
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
  //#endregion Cupon

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

            this.ImagenRegalo = this.RutaImagenes + event.target.files[0].name;
            this.NomImgRegalo = event.target.files[0].name;
          } else {
            //this.resultadoCarga = 2;
          }

        }
      });
    }

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

  LimpiaOferta(campo: string) {

  }

  selectCuponOferta(item: any) {
    this.IdCupon = item.codigo_grupo.toString();
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
      console.log(Resultado)
      if (Resultado.length > 0) {
        this.ArrayCupones = Resultado
      }
    })
  }

  ConsultaCuponesOferta() {
    this.serviciosvaloracion.ConsultaCuponesOferta('1', this.IdOferta, '0').subscribe(Resultado => {
      this.ArrayCuponesOferta = Resultado;
      console.log(Resultado)
    })
  }

  Eliminar(registro: any) {
    const DatosInsert = {
      cd_cnsctivo: registro.Cd_cnsctvo,
      Id_cuponCodigo: registro.codigo_grupo
    }
    this.serviciosvaloracion.ModificarCupon('4', DatosInsert).subscribe(Resultado => {
      console.log(Resultado)
      this.ConsultaCuponesOferta();
    })

  }

  AsociarCupon() {
    const DatosInsert = {
      cd_cnsctivo: this.IdOferta,
      Id_cuponCodigo: this.IdCupon
    }
    this.serviciosvaloracion.ModificarCupon('3', DatosInsert).subscribe(Resultado => {
      console.log(Resultado)
      this.ConsultaCuponesOferta();
    })

  }
}
