import { Component, OnInit, TemplateRef } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sectorizacion',
  templateUrl: './sectorizacion.component.html',
  styleUrls: ['./sectorizacion.component.css']
})
export class SectorizacionComponent implements OnInit {
  DesSect: string = '';
  CoordeSect: string = '';
  Cant: string = '';
  VlrFle: string = '';
  DataSectores: any;
  keyword: string = '';
  SectSelec: any;
  Respuesta: any;
  SessionOferta: any;
  DataSectorOferta: any[] = [];
  ValidaConsulta: string = '';
  txtValidaCons: string = '';
  NombreSec: string = '';
  Coor1: string = '';
  Coor2: string = '';
  SessionCDMunicipio: any;
  SessionCDRegion: any;
  SessionCiudad: any;
  SessionIdUsuario: any;
  ModalInsert : NgbModalRef | undefined ;


  constructor(private modalService: NgbModal, public sectoresservices: ValorarofertaService, public rutas: Router, private cookies:CookieService) { }

  ngOnInit(): void {
    this.DesSect = '';
    this.CoordeSect = '';
    this.Cant = '';
    this.VlrFle = '';
    this.SectSelec = '';
    this.SessionOferta = this.cookies.get('IDO');
    this.SessionIdUsuario = this.cookies.get('IDU');        
    this.SessionCDMunicipio = '0';
    this.SessionCDRegion = '0';
    this.SessionCiudad = '0';
    this.ConsultaCiudadOferta();
    this.ConsultaSectoresOferta();
  }
  ConsultaCiudadOferta() {
    this.sectoresservices.ConsultaCiudadOferta('1', this.SessionOferta).subscribe(ResultadoCons => {
      console.log(ResultadoCons)        
      this.SessionCiudad = ResultadoCons[0].Cuidad;
      this.SessionCDMunicipio = ResultadoCons[0].CD_MNCPIO;
      this.SessionCDRegion = ResultadoCons[0].CD_RGION;
      this.ConsultaSectores();
    })
  }
  ConsultaSectoresOferta() {
    this.sectoresservices.ConsultaSectoresOferta('1', this.SessionOferta).subscribe(ResultConsulta => {
      if (ResultConsulta.length > 0) {
        this.ValidaConsulta = '0';
        this.DataSectorOferta = ResultConsulta;
      }
      else {
        this.ValidaConsulta = '1';
        this.DataSectorOferta = [];
        this.txtValidaCons = 'No se encuentran registros de sectores asociados a la oferta';
      }
    })
  }

  ConsultaSectores() {    
    this.sectoresservices.ConsultaSectores('1', '0', '0', this.SessionCDRegion, this.SessionCDMunicipio).subscribe(Result => {    
      this.DataSectores = Result;
      this.keyword = 'DSCRPCION_SCTOR';
    })
  }

  AsociaSector(templateRespuesta: any) {
    this.Respuesta = '';
    if (this.Cant != '' && this.VlrFle != '' && this.SectSelec != '') {
      const BodyInsert = {
        ID: "0",
        CD_CNSCTVO: this.SessionOferta,
        ID_SCTOR_OFRTA: this.SectSelec,
        CNTDAD: this.Cant,
        VLOR_FLTE_SGRDO: this.VlrFle
      }      
      this.sectoresservices.OperacionSectores('3', BodyInsert).subscribe(ResultInsert => {
        var respuesta = ResultInsert.split('|')
        this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
        this.Respuesta = respuesta[1]
        this.ConsultaSectoresOferta();
      })
    }
    else {
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = 'Los campos Sector, Cantidad y Valor flete son obligatorios, favor valida tu información.';
    }

  }

  EliminaSector(sector: any, templateRespuesta: any) {
    const BodyDelete = {
      ID: "0",
      CD_CNSCTVO: sector.CD_CNSCTVO,
      ID_SCTOR_OFRTA: sector.ID_SCTOR_OFRTA,
      CNTDAD: sector.CNTDAD,
      VLOR_FLTE_SGRDO: sector.VLOR_FLTE_SGRDO
    }
    this.sectoresservices.OperacionSectores('4', BodyDelete).subscribe(ResultDelet => {
      var respuesta = ResultDelet.split('|')
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = respuesta[1]
      this.ConsultaSectoresOferta();
    })
  }

  AbreCreaSector(content: any) {    
    this.ModalInsert = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  CreaSector(templateRespuesta: any) {
    if (this.NombreSec != '' && this.Coor1 != '' && this.Coor2 != '') {
      var latitudes1 = this.Coor1.split(',')
      var latitudes2 = this.Coor2.split(',')
      var lat_norte = latitudes1[0].replace(',', '').trim();
      var lon_norte = latitudes1[1].trim();
      var lat_sur = latitudes2[0].replace(',', '').trim();
      var lon_sur = latitudes2[1].trim();
      const BodyInsert = {
        USUCODIG: this.SessionIdUsuario,
        SCTOR_OFR: 0,
        DSCRPCION_SCTOR: this.NombreSec,
        LAT_NORTE: lat_norte,
        LONG_NORTE: lon_norte,
        LAT_SUR: lat_sur,
        LONG_SUR: lon_sur,
        CD_RGION: this.SessionCDRegion,
        CD_MNCPIO: this.SessionCDMunicipio
      }      
      this.sectoresservices.InsertarSector('3', BodyInsert).subscribe(ResultInsert => {
        this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })        
        this.Respuesta = ResultInsert;
        this.ModalInsert?.close();
        this.ConsultaCiudadOferta();
      })
    }
    else {
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = "Los campos Nombre sector, Coordenada norte y Coordenada sur son obligatorios, favor valida tu información."
    }

  }
  
  LimpiaModal() {
    this.NombreSec = '';
    this.Coor1 = '';
    this.Coor2 = '';
  }

  selectSector(item: any) {
    this.Cant = '';
    this.VlrFle = '';
    this.SectSelec = item.SCTOR_OFRTA;
  }

  LimpiaForm() {
    window.location.reload();
  }

  Enviar(){
    this.rutas.navigateByUrl('/home/transportista');
  }

  Volver(){
    this.rutas.navigateByUrl('/home/conciliacion')
  }

}
