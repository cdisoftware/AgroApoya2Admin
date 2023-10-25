import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-enviosmanychat',
  templateUrl: './enviosmanychat.component.html',
  styleUrls: ['./enviosmanychat.component.css']
})
export class EnviosmanychatComponent implements OnInit {

  ArrayConsectvo: any = [];
  IdCnsctvo: string = '';
  keywordConSec: string = 'CD_CNSCTVO';
  CdCnsctvo: any;

  DataSectores: any = [];
  IdSector: any = [];
  keywordSec: string = 'DSCRPCION_SCTOR';
  Sector: any;
  ConsecutivoSector: string = '';

  Respuesta: string = '';
  isDisabled: boolean = false;

  VerOcultarCampos: string = '1';
  IdPlantll: string = '';
  CondicionalExtra: string = '';
  QueryFinal: string = '';

  Loader = false;
  NunMensajesEnviados: number = 0;
  DataQuery: any[];
  IdManychatUser: string = '';

  IdCampo: string = '';
  arregloCampos: any;

  constructor(private ServiciosValorar: ValorarofertaService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.CargarConsecutivo();
    this.DataQuery = [];
    this.SelectCamposQuerys();
  }

  LimpiarTodo() {
    this.isDisabled = false;
    this.IdPlantll = '';
    this.CondicionalExtra = '';
    this.LimpiaConsecutvo('');
    this.LimpiaSector('');
  }

  CargarConsecutivo() {
    this.ServiciosValorar.ConsOferEst('1').subscribe(Resultado => {
      this.ArrayConsectvo = Resultado;

    })
  }

  selectConsecutvo(item: any) {
    this.IdCnsctvo = item.Id;
    this.ConsecutivoSector = item.CD_CNSCTVO;

    this.CargaSectores(this.ConsecutivoSector)
  }

  LimpiaConsecutvo(campo: string) {
    this.IdCnsctvo = '';
    this.CdCnsctvo = campo;
    this.VerOcultarCampos = '1';
    this.isDisabled = false;
    this.LimpiaSector('');
  }

  CargaSectores(consecutivo: string) {
    if (consecutivo != '0' || consecutivo != null || consecutivo != undefined) {
      this.isDisabled = true;
      this.ServiciosValorar.ConsultaSectoresOferta('1', consecutivo).subscribe(Resultado => {
        this.DataSectores = Resultado;
      })
    }
  }

  selectSector(item: any) {
    this.IdSector = item.ID_SCTOR_OFRTA;
  }

  LimpiaSector(campo: string) {
    this.IdSector = '';
    this.Sector = campo;
  }

  VerQuery(ModalRespuesta: any) {
    this.Respuesta = '';
    if (this.IdCnsctvo == null || this.IdCnsctvo == undefined || this.IdCnsctvo == '') {
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "Selecciona el consecutivo.";
    } else if (this.IdSector == null || this.IdSector == undefined || this.IdSector == '') {
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "Selecciona el sector.";
    } else {
      const Body = {
        id_sector: this.IdSector,
        Cd_cnsctivo: this.ConsecutivoSector,
        QueryAdicional: this.CondicionalExtra
      }
      this.ServiciosValorar.ConsultaQueryAdminMaychat('1', Body).subscribe(Resultado => {
        this.QueryFinal = Resultado;
      })
      this.VerOcultarCampos = '2';
    }
  }

  SelectCamposQuerys() {
    this.ServiciosValorar.SelectPreQuery('1').subscribe(Resultado => {
      this.arregloCampos = Resultado;
    })
  }

  Buscar(ModalRespuesta: any) {
    this.Respuesta = '';
    if (this.QueryFinal == null || this.QueryFinal == undefined || this.QueryFinal == '') {
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "Query vacio.";
    } else {
      const Body = {
        QueryPre: this.QueryFinal,
        ID_MANYCHAT: "0"
      }
      this.ServiciosValorar.ConsultaUsersAdminManychat('1', Body).subscribe(Resultado => {
        this.DataQuery = Resultado;
      })

      this.VerOcultarCampos = '3';
    }
  }

  enviarPrueba(ModalRespuesta: any) {
    this.DataQuery = [];
    this.Respuesta = '';
    if (this.IdManychatUser == null || this.IdManychatUser == undefined || this.IdManychatUser == '') {
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "Digita el IdManychat.";
    } else if (this.QueryFinal == null || this.QueryFinal == undefined || this.QueryFinal == '') {
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "Query vacio.";
    } else {
      const Body = {
        QueryPre: this.QueryFinal,
        ID_MANYCHAT: this.IdManychatUser
      }
      this.ServiciosValorar.ConsultaUsersAdminManychat('1', Body).subscribe(Resultado => {
        this.DataQuery = Resultado;
      })
    }
  }

  AuditoriaManychat() {
    var RespuAuditoria;
    const Body = {
      QueryPre: this.QueryFinal
    }
    this.ServiciosValorar.AuditoriAdminManychat('1', Body).subscribe(Resultado => {
      console.log(Resultado)
      RespuAuditoria = Resultado;
    })
  }

  EnviarFlujo() {

    this.AuditoriaManychat();
  }



}
