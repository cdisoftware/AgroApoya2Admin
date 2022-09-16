import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { Router } from '@angular/router'

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
  MuestraPorcentaje: string = '';
  MuestraVigencial: string = '';
  VlrComFijaI: string = '';
  MinUnidI: any;
  MaxUnidI: any;
  PreFinI: any;
  VlrDomiI: any;
  Respuesta: string = '';
  modalRespuesta: NgbModalRef | undefined
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



  constructor(private serviciosvaloracion: ValorarofertaService, ConfigAcord: NgbAccordionConfig, private modalService: NgbModal, private cookies : CookieService, public rutas : Router) {
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
    this.MuestraVigencial='0';
    this.MuestraGrupal='0';
    this.MuestraIndividual='0';
    this.SessionOferta = this.cookies.get('IDO');
    this.SessionIdUsuario = this.cookies.get('IDU');
    this.ConsultaDetalleOferta();
    this.ConsultaSectores();
    this.ConsultaValoracionOferta();
  }

  ConsultaDetalleOferta() {
    this.serviciosvaloracion.ConsultaOferta('1', this.SessionOferta).subscribe(ResultConsu => {
      this.DataOferta = ResultConsu;
    })
  }

  ConsultaSectores() {
    this.serviciosvaloracion.ConsultaSectoresOferta('1', this.SessionOferta).subscribe(ResultConsulta => {      
      if (ResultConsulta.length > 0) {
        this.keywordSec = 'DSCRPCION_SCTOR';
        this.DataSectores = ResultConsulta;
      }
    })   
  }

  ConsultaValoracionOferta() {
    this.serviciosvaloracion.ConsultaValoracionOferta('1', this.SessionOferta).subscribe(ResultCons => {
      //console.log(ResultCons)
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
        this.UnidXGrupos = ResultCons[0].unddes_xgrpo;
        this.CantComprI = ResultCons[0].cntdad_cmpras_indvdles;
        this.PrecioFinLider = ResultCons[0].vlor_fnal_lider;
        this.PrecioFinPart = ResultCons[0].vlor_fnal_prtcpnte;
      }
      this.VigenDesde = ResultCons[0].vgncia_desde;
      this.VigenHasta = ResultCons[0].vgncia_hasta;
      this.HoraIni = ResultCons[0].hora_desde;
      this.HoraFin = ResultCons[0].hora_hasta;
      this.FechaEntrega = ResultCons[0].fcha_vgncia;
      this.Observaciones = ResultCons[0].observaciones;      
    })
  }

  selectTipOferta(item: any) {
    //console.log(item)
    this.SessionTipoOferta = item.id;
    this.MuestraVigencial = '1';
    if (item.id == 1) {
      this.MuestraIndividual = '1';
      this.MuestraGrupal = '0';
    }
    else if (item.id == 2) {
      this.MuestraIndividual = '0';
      this.MuestraGrupal = '1';
    }
    else if(item.id == 3){
      this.MuestraIndividual = '1';
      this.MuestraGrupal = '1';
    }
    else {
      this.MuestraVigencial = '0';
      this.MuestraIndividual = '0';
      this.MuestraGrupal = '0';
    }
  }

  selectTipComiI(item: any) {
    //console.log(item)
    this.SessionTipoComI = item.id;
    if (item.name == 'Valor Fijo') {
      this.MuestraFijo = '1';
      this.MuestraPorcentaje = '0';
    }
    else {
      this.MuestraFijo = '0';
      this.MuestraPorcentaje = '1';
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

  LimpiaTipoComision(item: any) {
    this.MuestraFijo = '0';
    this.MuestraPorcentaje = '0';
  }

  GuardaIndividual(templateMensaje: any) {
    //console.log(this.SessionTipoComI)
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
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
      UNDDES_XGRPO: "0",
      MNMO_UNDDES_PRCPNTE: "0",
      MXMO_UNDDES_PRCPNTE: "0",
      CNTDAD_CMPRAS_INDVDLES: "0",
      VLOR_FNAL_LIDER: "0",
      VLOR_FNAL_PRTCPNTE: "0",
      VGNCIA_DESDE: "",
      VGNCIA_HASTA: "",
      HORA_DESDE: 0,
      HORA_HASTA: 0,
      FCHA_ENTRGA: "",
      OBSERVACIONES: ""
    }
    //console.log(Body)
    this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
      var arreglores = ResultUpdate.split('|')
      this.Respuesta = arreglores[1];
    })
  }

  GuardaGrupal(templateMensaje: any) {
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
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
      VLOR_CMSION_GRPAL: this.VlrComFijaG,
      MNMO_UNDDES_LIDER: this.MinUnidLider,
      MXMO_UNDDES_LIDER: this.MaxUnidLider,
      PRCNTJE_DCTO_LIDER: this.PorcDescLider,
      VLOR_DMNCLIO_GRPAL: this.VlrDomiG,
      CNTDAD_GRPOS: this.CantGrupos,
      UNDDES_XGRPO: this.UnidXGrupos,
      MNMO_UNDDES_PRCPNTE: this.MinUnidPart,
      MXMO_UNDDES_PRCPNTE: this.MaxUnidPart,
      CNTDAD_CMPRAS_INDVDLES: this.CantComprI,
      VLOR_FNAL_LIDER: this.PrecioFinLider,
      VLOR_FNAL_PRTCPNTE: this.PrecioFinPart,
      VGNCIA_DESDE: "",
      VGNCIA_HASTA: "",
      HORA_DESDE: 0,
      HORA_HASTA: 0,
      FCHA_ENTRGA: "",
      OBSERVACIONES: ""
    }
    this.serviciosvaloracion.ActualizarOfertaValoracion('3', Body).subscribe(ResultUpdate => {
      var arreglores = ResultUpdate.split('|')
      this.Respuesta = arreglores[1];
    })
  }

  GuardaVigencia(templateMensaje: any) {
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    const Body = {
      CD_CNSCTVO: this.SessionOferta,
      TPO_OFRTA: Number(this.SessionTipoOferta),
      TPO_CMSION_INDVDUAL: 0,
      VLOR_CMSION_INDVDUAL: "0",
      MNMO_UNDDES_INDVDUAL: "0",
      MXMO_UNDDES_INDVDUAL: "0",
      VLOR_DMNCLIO_INDVDUAL: "0",
      VLOR_FNAL_INDVDUAL: "0",
      TPO_CMSION_GRPAL: "0",
      VLOR_CMSION_GRPAL: "0",
      MNMO_UNDDES_LIDER: "0",
      MXMO_UNDDES_LIDER: "0",
      PRCNTJE_DCTO_LIDER: "0",
      VLOR_DMNCLIO_GRPAL: "0",
      CNTDAD_GRPOS: "0",
      UNDDES_XGRPO: "0",
      MNMO_UNDDES_PRCPNTE: "0",
      MXMO_UNDDES_PRCPNTE: "0",
      CNTDAD_CMPRAS_INDVDLES: "0",
      VLOR_FNAL_LIDER: "0",
      VLOR_FNAL_PRTCPNTE: "0",
      VGNCIA_DESDE: this.VigenDesde,
      VGNCIA_HASTA: this.VigenHasta,
      HORA_DESDE: this.HoraIni,
      HORA_HASTA: this.HoraFin,
      FCHA_ENTRGA: this.FechaEntrega,
      OBSERVACIONES: this.Observaciones
    }
    this.serviciosvaloracion.ActualizarOfertaValoracion('4', Body).subscribe(ResultUpdate => {
      var arreglores = ResultUpdate.split('|')
      this.Respuesta = arreglores[1];
    })
  }

  PublicarOferta(templateMensaje: any) {
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })    
    const BodyUpdate = {
      usucodig: this.SessionIdUsuario,
      cnctivoOferta: this.SessionOferta,
      descripcion: "Publicacion oferta",
      estado: 8
    }    
    this.serviciosvaloracion.PublicarOferta('3', BodyUpdate).subscribe(ResultUpdate => {
      //console.log(ResultUpdate)
      var arreglores = ResultUpdate.split('|')
      this.Respuesta = arreglores[1];
    })
    this.rutas.navigateByUrl('/home')
  }

  Volver(){
    this.rutas.navigateByUrl('/home/costeo');
  }
}
