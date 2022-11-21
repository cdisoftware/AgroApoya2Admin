import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { Router } from '@angular/router'
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { DatePipe } from '@angular/common';

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
  DesTopp: string;
  VlrUniTopp: string;
  UnidMaxTopp: string;
  SessionTipoTopp: any;
  ValidaTipoTopp: boolean;
  keywordTipTopp: string;
  TipoTopp: string;
  SessionFechaRecogida: any;
  UnidOferta: string;



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
        id: 2,
        name: 'Grupal'
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
    this.MaxUnidI = '';
    this.MinUnidI = '';
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
    if (this.DesTopp == '' || this.VlrUniTopp == '' || this.UnidMaxTopp == '' || this.SessionTipoTopp == '0' || this.UnidOferta == '') {
      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'DesTopp',
          campof: 'Descripción amparado',
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
          campof: 'Tipo amparado',
          class: '',
          imagen: ''
        },
        {
          campo: 'UnidMaxTopp',
          campof: 'Maxima unidades por compra',
          class: '',
          imagen: ''
        },
        {
          campo: 'UnidOferta',
          campof: 'Unidades para la oferta',
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
      }
    }
    else {
      this.ValidaCam = '0';
      this.ArrayCamposValida = [];
      const Body = {
        IdTopping: 0,
        Id_Sector: Number(this.SessionSectorSel),
        cd_cnctivo: Number(this.SessionOferta),
        Descricpcion: this.DesTopp,
        MaxCantidad: Number(this.UnidMaxTopp),
        IdTipoTopping: Number(this.SessionTipoTopp),
        ValorUnitario: Number(this.VlrUniTopp),
        cantidadReserva: Number(this.UnidOferta)
      }
      this.serviciosvaloracion.ModificaTopping('2', Body).subscribe(ResultOper => {
        this.Respuesta = ResultOper;
        this.consultaToppingsOferta();
        this.DesTopp = '';
        this.VlrUniTopp = '';
        this.UnidMaxTopp = '';
        this.SessionTipoTopp = '0';
        this.TipoTopp = '';
        this.UnidOferta = '';
        this.ValidaTipoTopp = false;
      })
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
    var fechaD = this.VigenDesde;
    var fechaH = this.VigenHasta;
    var fechaH = this.VigenHasta;
    var fechaR = this.SessionFechaRecogida;
    var fecha = new Date();
    var fechaf = this.formatofecha.transform(fecha, "yyyy-MM-dd")!;
    var fechaDF = this.formatofecha.transform(fechaD, "yyyy-MM-dd")!;
    var fechaHF = this.formatofecha.transform(fechaH, "yyyy-MM-dd")!;
    var fechaRF = this.formatofecha.transform(fechaR, "yyyy-MM-dd")!;
    if (bandera == '1') {
      if (this.VigenDesde < fechaf) {
        this.VigenDesde = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha inicio de la vigencia no puede ser menor a la fecha actual, favor valida tu información.';
      }
    }
    else if (bandera == '2') {
      if (fechaDF > fechaHF) {
        this.VigenHasta = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha fin de la vigencia no puede ser menor a la fecha inicio de la vigencia, favor valida tu información.';
      }
    }
    else if (bandera == '3') {
      if (this.FechaEntrega < fechaHF) {
        this.FechaEntrega = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha entrega de la vigencia no puede ser menor a la fecha fin de la vigencia, favor valida tu información.';
      }
      else if (this.FechaEntrega < fechaRF) {
        this.FechaEntrega = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha entrega de la vigencia no puede ser menor a la fecha recogida de la oferta, favor valida tu información.';
      }
    }

  }

  selectTipTopp(item: any) {
    this.SessionTipoTopp = item.id;
    if (item.id == '2') {
      this.ValidaTipoTopp = true;
      this.UnidMaxTopp = '1';
    }
    else {
      this.ValidaTipoTopp = false;
      this.UnidMaxTopp = '';
    }
  }

  LimpiaTipoTopp() {
    this.UnidMaxTopp = ''
    this.ValidaTipoTopp = false;
    this.SessionTipoTopp = '0';
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
      console.log(ResultConsulta)
      if (ResultConsulta.length > 0) {
        this.keywordSec = 'DSCRPCION_SCTOR';
        this.DataSectores = ResultConsulta;
      }
    })
  }

  ConsultaValoracionOferta() {
    console.log('1', this.SessionOferta, this.SessionSectorSel)
    this.serviciosvaloracion.ConsultaValoracionOferta('1', this.SessionOferta, this.SessionSectorSel).subscribe(ResultCons => {
      console.log(ResultCons)
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

  GuardaIndividual(templateMensaje: any) {
    this.Respuesta = '';
    var validacomision = '';
    if (this.SessionTipoComI == '1') {
      validacomision = this.VlrComFijaI
    }
    else {
      validacomision = this.VlrComPorI
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
        ID_SCTOR_OFRTA: this.SessionSectorSel
      }
      this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
        var arreglores = ResultUpdate.split('|')
        this.Respuesta = arreglores[1];
        this.ValidaToppings = '1';
      })
    }
  }

  GuardaGrupal(templateMensaje: any) {
    this.Respuesta = '';
    var validacomision = '';
    if (this.SessionTipoComG == '1') {
      validacomision = this.VlrComFijaG
    }
    else {
      validacomision = this.VlrComPorG
    }
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    if ((this.SessionTipoComG == null || this.SessionTipoComG == '') || (validacomision == '' || validacomision == null) || (this.MinUnidLider == '' || this.MinUnidLider == null) ||
      (this.MaxUnidLider == '' || this.MaxUnidLider == null) || (this.PorcDescLider == '' || this.PorcDescLider == null) || (this.CantGrupos == '' || this.CantGrupos == null) ||
      (this.UnidXGrupos == '' || this.UnidXGrupos == null) || (this.MinUnidPart == '' || this.MinUnidPart == null) || (this.MaxUnidPart == '' || this.MaxUnidPart == null) ||
      (this.PrecioFinLider == '' || this.PrecioFinLider == null) || (this.PrecioFinPart == '' || this.PrecioFinPart == null)) {
      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'SessionTipoComG',
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
          campo: 'MinUnidLider',
          campof: 'Minimo unidades lider',
          class: '',
          imagen: ''
        },
        {
          campo: 'MaxUnidLider',
          campof: 'Maximo unidades lider',
          class: '',
          imagen: ''
        },
        {
          campo: 'PorcDescLider',
          campof: 'Porcentaje descuento lider',
          class: '',
          imagen: ''
        },
        {
          campo: 'CantGrupos',
          campof: 'Cantidad de grupos',
          class: '',
          imagen: ''
        },
        {
          campo: 'UnidXGrupos',
          campof: 'Unidades por grupo',
          class: '',
          imagen: ''
        },
        {
          campo: 'MinUnidPart',
          campof: 'Minimo unidades participante',
          class: '',
          imagen: ''
        },
        {
          campo: 'MaxUnidPart',
          campof: 'Maximo unidades participante',
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
        if (this.ArrayCamposValida[i].campo == 'SessionTipoComG') {
          if (this.SessionTipoComG == '' || this.SessionTipoComG == null) {
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
      const Body = {
        CD_CNSCTVO: this.SessionOferta,
        TPO_OFRTA: Number(this.SessionTipoOferta),
        TPO_CMSION_INDVDUAL: 0,
        VLOR_CMSION_INDVDUAL: "0",
        MNMO_UNDDES_INDVDUAL: "0",
        MXMO_UNDDES_INDVDUAL: "0",
        VLOR_DMNCLIO_INDVDUAL: "0",
        VLOR_FNAL_INDVDUAL: "0",
        TPO_CMSION_GRPAL: this.SessionTipoComG,
        VLOR_CMSION_GRPAL: validacomision,
        MNMO_UNDDES_LIDER: this.MinUnidLider,
        MXMO_UNDDES_LIDER: this.MaxUnidLider,
        PRCNTJE_DCTO_LIDER: this.PorcDescLider,
        VLOR_DMNCLIO_GRPAL: this.VlrDomiG,
        CNTDAD_GRPOS: this.CantGrupos,
        MNMO_PRSNAS_XGRUPO: this.UnidXGrupos,
        MNMO_UNDDES_PRCPNTE: this.MinUnidPart,
        MXMO_UNDDES_PRCPNTE: this.MaxUnidPart,
        CNTDAD_CMPRAS_INDVDLES: this.CantComprI,
        VLOR_ARRNQUE_LIDER: this.PrecioFinLider,
        VLOR_FNAL_PRTCPNTE: this.PrecioFinPart,
        ID_SCTOR_OFRTA: this.SessionSectorSel
      }
      this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
        this.Respuesta = '';
        var arreglores = ResultUpdate.split('|')
        this.Respuesta = arreglores[1];
        this.ValidaToppings = '1';
      })
    }
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
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    if ((this.SessionTipoComI == null || this.SessionTipoComI == '') || (this.MinUnidI == '' || this.MinUnidI == null) || (this.MaxUnidI == '' || this.MaxUnidI == null)
      || (this.PreFinI == '' || this.PreFinI == null) || (validacomision == '' || validacomision == null) || (this.SessionTipoComG == null || this.SessionTipoComG == '') || (validacomisionG == '' || validacomisionG == null) || (this.MinUnidLider == '' || this.MinUnidLider == null) ||
      (this.MaxUnidLider == '' || this.MaxUnidLider == null) || (this.PorcDescLider == '' || this.PorcDescLider == null) || (this.CantGrupos == '' || this.CantGrupos == null) ||
      (this.UnidXGrupos == '' || this.UnidXGrupos == null) || (this.MinUnidPart == '' || this.MinUnidPart == null) || (this.MaxUnidPart == '' || this.MaxUnidPart == null) ||
      (this.PrecioFinLider == '' || this.PrecioFinLider == null) || (this.PrecioFinPart == '' || this.PrecioFinPart == null)) {
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
          campo: 'MinUnidLider',
          campof: 'Minimo unidades lider',
          class: '',
          imagen: ''
        },
        {
          campo: 'MaxUnidLider',
          campof: 'Maximo unidades lider',
          class: '',
          imagen: ''
        },
        {
          campo: 'PorcDescLider',
          campof: 'Porcentaje descuento lider',
          class: '',
          imagen: ''
        },
        {
          campo: 'CantGrupos',
          campof: 'Cantidad de grupos',
          class: '',
          imagen: ''
        },
        {
          campo: 'UnidXGrupos',
          campof: 'Unidades por grupo',
          class: '',
          imagen: ''
        },
        {
          campo: 'MinUnidPart',
          campof: 'Minimo unidades participante',
          class: '',
          imagen: ''
        },
        {
          campo: 'MaxUnidPart',
          campof: 'Maximo unidades participante',
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
        MNMO_UNDDES_LIDER: this.MinUnidLider,
        MXMO_UNDDES_LIDER: this.MaxUnidLider,
        PRCNTJE_DCTO_LIDER: this.PorcDescLider,
        VLOR_DMNCLIO_GRPAL: this.VlrDomiG,
        CNTDAD_GRPOS: this.CantGrupos,
        MNMO_PRSNAS_XGRUPO: this.UnidXGrupos,
        MNMO_UNDDES_PRCPNTE: this.MinUnidPart,
        MXMO_UNDDES_PRCPNTE: this.MaxUnidPart,
        CNTDAD_CMPRAS_INDVDLES: this.CantComprI,
        VLOR_ARRNQUE_LIDER: this.PrecioFinLider,
        VLOR_FNAL_PRTCPNTE: this.PrecioFinPart,
        ID_SCTOR_OFRTA: this.SessionSectorSel
      }
      console.log(Body)
      this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
        this.Respuesta = '';
        var arreglores = ResultUpdate.split('|')
        this.Respuesta = arreglores[1];
        this.ValidaToppings = '1';
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
        this.rutas.navigateByUrl('/home/buscaroferta')
        if (this.DataSectores.length > 0) {
          for (var i = 0; i < this.DataSectores.length; i++) {
            this.serviciosvaloracion.EnviarSms('7', '0', this.SessionOferta, this.DataSectores[i].ID_SCTOR_OFRTA, '0').subscribe(Resultado => {
              console.log(Resultado)
            })
            this.serviciosvaloracion.CorreoMasivo('1', '9', '2', this.SessionOferta, this.DataSectores[i].ID_SCTOR_OFRTA).subscribe(ResultCorreo => {
              console.log(ResultCorreo)
            })
          }
        }
      }
    })
  }
}
