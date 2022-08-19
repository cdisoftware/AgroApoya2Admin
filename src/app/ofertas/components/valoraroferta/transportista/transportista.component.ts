import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-transportista',
  templateUrl: './transportista.component.html',
  styleUrls: ['./transportista.component.css']
})
export class TransportistaComponent implements OnInit {
  SessionOferta: string = '';
  SessionCiudad: any;
  SessionCDMunicipio: any;
  SessionCDRegion: any;
  DataSectores: any[] = [];
  keyword: string = '';
  DataTransportista: any[] = [];
  keywordT: string = '';
  SectorSelec: any;
  TransSelec: any;
  VlrFlete: any;
  CodTransSelec: any;
  Respuesta: string = '';
  DataTransOferta: any[] = [];
  ValidaConsulta: string = '';
  txtValidaCons: string = '';

  constructor(public sectoresservices: ValorarofertaService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.CodTransSelec = '';
    this.VlrFlete = '';
    this.SessionCiudad = '';
    this.TransSelec = '';
    this.SectorSelec = '';
    this.SessionCDRegion = '0';
    this.SessionCDMunicipio = '0';
    this.SessionOferta = '1011'
    this.ConsultaCiudadOferta();
  }

  ConsultaCiudadOferta() {
    this.sectoresservices.ConsultaCiudadOferta('1', this.SessionOferta).subscribe(ResultadoCons => {
      this.SessionCiudad = ResultadoCons[0].Cuidad;
      this.SessionCDMunicipio = ResultadoCons[0].CD_MNCPIO;
      this.SessionCDRegion = ResultadoCons[0].CD_RGION;
      this.ConsultaSectores();
      this.ConsultaTransportistas();
    })
  }

  ConsultaSectores() {
    this.sectoresservices.ConsultaSectores('1', '0', '0', this.SessionCDRegion, this.SessionCDMunicipio).subscribe(Result => {
      this.DataSectores = Result;
      this.keyword = 'DSCRPCION_SCTOR';
    })
  }

  ConsultaTransportistas() {
    const Body = {
      NMBRE_CNDCTOR: "0"
    }
    this.sectoresservices.ConsultaConductoresSector('1', this.SessionOferta, '0', '0', this.SessionCDRegion, this.SessionCDMunicipio, Body).subscribe(ResultCons => {
      this.DataTransportista = ResultCons;
      this.keywordT = 'nombre_conductor';
    })
  }

  AsociaTransportista(templateRespuesta: any) {
    if (this.VlrFlete != '' && this.TransSelec != '' && this.SectorSelec != '') {
      const BodyInsert = {
        ID: "0",
        CD_CNSCTVO: this.SessionOferta,
        ID_SCTOR_OFRTA: this.SectorSelec,
        ID_CNDCTOR: this.TransSelec,
        USUCODIG_TRANS: this.CodTransSelec,
        VLOR_FLTE_PCTDO: this.VlrFlete
      }
      this.sectoresservices.OperacionTransportista('3', BodyInsert).subscribe(ResultInsert => {
        var arrayrespuesta = ResultInsert.split('|')
        this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
        this.Respuesta = arrayrespuesta[1];
      })
    }
    else {
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = "Los campos Sector, Transportista y Valor flete son obligatorios, favor valida tu información."
    }
  }

  EliminaTransportista(transportista: any, templateRespuesta: any) {
    // const BodyDelete = {
    //   ID: "0",
    //   CD_CNSCTVO: transportista,
    //   ID_SCTOR_OFRTA: transportista,
    //   ID_CNDCTOR: transportista,
    //   USUCODIG_TRANS: transportista,
    //   VLOR_FLTE_PCTDO: transportista
    // }
    // this.sectoresservices.OperacionTransportista('4', BodyDelete).subscribe(ResultInsert => {
    //   var arrayrespuesta = ResultInsert.split('|')
    //   this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
    //   this.Respuesta = arrayrespuesta[1];
    // })
  }

  selectSector(item: any) {
    this.SectorSelec = item.SCTOR_OFRTA;
  }

  selectTrans(item: any) {
    console.log(item)
    this.CodTransSelec = item.USUCODIG_TRANS;
    this.TransSelec = item.ID_CNDCTOR;
  }

  LimpiaForm() {
    window.location.reload();
  }

}
