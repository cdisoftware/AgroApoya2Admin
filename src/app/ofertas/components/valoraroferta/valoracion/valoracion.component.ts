import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { Router } from '@angular/router'
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { DatePipe } from '@angular/common';
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
  MuestraIndividual: string = '';
  MuestraGrupal: string = '';
  MuestraFijo: string = '';
  MuestraFijoI: string = '';
  MuestraPorcentaje: string = '';
  MuestraPorcentajeI: string = '';
  MuestraVigencial: string = '';
  VlrComFijaI: string = '';
  MinUnidI: any;
  MaxUnidI: any;
  PreFinI: any;
  VlrDomiI: any;
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
  UrlPubli : string = '';


  constructor(private serviciosvaloracion: ValorarofertaService, ConfigAcord: NgbAccordionConfig, private modalService: NgbModal, private cookies: CookieService, public rutas: Router, private SeriviciosGenerales: MetodosglobalesService, private formatofecha: DatePipe) {
    ConfigAcord.closeOthers = true;
  }

  ngOnInit(): void {
    this.keyword = 'name';
    this.keywordSec = 'name';
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
    this.serviciosvaloracion.ConsultaToppingOfer('1', this.SessionSectorSel, this.SessionOferta).subscribe(Resultcons => {
      console.log(Resultcons)
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

  GuardaTopping(templateMensaje: any) {
    this.Respuesta = ''
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' });
    if (this.DesTopp == '' || this.VlrUniTopp == '' || this.UnidMaxTopp == '' || this.SessionTipoTopp == '0' || this.UnidOferta == '' || this.imagenesAdicionales == '') {
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
          if (this.VlrUniTopp == '' || this.VlrUniTopp == null) {
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
        imagen: validaImagen
      }
      console.log(Body)
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
    console.log(item)
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
      //console.log(ResultCons)
      this.VigenDesde = ResultCons[0].vgncia_desde;
      this.VigenHasta = ResultCons[0].vgncia_hasta;
      this.HoraIni = ResultCons[0].hora_desde;
      this.HoraFin = ResultCons[0].hora_hasta;
      this.FechaEntrega = ResultCons[0].fcha_vgncia;
      this.Observaciones = ResultCons[0].observaciones;
    })
  }

  ConsultaDetalleOferta() {
    this.serviciosvaloracion.ConsultaOferta('1', this.SessionOferta).subscribe(ResultConsu => {
      //console.log(ResultConsu)
      this.DataOferta = ResultConsu;
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
      }

      else if (ResultCons[0].TPO_OFRTA == '2') {
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
      }
      else if (ResultCons[0].TPO_OFRTA == 3) {
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
        this.VlrDomiI = ResultCons[0].vlor_dmnclio_indvdual;
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
        //console.log('1', this.SessionOferta, this.SessionSectorSel, this.SessionTipoComI, this.VlrComPorI)
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
      //console.log('1', this.SessionOferta, this.SessionSectorSel, this.SessionTipoComG, validaVlrComP, validadomi, validaunixgru)
      this.serviciosvaloracion.CalculaPreOferGrupal('1', this.SessionOferta, this.SessionSectorSel, this.SessionTipoComG, validaVlrComP, validadomi, validaunixgru).subscribe(ResultCons => {
        this.PrecioFinLider = ResultCons[0].PRECIO_ARRANQUE_LIDER;
        this.PrecioFinPart = ResultCons[0].PRECIO_FINAL_PARTICIPANTE;
      })
    }
  }

  LimpiaSector() {
    this.CodigoOferSector = '';
    this.VlrFletSect = '';
    this.SessionSectorSel = ''
    this.ValidaVigencia = '0'
    this.ValidaTipoOfer = '0'
    this.MuestraIndividual = '0';
    this.MuestraGrupal = '0'
  }

  selectSector(item: any) {
    this.ValidaVigencia = '1';
    this.CodigoOferSector = item.COD_OFERTA_SECTOR;
    this.VlrFletSect = item.VLOR_FLTE_SGRDOForm;
    this.SessionCantSector = item.CNTDAD
    this.SessionSectorSel = item.ID_SCTOR_OFRTA
    this.ConsultaVigenciaOferta();
    this.consultaToppingsOferta();
    this.UrlPubli =  'https://apoya2.co/#/home/compras?ido='+ this.SessionOferta+'&idu=0&tu=2&ids='+this.SessionSectorSel+'&idc=1&itc=1&or=1';
  }

  selectTipOferta(item: any) {
    //console.log(item)
    this.SessionTipoOferta = item.id;
    this.MuestraVigencial = '1';
    if (item.id == 1) {
      this.MuestraIndividual = '1';
      this.MuestraGrupal = '0';
      this.MuestraCantIndiv = '1';
      this.MuestraBtnIndividual = '1';
      this.MuestraBtnGrupal = '0';
      this.MuestraBtnMixta = '0';
    }
    else if (item.id == 2) {
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
      this.VlrDomiI = '0';

      this.MuestraIndividual = '1';
      this.MuestraGrupal = '1';
      this.MuestraCantIndiv = '1';
      this.MuestraBtnIndividual = '0';
      this.MuestraBtnGrupal = '0';
      this.MuestraBtnMixta = '1';
    }
    else {
      this.MuestraVigencial = '0';
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
    if ((this.SessionTipoComI == null || this.SessionTipoComI == '') || (this.MinUnidI == '' || this.MinUnidI == null) || (this.MaxUnidI == '' || this.MaxUnidI == null)
      || (this.PreFinI == '' || this.PreFinI == null) || (validacomision == '' || validacomision == null)) {
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
        }
      }
    }
    else {
      this.ValidaCam = '0';
      this.ArrayCamposValida = [];

      // bitly.shorten(this.RutaLanding +this.SessionSectorSel+'/'+this.SessionOferta+'/0/0').then(result => {}catch{result.link}

      this.LinkSms = 'https://bit.ly/3HbpHIJ';
      console.log(this.LinkSms)
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
        LINKLANDIGN: this.LinkSms
      }
      this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
        var arreglores = ResultUpdate.split('|')
        this.Respuesta = arreglores[1];
        this.ValidaToppings = '1';
        this.serviciosvaloracion.constextosoferta('1', this.SessionOferta, this.SessionSectorSel).subscribe(ResultUpdate => {
          console.log(ResultUpdate)
          this.ArrayTextoModifica = ResultUpdate;
          this.imagenesCorreo = ResultUpdate[0].ImgCorreo;
        })
      })

    }
  }

  GuardarMixta(templateMensaje: any) {
    this.Respuesta = '';
    var validacomision = '';
    var validacomisionG = '';

    console.log('entra-------------')
    console.log(this.PrecioFinLider);
    console.log(this.PrecioFinPart);
    console.log(this.PreFinI);
    console.log('-------------')

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
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })


    console.log('entra valor domicilio mixta')
    console.log(this.VlrDomiI)

    if ((this.SessionTipoComI == null || this.SessionTipoComI == '') || (this.MinUnidI == '' || this.MinUnidI == null) || (this.MaxUnidI == '' || this.MaxUnidI == null)
      || (this.PreFinI == '' || this.PreFinI == null) || (validacomision == '' || validacomision == null) || (this.SessionTipoComG == null || this.SessionTipoComG == '') || (validacomisionG == '' || validacomisionG == null) ||
      (this.PrecioFinLider == '' || this.PrecioFinLider == null) || (this.PrecioFinPart == '' || this.PrecioFinPart == null)
      || (this.UnidXGrupos == '' || this.UnidXGrupos == null) || (this.PorcDescLider == '' || this.PorcDescLider == null)
      || (this.SessionTipoDescuento == '' || this.SessionTipoDescuento == null)) {
      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'SessionTipoComI',
          campof: 'Tipo comisión individual',
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
          campo: 'SessionTipoComG',
          campof: 'Tipo comisión grupal',
          class: '',
          imagen: ''
        },
        {
          campo: 'validacomisionG',
          campof: 'Valor comisión grupal',
          class: '',
          imagen: ''
        },
        {
          campo: 'SessionTipoDescuento',
          campof: 'Tipo de descuento',
          class: '',
          imagen: ''
        },
        {
          campo: 'PorcDescLider',
          campof: 'Porcentaje de descuento por unidad / registro',
          class: '',
          imagen: ''
        },
        {
          campo: 'UnidXGrupos',
          campof: 'Numero maximo de unidades / registros para descuento',
          class: '',
          imagen: ''
        },
        {
          campo: 'PrecioFinLider',
          campof: 'Precio arranque lider',
          class: '',
          imagen: ''
        },
        {
          campo: 'PrecioFinPart',
          campof: 'Precio final participante',
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
        }
        else if (this.ArrayCamposValida[i].campo == 'SessionTipoComG') {
          if (this.SessionTipoComG == '' || this.SessionTipoComG == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'validacomisionG') {
          if (validacomisionG == '' || validacomisionG == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'SessionTipoDescuento') {
          if (this.SessionTipoDescuento == '' || this.SessionTipoDescuento == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'MinUnidLider') {
          if (this.MinUnidLider == '' || this.MinUnidLider == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'MaxUnidLider') {
          if (this.MaxUnidLider == '' || this.MaxUnidLider == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'PorcDescLider') {
          if (this.PorcDescLider == '' || this.PorcDescLider == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'CantGrupos') {
          if (this.CantGrupos == '' || this.CantGrupos == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'UnidXGrupos') {
          if (this.UnidXGrupos == '' || this.UnidXGrupos == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'MinUnidPart') {
          if (this.MinUnidPart == '' || this.MinUnidPart == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'MaxUnidPart') {
          if (this.MaxUnidPart == '' || this.MaxUnidPart == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'PrecioFinLider') {
          if (this.PrecioFinLider == '' || this.PrecioFinLider == null) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Adm/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'PrecioFinPart') {
          if (this.PrecioFinPart == '' || this.PrecioFinPart == null) {
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

      console.log(this.PrecioFinLider);
      console.log(this.PrecioFinPart);

      // bitly.shorten(this.RutaLanding +this.SessionSectorSel+'/'+this.SessionOferta+'/0/0').then(result => {  }catch{ }
      this.LinkSms = 'https://bit.ly/3HbpHIJ';
      console.log(this.LinkSms)
      const Body = {
        CD_CNSCTVO: this.SessionOferta,
        TPO_OFRTA: this.SessionTipoOferta,
        TPO_CMSION_INDVDUAL: Number(this.SessionTipoComI),
        VLOR_CMSION_INDVDUAL: validacomision,
        MNMO_UNDDES_INDVDUAL: this.MinUnidI,
        MXMO_UNDDES_INDVDUAL: this.MaxUnidI,
        VLOR_DMNCLIO_INDVDUAL: this.VlrDomiI,
        VLOR_FNAL_INDVDUAL: this.PreFinI,
        TPO_CMSION_GRPAL: Number(this.SessionTipoComG),
        VLOR_CMSION_GRPAL: validacomisionG,
        MNMO_UNDDES_LIDER: 1,
        MXMO_UNDDES_LIDER: 1,
        PRCNTJE_DCTO_LIDER: this.PorcDescLider,
        VLOR_DMNCLIO_GRPAL: 0,
        CNTDAD_GRPOS: 0,
        MNMO_PRSNAS_XGRUPO: this.UnidXGrupos,
        MNMO_UNDDES_PRCPNTE: 1,
        MXMO_UNDDES_PRCPNTE: 1,
        CNTDAD_CMPRAS_INDVDLES: 0,
        VLOR_ARRNQUE_LIDER: this.PrecioFinLider,
        VLOR_FNAL_PRTCPNTE: this.PrecioFinPart,
        ID_SCTOR_OFRTA: this.SessionSectorSel,
        LINKLANDIGN: this.LinkSms,
        TPO_DESCUENTO: Number(this.SessionTipoDescuento)
      }
      console.log(Body)
      this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
        this.Respuesta = '';
        var arreglores = ResultUpdate.split('|')
        this.Respuesta = arreglores[1];
        this.ValidaToppings = '1';
        this.serviciosvaloracion.constextosoferta('1', this.SessionOferta, this.SessionSectorSel).subscribe(ResultUpdate => {
          console.log(ResultUpdate)
          this.ArrayTextoModifica = ResultUpdate;
          this.imagenesCorreo = ResultUpdate[0].ImgCorreo;
        })
      })

    }
  }

  GuardaVigencia(templateMensaje: any) {
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

    if(this.imagenesCorreo == null || this.imagenesCorreo == ''){
      this.Respuesta = 'Es obligatoria la imagen del correo, porfavor subela.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    }else{
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
      })
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
          if (response <= 1) {
            console.log("Error en el servidor");
          } else {
            if (response == 'Archivo Subido Correctamente') {
              this.imagenesAdicionales = event.target.files[0].name;
              this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
              this.Respuesta = "Imagen cargada correctamente.";
            } else {
              console.log(response)
            }
          }
        },
        error => {
          console.log(<any>error);
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
          if (response <= 1) {
            console.log("Error en el servidor");
          } else {
            if (response == 'Archivo Subido Correctamente') {
              this.imagenesCorreo = this.RutaImagenTopping + event.target.files[0].name;
              console.log(this.imagenesCorreo)

              const Bodymod = {
                idSector: this.SessionSectorSel,
                cd_cnctivo: this.SessionOferta,
                TextoCorreo: "0",
                TextoWhat: "0",
                ImgCorreo: this.imagenesCorreo
              }

              this.serviciosvaloracion.TextosOferta('2', Bodymod).subscribe(ResultCorreo => {
                console.log(ResultCorreo)
              })

              this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
              this.Respuesta = "Imagen cargada correctamente.";
            } else {
              console.log(response)
            }
          }
        },
        error => {
          console.log(<any>error);
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
      ImgCorreo: this.imagenesCorreo
    }

    this.serviciosvaloracion.TextosOferta('1', Bodymod).subscribe(ResultCorreo => {

      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = ResultCorreo;

    })

  }

  PrevisualizarCorreo(Previsualizarcion: any) {

    this.Previsucorreo = this.ArrayTextoModifica[0].Plantilla.replace("[imgCorreoMasivo]", this.imagenesCorreo.trim());

    console.log(this.Previsucorreo)

    this.Previsucorreo = this.Previsucorreo.replace("[ContenidoMasivo]", this.ArrayTextoModifica[0].TextoCorreo);
    this.modalService.open(Previsualizarcion, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })

  }

  EnvioCorreoMaisivo() {
    if (this.EnvioCorreo == true) {
      console.log('Entra correo')
      if (this.DataSectores.length > 0) {
        for (var i = 0; i < this.DataSectores.length; i++) {
          this.serviciosvaloracion.CorreoMasivo('1', '9', '2', this.SessionOferta, this.DataSectores[i].ID_SCTOR_OFRTA).subscribe(ResultCorreo => {
            console.log(ResultCorreo)
          })
        }
      }
    }
  }

  EnvioSmsMasivo() {
    if (this.EnvioSms == true) {
      console.log('Entra sms texto')
      if (this.DataSectores.length > 0) {
        for (var i = 0; i < this.DataSectores.length; i++) {
          this.serviciosvaloracion.EnviarSms('7', '0', this.SessionOferta, this.DataSectores[i].ID_SCTOR_OFRTA, '0', '0', '0').subscribe(Resultado => {
            console.log(Resultado)
          })
        }
      }
    }
  }

}
