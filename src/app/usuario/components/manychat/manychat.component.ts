import { Component, OnInit, ViewChild } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { PublicidadService } from 'src/app/core/publicidad.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manychat',
  templateUrl: './manychat.component.html',
  styleUrls: ['./manychat.component.css']
})
export class ManychatComponent implements OnInit {
  @ViewChild('ModalRespuestaImg', { static: false }) ModalRespuestaImg: any;

  constructor(private serviciosoferta: ValorarofertaService, private publicidadService: PublicidadService, private ModalService: NgbModal
  ) { }

  //variables grilla
  DataQuery: any[];
  newQueryMC: string = "";

  VerOcultarCampos: string = '';

  Respuesta: string = '';

  Loader = false;


  RespuDescripcion: string = "";;
  RespuePlantilla: string = "";
  IdProceso: string = "0";

  ngOnInit(): void {
    this.DataQuery = [];
    this.VerOcultarCampos = "1"
  }

  consultaToppingsOferta() {
    if (this.newQueryMC == "" || this.newQueryMC == undefined || this.newQueryMC == null) {
      this.Respuesta = "El campo NewQuery esta vacio.";
      this.ModalService.open(this.ModalRespuestaImg, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else {
      const Body = {
        MSJ_AGROAMIGO: this.newQueryMC
      }
      this.serviciosoferta.EjecutaQueryManyChat('1', Body).subscribe(Resultcons => {
        console.log(Resultcons)
        if (Resultcons.length > 0) {
          this.DataQuery = Resultcons;
          this.VerOcultarCampos = "2"
        }
        else {
          this.Respuesta = "El Query ejecutado no arrojó resultados, por favor verifica la sentencia ejecutada.";
          this.ModalService.open(this.ModalRespuestaImg, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.DataQuery = [];
        }
      })
    }
  }
  Limpiar() {
    this.newQueryMC = '';
    this.DataQuery = [];
    this.VerOcultarCampos = "1"
  }


  async EvioMennychat() {
    if (this.DataQuery.length > 0) {
      for (var i = 0; i < this.DataQuery.length; i++) {
        this.Loader = true;
        //Envio descripcion
        const result1 = await this.AsignaMsmWhatsap(this.DataQuery[i].MSJ_AGROAMIGO, this.DataQuery[i].ID_MANYCHAT);
        await new Promise(resolve => setTimeout(resolve, 5000));//Hace esperar 5 segundos para ejecutar el siguiente servicio

        //Envio plantilla
        const result3 = await this.EnviaPlantilla(this.DataQuery[i].ID_MANYCHAT);
        await new Promise(resolve => setTimeout(resolve, 5000));//Hace esperar 5 segundos para ejecutar el siguiente servicio

        /*if (this.IdProceso == "0") {
          //Registra Log En bdUno
          const result4 = await this.GuardaLogBDUno(this.DataQuery[i]);
          await new Promise(resolve => setTimeout(resolve, 5000));//Hace esperar 5 segundos para ejecutar el siguiente servicio
        } else {
          //Registra Log En bdDos
          const result4 = await this.GuardaLogBDDos(this.DataQuery[i]);
          await new Promise(resolve => setTimeout(resolve, 5000));//Hace esperar 5 segundos para ejecutar el siguiente servicio
        }*/
      }
      this.IdProceso = "0";
      this.Loader = false;
    } else {
      this.Respuesta = "El Query ejecutado no arrojó resultados, por favor verifica la sentencia ejecutada.";
      this.ModalService.open(this.ModalRespuestaImg, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }



  async AsignaMsmWhatsap(Descripcion: string, IdMenyChat: string) {
    await new Promise((resolve, reject) => {
      const body = {
        subscriber_id: IdMenyChat,
        field_id: 9712873,
        field_value: Descripcion
      }
      this.publicidadService.AsignarCampoUserManyChat(body).subscribe(async ResultadoDesc => {
        this.RespuDescripcion = JSON.stringify(ResultadoDesc);
        console.log(this.RespuDescripcion);
        resolve(true);
      });
    });
  }

  async EnviaPlantilla(IdMenyChat: string) {
    await new Promise((resolve, reject) => {
      const body = {
        subscriber_id: IdMenyChat,
        flow_ns: "content20230823141219_050777"
      }
      this.publicidadService.CManyChatFlows(body).subscribe(async Respu => {
        this.RespuePlantilla = JSON.stringify(Respu);
        console.log(this.RespuePlantilla)
        resolve(true);
        return true;
      });
    });
  }

  async GuardaLogBDUno(Item: any) {
    await new Promise((resolve, reject) => {
      const body = {
        "id_proceso": 0,
        "sql_proceso": this.newQueryMC,
        "usucodig": 7139,
        "usucodig_msj": Item.USUCODIG,
        "celular": Item.CELULAR,
        "id_manychat": Item.ID_MANYCHAT,
        "mensaje": Item.MSJ_AGROAMIGO
      }
      this.publicidadService.modProcesoEnvioManychat('3', body).subscribe(async Respu => {
        this.IdProceso = "" + Respu; 
        const bodyDos = {
          "id_proceso": this.IdProceso,
          "sql_proceso": this.newQueryMC,
          "usucodig": 7139,
          "usucodig_msj": Item.USUCODIG,
          "celular": Item.CELULAR,
          "id_manychat": Item.ID_MANYCHAT,
          "mensaje": Item.MSJ_AGROAMIGO
        }
        this.publicidadService.modProcesoEnvioManychat('3', bodyDos).subscribe(async Respu => {
          resolve(true);
          return true;
        });
      });
    });
  }

  async GuardaLogBDDos(Item: any) {
    await new Promise((resolve, reject) => {
      const bodyDos = {
        "id_proceso": this.IdProceso,
        "sql_proceso": this.newQueryMC,
        "usucodig": 7139,
        "usucodig_msj": Item.USUCODIG,
        "celular": Item.CELULAR,
        "id_manychat": Item.ID_MANYCHAT,
        "mensaje": Item.MSJ_AGROAMIGO
      }
      this.publicidadService.modProcesoEnvioManychat('3', bodyDos).subscribe(async Respu => {
        resolve(true);
        return true;
      });
    });
  }
}