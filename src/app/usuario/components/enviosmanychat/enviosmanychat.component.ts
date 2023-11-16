import { Component, OnInit, ViewChild } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicidadService } from 'src/app/core/publicidad.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-enviosmanychat',
  templateUrl: './enviosmanychat.component.html',
  styleUrls: ['./enviosmanychat.component.css']
})
export class EnviosmanychatComponent implements OnInit {
  @ViewChild('ModalRespuesta', { static: false }) ModalRespuesta: any;

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
  RespuePlantilla: string = '';

  constructor(private ServiciosValorar: ValorarofertaService,
    private modalService: NgbModal,
    private publicidadService: PublicidadService,) { }

  ngOnInit(): void {
    this.CargarConsecutivo();
    this.CargaSectores();
    this.DataQuery = [];
    this.SelectCamposQuerys();
  }

  LimpiarTodo() {
    this.CondicionalExtra = '';
    this.IdCampo = '';
    this.IdPlantll = '';
    this.IdManychatUser = '';
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
  }

  LimpiaConsecutvo(campo: string) {
    this.IdCnsctvo = '';
    this.CdCnsctvo = campo;
    this.VerOcultarCampos = '1';
    this.LimpiaSector('');
  }

  CargaSectores() {
    this.ServiciosValorar.ListaSectores('1', '0', '0').subscribe(Resultado => {
      this.DataSectores = Resultado;
    })

  }

  selectSector(item: any) {
    this.IdSector = item.ID;
  }

  LimpiaSector(campo: string) {
    this.IdSector = '';
    this.Sector = campo;
  }

  VerQuery() {
    if (this.IdSector == '' || this.IdSector == null) {
      this.IdSector = '0';
    }
    if (this.ConsecutivoSector == '' || this.ConsecutivoSector == null) {
      this.ConsecutivoSector = '0';
    }
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

  SelectCamposQuerys() {
    this.ServiciosValorar.SelectPreQuery('1').subscribe(Resultado => {
      this.arregloCampos = Resultado;
    })
  }

  Buscar() {
    this.Respuesta = '';
    if (this.QueryFinal == null || this.QueryFinal == undefined || this.QueryFinal == '') {
      this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.Respuesta = "Query vacio.";
    } else {
      const Body = {
        QueryPre: this.QueryFinal,
        ID_MANYCHAT: "0"
      }
      this.ServiciosValorar.ConsultaUsersAdminManychat('1', Body).subscribe(Resultado => {
        this.DataQuery = Resultado;
        this.IdManychatUser = '';
      })

      this.VerOcultarCampos = '3';
    }
  }

  enviarPrueba() {
    this.DataQuery = [];
    this.Respuesta = '';
    if (this.IdManychatUser == null || this.IdManychatUser == undefined || this.IdManychatUser == '') {
      this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.Respuesta = "Digita el IdManychat.";
    } else if (this.QueryFinal == null || this.QueryFinal == undefined || this.QueryFinal == '') {
      this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
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
      RespuAuditoria = Resultado;
    })
  }

  async EnvioManyChat() {
    if (this.IdPlantll == null || this.IdPlantll == undefined || this.IdPlantll == '') {
      this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.Respuesta = "IdPlantilla obligatorio.";
    } else {
      if (this.DataQuery.length > 0) {
        for (var i = 0; i < this.DataQuery.length; i++) {
          this.NunMensajesEnviados = i + 1;
          this.Loader = true;
          //Envio plantilla
          const result3 = await this.EnviaPlantilla(this.DataQuery[i].ID_MANYCHAT);
          // Espera 1 segundo después de cada bloque de 25 solicitudes
          if ((i + 1) % 25 === 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        this.AuditoriaManychat();
        this.IdPlantll = '';
        this.NunMensajesEnviados = 0;
        this.Loader = false;
        this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        this.Respuesta = "Mensajes enviados.";
      } else {
        this.Respuesta = "Sin resultados.";
        this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
    }
  }

  async EnviaPlantilla(IdMenyChat: string) {
    await new Promise((resolve, reject) => {
      const body = {
        subscriber_id: IdMenyChat,
        flow_ns: this.IdPlantll
      }
      this.publicidadService.CManyChatFlows(body).subscribe(async Respu => {
        console.log(Respu)
        this.RespuePlantilla = JSON.stringify(Respu);
        resolve(true);
        return true;
      });
    });
  }



}
