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
  IdAuditoria: string = '';

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
    this.IdPlantll = '';
    this.IdManychatUser == ''
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
        console.log(Resultado)
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
      QueryPre: this.QueryFinal,
      CodigoPlantilla: this.IdPlantll
    }
    this.ServiciosValorar.AuditoriAdminManychat('1', Body).subscribe(Resultado => {
      RespuAuditoria = Resultado;
      this.IdAuditoria = RespuAuditoria.split('|')[0].trim()
    })
  }

  AuditoriaManychatEnvios(USUCODIG: string, ID_MANYCHAT: string) {
    const Body = {
      IdManyChat: ID_MANYCHAT,
      Usucodig: USUCODIG,
      IdAuditoria: this.IdAuditoria,
      IdTipoEnvio: 1
    };
    console.log(Body)
    this.ServiciosValorar.AuditoriAdminManychatEnvios('1', Body).subscribe(Resultado => {
      //console.log('Resultado de la auditoría Envios: ' + Resultado);
    })
  }

  async EnvioManyChat() {
    if (this.IdPlantll == null || this.IdPlantll == undefined || this.IdPlantll == '') {
      this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.Respuesta = "IdPlantilla obligatorio.";
    } else {
      if (this.DataQuery.length > 0) {
        const batchSize = 25;
        this.AuditoriaManychat();
        for (let i = 0; i < this.DataQuery.length; i += batchSize) {
          const batch = this.DataQuery.slice(i, i + batchSize);
          this.Loader = true;

          // Envío de plantillas para el lote actual
          await Promise.all(batch.map(async (item) => {
            this.NunMensajesEnviados++;
            await this.EnviaPlantilla(item.ID_MANYCHAT);
            await this.AuditoriaManychatEnvios(item.USUCODIG, item.ID_MANYCHAT);
          }));

          // Espera de 1 segundo antes de enviar el siguiente lote
          await this.sleep(1000);
        }


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

  // Función para pausar la ejecución durante un período de tiempo
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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


  EnvioPrueba() {
    if (this.IdManychatUser == null || this.IdManychatUser == undefined || this.IdManychatUser == '') {
      this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.Respuesta = "Digita el IdManychat.";
    } else if (this.IdPlantll == null || this.IdPlantll == undefined || this.IdPlantll == '') {
      this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.Respuesta = "IdPlantilla obligatorio.";
    } else {
      const body = {
        subscriber_id: this.IdManychatUser,
        flow_ns: this.IdPlantll
      }
      this.publicidadService.CManyChatFlows(body).subscribe(async Respu => {
        console.log(Respu)
        if (Respu && Respu.status === "success") {
          this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.Respuesta = "Mensaje enviado.";
        } else {
          this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.Respuesta = "Mensaje NO enviado.";
        }
      });
    }
  }

  async AsignaEtiquetaManyChat() {
    
      for (var i = 0; i < this.DataQuery.length; i++) {
        await new Promise((resolve, reject) => {
          const body = {
            subscriber_id: this.DataQuery[i].ID_MANYCHAT.trim(),
            field_id: 9844106,
            field_value: "AA2"
          }
          console.log(body)
          this.publicidadService.AsignarCampoUserManyChat(body).subscribe(async Respu => {
            console.log(this.DataQuery[i].USUARIO + " " + Respu)
            resolve(true);
          });
        });
      }

  }
}
