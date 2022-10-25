import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { Router } from '@angular/router'
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';

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
  MuestraFijoI: string ='';
  MuestraPorcentaje: string = '';
  MuestraPorcentajeI: string ='';
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



  constructor(private serviciosvaloracion: ValorarofertaService, ConfigAcord: NgbAccordionConfig, private modalService: NgbModal, private cookies: CookieService, public rutas: Router, private SeriviciosGenerales: MetodosglobalesService) {
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
    this.MuestraVigencial = '0';
    this.MuestraGrupal = '0';
    this.MuestraIndividual = '0';
    this.ValidaVigencia = '0';
    this.ValidaTipoOfer = '0';
    this.CantGrupos = '1';
    //this.UnidXGrupos = '2';
    this.SessionCantSector = '';
    this.SessionTipoComI = '';
    this.VlrComFijaG = '0';
    this.VlrDomiG = '0';
    this.VlrComPorG = '0';
    this.MinUnidLider = '0';
    this.MaxUnidLider = '1';
    this.MinUnidPart = '0';
    this.MaxUnidPart = '0';
    this.PorcDescLider = '0';
    this.PubliOferObser = '';
    this.RutaImagen = this.SeriviciosGenerales.RecuperaRutaImagenes();
    this.SessionOferta = this.cookies.get('IDO');
    this.SessionIdUsuario = this.cookies.get('IDU');
    this.ConsultaDetalleOferta();
    this.ConsultaSectores();
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
    })
  }

  ConsultaSectores() {
    this.serviciosvaloracion.ConsultaSectoresOferta('2', this.SessionOferta).subscribe(ResultConsulta => {
      //console.log(ResultConsulta)
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
    console.log(item)
    this.ValidaVigencia = '1';
    this.CodigoOferSector = item.COD_OFERTA_SECTOR;
    this.VlrFletSect = item.VLOR_FLTE_SGRDOForm;
    this.SessionCantSector = item.CNTDAD
    this.SessionSectorSel = item.ID_SCTOR_OFRTA
    this.ConsultaVigenciaOferta();
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
    this.MuestraFijoI = '0';
    this.MuestraPorcentajeI = '0';
    this.PreFinI = '';
  }

  LimpiaTipoComision(item: any) {
    this.MuestraFijo = '0';
    this.MuestraPorcentaje = '0';
  }

  GuardaIndividual(templateMensaje: any) {
    var validacomision = '';
    if (this.SessionTipoComI == '1') {
      validacomision = this.VlrComFijaI
    }
    else {
      validacomision = this.VlrComPorI
    }
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
    console.log(Body)
    this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
      this.Respuesta = '';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
      var arreglores = ResultUpdate.split('|')
      this.Respuesta = arreglores[1];
    })
  }

  GuardaGrupal(templateMensaje: any) {
    var validacomision = '';
    if (this.SessionTipoComG == '1') {
      validacomision = this.VlrComFijaG
    }
    else {
      validacomision = this.VlrComPorG
    }
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
    console.log(Body)
    this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
      this.Respuesta = '';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
      var arreglores = ResultUpdate.split('|')
      this.Respuesta = arreglores[1];
    })
  }

  GuardarMixta(templateMensaje: any) {
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
    const Body = {
      CD_CNSCTVO: this.SessionOferta,
      TPO_OFRTA: this.SessionTipoOferta,
      TPO_CMSION_INDVDUAL: Number(this.SessionTipoComI),
      VLOR_CMSION_INDVDUAL: validacomision,
      MNMO_UNDDES_INDVDUAL: this.MinUnidI,
      MXMO_UNDDES_INDVDUAL: this.MaxUnidI,
      VLOR_DMNCLIO_INDVDUAL: this.VlrDomiI,
      VLOR_FNAL_INDVDUAL: this.PreFinI,
      TPO_CMSION_GRPAL: this.SessionTipoComG,
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
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
      var arreglores = ResultUpdate.split('|')
      this.Respuesta = arreglores[1];
    })
  }

  GuardaVigencia(templateMensaje: any) {
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
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
      var arreglores = ResultUpdate.split('|')
      this.Respuesta = arreglores[1];
      this.ValidaTipoOfer = '1';
      this.ConsultaValoracionOferta();
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
        this.serviciosvaloracion.CorreoMasivo('1', '9', '2', this.SessionOferta).subscribe(ResultCorreo => {
          console.log(ResultCorreo)
        })
      }
    })
  }
}
