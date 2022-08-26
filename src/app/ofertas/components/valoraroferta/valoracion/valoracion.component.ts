import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css']
})
export class ValoracionComponent implements OnInit {
  SessionOferta: string = '';
  DataOferta: any[] = [];
  keyword: string = '';
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



  constructor(private serviciosvaloracion: ValorarofertaService, ConfigAcord: NgbAccordionConfig, private modalService: NgbModal) {
    ConfigAcord.closeOthers = true;
  }

  ngOnInit(): void {
    this.keyword = 'name';
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
        name: 'Fija'
      },
      {
        id: 2,
        name: 'Porcentaje'
      }
    ]
    this.SessionOferta = '1011';    
    this.ConsultaDetalleOferta();
    this.ConsultaValoracionOferta();    
  }
  ConsultaValoracionOferta() {
    this.serviciosvaloracion.ConsultaValoracionOferta('1', this.SessionOferta).subscribe(ResultCons => {      
      this.ArrayTipoOferCon = [
        {
          id: ResultCons[0].TPO_OFRTA,
          name: ResultCons[0].Dscpcion_tpo_ofrta
        }
      ]
      console.log(ResultCons)
    })
  }

  ConsultaDetalleOferta() {
    this.serviciosvaloracion.ConsultaOferta('1', this.SessionOferta).subscribe(ResultConsu => {
      this.DataOferta = ResultConsu;
    })
  }

  selectTipOferta(item: any) {
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
    else {
      this.MuestraIndividual = '1';
      this.MuestraGrupal = '1';
    }
  }

  selectTipComiI(item: any) {
    this.SessionTipoComI = item.id;
    if (item.id == 1) {
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
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    const Body = {
      CD_CNSCTVO: this.SessionOferta,
      TPO_OFRTA: 1,
      TPO_CMSION_INDVDUAL: Number(this.SessionTipoComI),
      VLOR_CMSION_INDVDUAL: this.VlrComFijaI,
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
}
