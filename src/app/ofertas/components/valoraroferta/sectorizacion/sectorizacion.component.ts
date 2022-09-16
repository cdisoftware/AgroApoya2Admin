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
  DataCoor: any[] = [];
  ValidaConsulta: string = '';
  txtValidaCons: string = '';
  NombreSec: string = '';
  Coor1: string = '';
  Coor2: string = '';
  SessionCDMunicipio: any;
  SessionCDRegion: any;
  SessionCiudad: any;
  SessionIdUsuario: any;
  ModalInsert: NgbModalRef | undefined;
  ModalRespuesta: NgbModalRef | undefined;
  CantidadSectores: number;
  SessionCantSecOferta: any;
  SessionNomOferta: string;
  markers: google.maps.Marker[] = [];
  ValidaInsertSec: string = '';
  SessionSecCreado: any;
  ValidaCoord: string;

  constructor(private modalService: NgbModal, public sectoresservices: ValorarofertaService, public rutas: Router, private cookies: CookieService) { }

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
    this.CantidadSectores = 0;
    this.ValidaInsertSec = '0';
    this.Coor1 = '';
    this.Coor2 = '';
    this.SessionSecCreado = '';
    this.ConsultaCiudadOferta();
    this.ConsultaSectoresOferta();
    this.ConsultaDetalleOferta();
  }

  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map) {
    if (this.markers.length > 0) {
      this.markers[0].setMap(null)
    }
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    this.markers = [];
    this.markers.push(marker);
  }

  ConsultaDetalleOferta() {
    this.sectoresservices.ConsultaOferta('1', this.SessionOferta).subscribe(ResultConsu => {
      //console.log(ResultConsu);
      this.SessionNomOferta = ResultConsu[0].Nombre_Producto + ' - ' + ResultConsu[0].Descripcion_empaque + ' - ' + ResultConsu[0].Nombre_productor;
      this.SessionCantSecOferta = ResultConsu[0].Unidades_disponibles;
    })
  }

  ConsultaCiudadOferta() {
    this.sectoresservices.ConsultaCiudadOferta('1', this.SessionOferta).subscribe(ResultadoCons => {
      //console.log(ResultadoCons)
      this.SessionCiudad = ResultadoCons[0].Cuidad;
      this.SessionCDMunicipio = ResultadoCons[0].CD_MNCPIO;
      this.SessionCDRegion = ResultadoCons[0].CD_RGION;
      this.ConsultaSectores();
    })
  }

  ConsultaSectoresOferta() {
    this.sectoresservices.ConsultaSectoresOferta('1', this.SessionOferta).subscribe(ResultConsulta => {
      //console.log(ResultConsulta)
      if (ResultConsulta.length > 0) {
        this.ValidaConsulta = '0';
        this.DataSectorOferta = ResultConsulta;
        this.CantidadSectores = 0
        for (let i = 0; i < ResultConsulta.length; i++) {
          this.CantidadSectores += ResultConsulta[i].CNTDAD;
        }
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
    if (this.CantidadSectores == this.SessionCantSecOferta) {
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = 'Las cantidades totales de la oferta ya fueron asignadas, no es posible asignar mas sectores.';
    }
    else {
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
          this.Respuesta = respuesta[1];
          this.ConsultaSectoresOferta();
        })
      }
      else {
        this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
        this.Respuesta = 'Los campos Sector, Cantidad y Valor flete son obligatorios, favor valida tu información.';
      }
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

  AbreCreaSector(content: any, templateRespuesta: any) {
    this.NombreSec = '';
    this.ModalInsert = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })

  }

  CreaSector(templateRespuesta: any) {
    if (this.NombreSec != '') {
      const BodyInsert = {
        USUCODIG: this.SessionIdUsuario,
        SCTOR_OFR: 0,
        DSCRPCION_SCTOR: this.NombreSec,
        CD_RGION: this.SessionCDRegion,
        CD_MNCPIO: this.SessionCDMunicipio
      }
      this.sectoresservices.InsertarSector('3', BodyInsert).subscribe(ResultInsert => {
        const arrayRes = ResultInsert.split('|')
        this.SessionSecCreado = arrayRes[0];
        this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
        this.Respuesta = arrayRes[1];
        this.ConsultaCiudadOferta();
        if (this.SessionSecCreado != undefined) {
          this.ValidaInsertSec = '1';
          this.CreaMapa();
        }
        else {
          this.ValidaInsertSec = '0';
        }
      })
    }
    else {
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = "Los campos Nombre sector y coordenadas son obligatorios, favor valida tu información."
    }
  }

  CerrModalMap(templateRespuesta: any) {
    this.SessionSecCreado = '0';
    this.ValidaInsertSec = '0';
    this.ValidaCoord = '0';
    this.DataCoor = [];
    this.modalService.dismissAll();
  }

  CreaMapa() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 15,
        center: {
          lat: 5.745986,
          lng: -73.003634
        },
      }
    );
    map.addListener("click", (e: any) => {
      this.AgregarMarcador(e.latLng, map);
      this.Coor1 = e.latLng.toString()
      this.Coor1 = this.Coor1.substring(1, 15)
      this.Coor2 = e.latLng.toString()
      this.Coor2 = this.Coor2.substring(this.Coor2.indexOf('-'), this.Coor2.length - 1)
    });
  }

  AgregarCoordenada(templateRespuesta: any) {
    if (this.Coor1 != '' && this.Coor2 != '') {
      const BodyInsertCoo = {
        ID: 0,
        ID_SCTOR_OFRTA: Number(this.SessionSecCreado),
        LTTUD: this.Coor1,
        LNGTUD: this.Coor2
      }
      this.sectoresservices.InsertarCoordenadas('3', BodyInsertCoo).subscribe(Resultado => {
        const arrayRes = Resultado.split('|')
        this.Respuesta = arrayRes[1];
        this.Coor1 = '';
        this.Coor2 = '';
        this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
        this.ConsultaCoordenadas()
      })
    }
    else {
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = "Los campos coordenadas son obligatorios, favor valida tu información.";
    }
  }

  ConsultaCoordenadas() {
    console.log('1', this.SessionSecCreado)
    this.sectoresservices.ConsultaCoordenada('1', this.SessionSecCreado).subscribe(Result => {
      if (Result.length > 0) {
        this.ValidaCoord = '1';
        this.DataCoor = Result;
      }
      else {
        this.ValidaCoord = '0';
        this.DataCoor = [];
      }

    })
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

  Enviar(templateRespuesta: any) {
    if (this.CantidadSectores == this.SessionCantSecOferta) {
      this.rutas.navigateByUrl('/home/transportista');
    }
    else {
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = 'Las cantidades totales de la oferta aun no han sido asignadas, favor valida tu información.';
    }
  }

  Volver() {
    this.rutas.navigateByUrl('/home/conciliacion')
  }

}
