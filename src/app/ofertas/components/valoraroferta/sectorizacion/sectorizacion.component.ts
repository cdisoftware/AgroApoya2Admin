import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

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
  DescSec: string = '';
  Coor1: string = '';
  Coor2: string = '';
  SessionCDMunicipio: any;
  SessionCDRegion: any;
  SessionCiudad: any;
  SessionIdUsuario: any;

  constructor(private modalService: NgbModal, public sectoresservices: ValorarofertaService) { }

  ngOnInit(): void {
    this.DesSect = '';
    this.CoordeSect = '';
    this.Cant = '';
    this.VlrFle = '';
    this.SectSelec = '';
    this.SessionOferta = '1011'
    this.SessionIdUsuario = '265'
    this.ConsultaSectores();
    this.ConsultaCiudadOferta();
    this.ConsultaSectoresOferta();

  }
  ConsultaCiudadOferta() {
    this.sectoresservices.ConsultaCiudadOferta('1',this.SessionOferta).subscribe(ResultadoCons=>{
      this.SessionCiudad=ResultadoCons[0].Cuidad;  
      this.SessionCDMunicipio=ResultadoCons[0].CD_MNCPIO;
      this.SessionCDRegion=ResultadoCons[0].CD_RGION;      
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
    this.sectoresservices.ConsultaSectores('1', '0', '0', '0', '0').subscribe(Result => {
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
      console.log(BodyInsert)
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

  CreaSector(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    const BodyInsert={
      USUCODIG: this.SessionIdUsuario,
      SCTOR_OFR: 0,
      DSCRPCION_SCTOR: "PRUEBA JJ",
      LAT_NORTE: "4.7009775788652295",
      LONG_NORTE: "-74.04076423783454",
      LAT_SUR:"4.673272942743481",
      LONG_SUR: "-74.01566563955751",
      CD_RGION: this.SessionCDRegion,
      CD_MNCPIO: this.SessionCDMunicipio
    }
    this.sectoresservices.InsertarSector('3', BodyInsert).subscribe(ResultInsert=>{
      console.log(ResultInsert)
    })
  }

  selectSector(item: any) {
    this.Cant = '';
    this.VlrFle = '';
    this.SectSelec = item.SCTOR_OFRTA;
  }

  LimpiaForm() {
    window.location.reload();
  }

}
