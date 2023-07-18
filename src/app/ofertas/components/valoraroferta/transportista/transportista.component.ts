import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';

@Component({
  selector: 'app-transportista',
  templateUrl: './transportista.component.html',
  styleUrls: ['./transportista.component.css']
})

export class TransportistaComponent implements OnInit, OnDestroy {

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
  DataOferta: any[];
  RutaImagen: string;
  DataConductor: any[];
  SessionValorFlete: any;
  Sector: string;
  Transpor: string;
  Intervalotiempo: any;

  constructor(public sectoresservices: ValorarofertaService, private modalService: NgbModal, private rutas: Router, private cookies: CookieService, private SeriviciosGenerales: MetodosglobalesService) { }

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
    this.RutaImagen = this.SeriviciosGenerales.RecuperaRutaImagenes();
    this.ConsultaCiudadOferta();
    this.ConsultaCondOferta();
    this.ConsultaDetalleOferta();
    this.Intervalotiempo = setInterval(() => {
      this.ConsultaCondOferta();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.Intervalotiempo) {
      clearInterval(this.Intervalotiempo);
    }
  }

  ConsultaDetalleOferta() {
    this.sectoresservices.ConsultaOferta('1', this.SessionOferta).subscribe(ResultConsu => {
      this.DataOferta = ResultConsu;
    })
  }

  ConsultaCondOferta() {
    console.log('Consulta conductores')
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

  RecuperaValor(valor: any) {
    this.SessionValorFlete = valor
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
        this.keyword = '';
        this.keyword = 'DSCRPCION_SCTOR';
        this.DataSectores = [];
        this.DataSectores = ResultConsulta;
      }
    })
  }

  ConsultaTransportistas() {
    const Body = {
      NMBRE_CNDCTOR: "0"
    }
    this.sectoresservices.ConsultaConductoresSector('1', this.SessionOferta, '0', '0', this.SessionCDRegion, this.SessionCDMunicipio, Body).subscribe(ResultCons => {
      this.DataTransportista = [];
      this.DataTransportista = ResultCons;
      this.keywordT = 'nombre_conductor';
    })
  }

  AsociaTransportista(templateRespuesta: any) {
    if (this.VlrFlete != '' && this.TransSelec != '' && this.SectorSelec != '') {
      const BodyInsert = {
        ID: "0",
        CD_CNSCTVO: this.SessionOferta,
        ID_SCTOR_OFRTA: this.SectorSelec.ID_SCTOR_OFRTA,
        ID_CNDCTOR: this.TransSelec.ID_CNDCTOR,
        USUCODIG_TRANS: this.CodTransSelec.USUCODIG_TRANS,
        VLOR_FLTE_PCTDO: this.VlrFlete
      }
      console.log(BodyInsert)
      this.sectoresservices.OperacionTransportista('3', BodyInsert).subscribe(ResultInsert => {
        this.ConsultaCondOferta();
        this.SectorSelec = '';
        this.TransSelec = '';
        this.VlrFlete = '';
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
    const BodyDelete = {
      ID: transportista.ID,
      CD_CNSCTVO: this.SessionOferta,
      ID_SCTOR_OFRTA: transportista.ID_SCTOR_OFRTA,
      ID_CNDCTOR: transportista.ID_CNDCTOR,
      USUCODIG_TRANS: transportista.USUCODIG_TRANS,
      VLOR_FLTE_PCTDO: this.SessionValorFlete
    }
    this.sectoresservices.OperacionTransportista('4', BodyDelete).subscribe(ResultInsert => {
      var arrayrespuesta = ResultInsert.split('|')
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = arrayrespuesta[1];
      this.ConsultaCiudadOferta();
      this.ConsultaCondOferta();
    })
  }

  selectSector(item: any) {
    console.log(item)
    this.SectorSelec = item;
    this.VlrFlete = item.VLOR_FLTE_SGRDO;
  }

  selectTrans(item: any) {
    //console.log(item)
    this.CodTransSelec = item;
    this.TransSelec = item;
  }

  LimpiaForm() {
    this.Transpor = '';
    this.Sector = '';
    this.VlrFlete = '';
  }

  Enviar(templateRespuesta: any) {
    this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
    const Body = {
      usucodig: this.SessionIdUsuario,
      cnctivoOferta: this.SessionOferta,
      ObsEstado: "",
      estado: 14,
      parametro1: "",
      parametro2: "",
      parametro3: ""
    }
    this.sectoresservices.ActualizaEstadoOferta('3', Body).subscribe(ResultUpda => {
      var respuesta = ResultUpda.split('|')
      this.Respuesta = respuesta[1];
      if (respuesta[0] != '-1') {
        this.rutas.navigateByUrl('/home/costeo')
        this.sectoresservices.ConsultaConductoresOferta('1', this.SessionOferta).subscribe(ResultConsult => {
          if (ResultConsult.length > 0) {
            for (var i = 0; i <= ResultConsult.length; i++) {
              if (ResultConsult[i].ESTADO == '3') {
                //Rechazado
                const BodyCorreoInd = {
                  IdPlantilla: 8,
                  usucodig: ResultConsult[i].USUCODIG_TRANS,
                  Cd_cnctvo: this.SessionOferta,
                  id_conductor: ResultConsult[i].ID_CNDCTOR
                }
                this.sectoresservices.EnviarCorreoIndividual('1', '0', ResultConsult[i].ID_SCTOR_OFRTA, BodyCorreoInd).subscribe(ResultCI => {
                  console.log(ResultCI)
                })
                this.sectoresservices.EnviarSms('6', ResultConsult[i].ID_CNDCTOR, this.SessionOferta, ResultConsult[i].ID_SCTOR_OFRTA, '0', '0', '0').subscribe(Resultado => {
                  console.log(Resultado)
                })
              }
              else if (ResultConsult[i].ESTADO == '1') {
                //Aprobado
                const BodyCorreoInd = {
                  IdPlantilla: 7,
                  usucodig: ResultConsult[i].USUCODIG_TRANS,
                  Cd_cnctvo: this.SessionOferta,

                }
                this.sectoresservices.EnviarCorreoIndividual('1', '0', ResultConsult[i].ID_SCTOR_OFRTA, BodyCorreoInd).subscribe(ResultCI => {
                  console.log(ResultCI)
                })
                this.sectoresservices.EnviarSms('5', ResultConsult[i].ID_CNDCTOR, this.SessionOferta, ResultConsult[i].ID_SCTOR_OFRTA, '0', '0', '0').subscribe(Resultado => {
                  console.log(Resultado)
                })
              }
            }
          }
        })
      }
    })
  }

  EnviarSms(bandera: string) {
    this.sectoresservices.EnviarSms(bandera, '0', this.SessionOferta, '0', '0', '0', '0').subscribe(Resultado => {
      console.log(Resultado)
    })
  }

  DetalleTransportista(transportista: any, templateDetalle: any) {
    this.sectoresservices.ConsultaDetalleCond('1', transportista.USUCODIG_TRANS, transportista.ID_CNDCTOR).subscribe(ResultCons => {
      console.log(ResultCons)
      this.DataConductor = ResultCons;
      if (ResultCons.length > 0) {
        this.modalService.open(templateDetalle, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      }
    })

  }

  //Vandera 1 hacepta transporte, 2 modifica valor transporte
  ApruebaTransportista(transportista: any, templateDetalle: any, bandera: string) {
    console.log(bandera)
    var BodyUpdate = {};
    var auxbandera: string = ""; //bandera 3 para actualizar transporte, 2 acepta transporte
    if(bandera == "1"){
      auxbandera = "2";
      BodyUpdate = {
        CD_CNSCTVO: this.SessionOferta,
        ID_SCTOR_OFRTA: transportista.ID_SCTOR_OFRTA,
        ID_CNDCTOR: transportista.ID_CNDCTOR,
        USUCODIG_TRANS: transportista.USUCODIG_TRANS,
        VLOR_FLTE_PCTDO: transportista.VLOR_FLTE_PCTDO,
        ESTADO: 1
      }
    }else{
      auxbandera = "3";
      BodyUpdate = {
        CD_CNSCTVO: this.SessionOferta,
        ID_SCTOR_OFRTA: transportista.ID_SCTOR_OFRTA,
        ID_CNDCTOR: transportista.ID_CNDCTOR,
        USUCODIG_TRANS: transportista.USUCODIG_TRANS,
        VLOR_FLTE_PCTDO: this.ValorFinalTrans,
        ESTADO: 1
      }
    }
    
    console.log(BodyUpdate)
    this.sectoresservices.OperacionConductor(auxbandera, BodyUpdate).subscribe(ResultadoUpdate => {
      this.modalService.dismissAll();
      const respuesta = ResultadoUpdate.split('|')
      this.Respuesta = respuesta[1];
      this.ConsultaCondOferta();
      this.modalService.open(templateDetalle, { ariaLabelledBy: 'modal-basic-title' })
    });
  }

  RechazarTransportista(transportista: any, templateDetalle: any) {
    var auxval: string = "";
    if (this.ValorFinalTrans == "") {
      auxval = transportista.VLOR_FLTE_PCTDO;
    } else {
      auxval = this.ValorFinalTrans;
    }
    const BodyUpdate = {
      CD_CNSCTVO: this.SessionOferta,
      ID_SCTOR_OFRTA: transportista.ID_SCTOR_OFRTA,
      ID_CNDCTOR: transportista.ID_CNDCTOR,
      USUCODIG_TRANS: transportista.USUCODIG_TRANS,
      VLOR_FLTE_PCTDO: auxval,
      ESTADO: 3
    }
    this.sectoresservices.OperacionConductor('2', BodyUpdate).subscribe(ResultadoUpdate => {
      const respuesta = ResultadoUpdate.split('|')
      this.Respuesta = respuesta[1];
      this.ConsultaCondOferta();
      this.modalService.open(templateDetalle, { ariaLabelledBy: 'modal-basic-title' })
    })
  }



  ContraOfer: any = [];
  ValorFinalTrans: string = "";
  ValorContraOferta(item: any, ModalValContraOfer: any) {
    this.ContraOfer = item;
    this.ValorFinalTrans = item.VLOR_FLTE_PCTDO;
    this.modalService.open(ModalValContraOfer, { ariaLabelledBy: 'modal-basic-title', size: "lg" })
  }
}
