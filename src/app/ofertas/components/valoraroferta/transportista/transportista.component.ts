import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
  SessionIdUsuario: any;

  constructor(public sectoresservices: ValorarofertaService, private modalService: NgbModal, private rutas:Router, private cookies:CookieService) { }

  ngOnInit(): void {
    this.CodTransSelec = '';
    this.VlrFlete = '';
    this.SessionCiudad = '';
    this.TransSelec = '';
    this.SectorSelec = '';
    this.SessionCDRegion = '0';
    this.SessionCDMunicipio = '0';
    this.SessionOferta = this.cookies.get('IDO');
    this.SessionIdUsuario = this.cookies.get('IDU');
    this.ConsultaCiudadOferta();
    this.ConsultaCondOferta();
  }
  ConsultaCondOferta() {
    this.sectoresservices.ConsultaConductoresOferta('1', this.SessionOferta).subscribe(ResultConsult => {
      if (ResultConsult.length > 0) {
        this.ValidaConsulta = '0';
        this.DataTransOferta = ResultConsult;
      }
      else {
        this.ValidaConsulta = '1';
        this.DataTransOferta = [];
        this.txtValidaCons = 'No se encuentran registros de transportistas asociados a la oferta'
      }
    })
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
    this.sectoresservices.ConsultaSectoresOferta('1', this.SessionOferta).subscribe(ResultConsulta => {
      if (ResultConsulta.length > 0) {
        this.keyword = 'DSCRPCION_SCTOR';
        this.DataSectores = ResultConsulta;
      }
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
      console.log(BodyInsert)
      this.sectoresservices.OperacionTransportista('3', BodyInsert).subscribe(ResultInsert => {
        var arrayrespuesta = ResultInsert.split('|')
        this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
        this.Respuesta = arrayrespuesta[1];
        this.ConsultaCiudadOferta();
        this.ConsultaCondOferta();
      })
    }
    else {
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = "Los campos Sector, Transportista y Valor flete son obligatorios, favor valida tu información."
    }
  }

  EliminaTransportista(transportista: any, templateRespuesta: any) {    
    console.log(transportista)
    const BodyDelete = {
      ID: transportista.ID,
      CD_CNSCTVO: this.SessionOferta,
      ID_SCTOR_OFRTA: transportista.ID_SCTOR_OFRTA,
      ID_CNDCTOR: transportista.ID_CNDCTOR,
      USUCODIG_TRANS: transportista.USUCODIG_TRANS,
      VLOR_FLTE_PCTDO: transportista.VLOR_FLTE_PCTDO
    }
    console.log(BodyDelete)
    this.sectoresservices.OperacionTransportista('4', BodyDelete).subscribe(ResultInsert => {
      var arrayrespuesta = ResultInsert.split('|')
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = arrayrespuesta[1];
      this.ConsultaCiudadOferta();
      this.ConsultaCondOferta();
    })
  }

  selectSector(item: any) {    
    this.SectorSelec = item.ID_SCTOR_OFRTA;
  }

  selectTrans(item: any) {
    console.log(item)
    this.CodTransSelec = item.USUCODIG_TRANS;
    this.TransSelec = item.ID_CNDCTOR;
  }

  LimpiaForm() {
    window.location.reload();
  }

  Enviar(){
    this.rutas.navigateByUrl('/home/valoracion')
  }

}
