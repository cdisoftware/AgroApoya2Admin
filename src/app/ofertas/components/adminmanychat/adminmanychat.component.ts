import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/reporte.service';
import { InteraccionMenyChat } from 'src/app/core/InteraccionMenyChat';
import { NgbModal, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { CrearofertaService } from 'src/app/core/crearoferta.service';

@Component({
  selector: 'app-adminmanychat',
  templateUrl: './adminmanychat.component.html',
  styleUrls: ['./adminmanychat.component.css']
})
export class AdminmanychatComponent implements OnInit {

  constructor(private service: ReporteService, private serviceintegracion: InteraccionMenyChat, private modalService: NgbModal, private MetGlobalesService: MetodosglobalesService, private creaofer: CrearofertaService) {
    this.ConsultaUsers('0', '0', '0');
    this.ListaTipoUsuario();
  }

  Respuesta: string = "";


  //#region VariablesConsultaUserManyChat
  Loader: boolean = false;
  ArrayUsers: any = [];
  NunMensajesEnviados: number = 0;

  //#region ListaUsuarios
  Usuario: string = "";
  IdManyChat: string = "";
  ValorEnvio: string = "";
  IdCampo: string = "";
  //#endregion ListaUsuarios

  //#region ListaTipoUsuario
  ArrayTipoUsuario: any = [];
  TipoUser: string = "";
  IdTipoUser: string = "0";
  //#endregion ListaTipoUsuario

  //#region UsuCodig
  UsuCodig: string = "";
  //#endregion UsuCodig

  //#region Email
  Email: string = "";
  //#endregion Email

  //#region Telefono
  Telefono: string = "";
  //#endregion Telefono

  //#endregion VariablesConsultaUserManyChat

  //#region VariablesCreaManyChat
  ArrayCreaUsersManyChat: any = [];
  //#endregion VariablesCreaManyChat

  ngOnInit(): void {
    //this.ConsultaUserManyChatNull();
    //this.ConsultaUser();
  }


  //#region MetodosConsultaUserManyChat
  ConsultaUsers(UsuCodig: string, email: string, telefono: string) {
    var auxusucodig: string = "0";
    var auxemail: string = "0";
    var auxcelular: string = "0";

    if (UsuCodig != "") {
      auxusucodig = UsuCodig;
    }
    if (email != "") {
      auxemail = email;
    }
    if (telefono != "") {
      auxcelular = telefono;
    }



    this.ArrayUsers = [];
    const body = {
      USUCODIG: auxusucodig,
      CORREO_PERSONA: auxemail,
      CELULAR_PERSONA: auxcelular,
      Parametro: '0'
    }
    console.log(body)
    this.service.ConsultaUsers('1', this.IdTipoUser, body).subscribe(Resultado => {
      this.ArrayUsers = Resultado;
    });
  }

  async AsignaCampoMayChat() {
    this.Loader = true;
    this.NunMensajesEnviados = 0;
    var auxNombre: string = "";
    var splitNombre: any;

    for (var i = 0; i < this.ArrayUsers.length; i++) {
      auxNombre = this.ArrayUsers[i].NOMBRES_PERSONA.trim();
      splitNombre = auxNombre.split(" ");

      await new Promise((resolve, reject) => {
        const body = {
          subscriber_id: this.ArrayUsers[i].id_manychat,
          field_id: 9808606,
          field_value: splitNombre[0]
        }
        console.log(body)
        this.serviceintegracion.AsignaCampoManyChat(body).subscribe(Resultado => {
          console.log(Resultado)
          this.NunMensajesEnviados++;
          resolve(true);
        });
      });
    }
    this.Loader = false;
  }

  //#region MtdListaTipoUsuario
  ListaTipoUsuario() {
    this.ArrayTipoUsuario = [{ Id: 1, Descripcion: "PRODUCTOR" }, { Id: 2, Descripcion: "CLIENTE" }, { Id: 3, Descripcion: "TRANSPORTADOR" }, { Id: 4, Descripcion: "ADMINISTRADOR" }];
  }
  selectTipoUser(item: any) {
    this.TipoUser = item.Descripcion;
    this.IdTipoUser = item.Id;

    this.ConsultaUsers(this.UsuCodig, this.Email, this.Telefono);
  }
  LimpiaTipoUser() {
    this.TipoUser = "";
    this.IdTipoUser = "0";
    this.ConsultaUsers('0', '0', '0');
  }
  //#endregion MtdListaTipoUsuario



  //#region ListaUsuarios
  selectUser(item: any) {
    this.Usuario = item.NOMBRES_PERSONA;
    this.IdManyChat = item.id_manychat;
  }
  LimpiaUser() {
    this.Usuario = "";
    this.IdManyChat = "";
  }
  //#endregion ListaUsuarios

  //#region EnvioPrueba
  async EnvioPrueba(ModalRespuesta: any) {
    if (this.IdManyChat != "" && this.ValorEnvio != "" && this.IdCampo != "") {
      this.Loader = true;

      await new Promise((resolve, reject) => {
        const body = {
          subscriber_id: this.IdManyChat,
          field_id: this.IdCampo,
          field_value: this.ValorEnvio
        }
        this.serviceintegracion.AsignaCampoManyChat(body).subscribe(Resultado => {
          this.Loader = false;
          this.LimpiaDataPrueba();
          resolve(true);
        });
      });
    } else {
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "Completa todos los datos para enviar los datos de prueba";
    }
  }

  LimpiaDataPrueba() {
    this.LimpiaUser();
    this.ValorEnvio = "";
    this.IdCampo = "";
  }
  //#endregion EnvioPrueba
  //#endregion MetodosConsultaUserManyChat




  //#region MetodosCreaManyChat
  //Consulta user en manychat
  ConsultaUserManyChatNull() {
    this.ArrayUsers = [];
    const body = {
      USUCODIG: '0',
      CORREO_PERSONA: '0',
      CELULAR_PERSONA: '0',
      Parametro: '1'
    }
    this.service.ConsultaUsers('1', this.IdTipoUser, body).subscribe(async Resultado => {
      await new Promise((resolve, reject) => {
        for (var i = 0; i < Resultado.length; i++) {
          this.ConsInfoUserManyChat(Resultado[i]);
          resolve(true);
        }
      });
    });
  }

  async ConsInfoUserManyChat(item: any) {
    await new Promise((resolve, reject) => {
      var IdAmbbiente = this.MetGlobalesService.ambientedetrabajo;
      if (IdAmbbiente == "1") {
        var ususcod: number = Number(item.USUCODIG);
        const body = {
          field_id: 9572495,
          field_value: ususcod
        }
        this.serviceintegracion.infoUserManyChat(body).subscribe(Resultado => {
          var auxrespu = Resultado.split(',');
          var IdMenyChat: string = "";
          if (auxrespu[0] != "Usuario NO existe") {
            if (Resultado.data.length == 0) {
              this.BuscaUserTelefono_Mtd(item);
              resolve(true);
            } else {
              IdMenyChat = Resultado.data[0].id;
              this.UpdateIdManyChatUser(IdMenyChat, item);
              resolve(true);
            }
          } else {
            this.BuscaUserTelefono_Mtd(item);
            resolve(true);
          }
        });
      }
    });
  }
  async BuscaUserTelefono_Mtd(item: any) {
    await new Promise((resolve, reject) => {
      const body = {
        email: "0",
        phone: item.CELULAR_PERSONA
      }
      this.serviceintegracion.BuscaUserCorreoTelefono(body).subscribe(Resultado => {
        var IdMenyChat: string = "";
        if (Resultado != "Usuario NO existe") {
          IdMenyChat = Resultado.data[0].id;
          this.UpdateIdManyChatUser(IdMenyChat, item);
          resolve(true);
        } else {
          this.CreaUserEnManyChat(item);
          resolve(true);
        }
      });
    });
  }



  //Si no existe
  async CreaUserEnManyChat(item: any) {
    await new Promise((resolve, reject) => {
      const body = {
        first_name: item.NOMBRES_PERSONA.trim(),
        last_name: "",
        whatsapp_phone: "57" + item.CELULAR_PERSONA.trim(),
        has_opt_in_sms: true,
        has_opt_in_email: true,
        consent_phrase: "string"
      }
      this.serviceintegracion.modmanychatcreateuser(body).subscribe(Resultado => {
        var IdMenyChat: string = "";
        if (Resultado != "Usuario ya existe") {

          this.GuardaLogManyChat("status:success", item);
          //this.UpdateInfoUserMenyChat(Resultado);

          IdMenyChat = Resultado;
          const bodyUsuCod = {
            subscriber_id: IdMenyChat,
            field_id: 9572495,
            field_value: item.USUCODIG
          }
          this.serviceintegracion.AsignarUsucodigUserManyChat(bodyUsuCod).subscribe(Resultado => {
            if (Resultado.status == "success") {
              this.UpdateIdManyChatUser(IdMenyChat, item);
              resolve(true);
            } else {
              resolve(true);
            }
          });
        } else {
          this.GuardaLogManyChat(Resultado, item);
          resolve(true);
        }
      });
    });
  }

  //Actualiza el id de menychat en la bd
  async UpdateIdManyChatUser(IdMenyChat: string, item: any) {
    await new Promise((resolve, reject) => {
      const bodyUsuCod = {
        subscriber_id: IdMenyChat,
        field_id: 9572495,
        field_value: item.USUCODIG
      }
      this.serviceintegracion.AsignarUsucodigUserManyChat(bodyUsuCod).subscribe(Resultado => {
        const body = {
          correo_persona: item.CELULAR_PERSONA.toLowerCase().replace(' ', ''),
          ID_MANYCHAT: IdMenyChat
        }
        this.serviceintegracion.ActualizaIdManyChat('3', body).subscribe(Resultado => {
          var respu: string = Resultado.split("|");
          resolve(true);
          if (respu[0].trim() == "1") {

          } else {

          }
        });
      });
    });
  }



  async GuardaLogManyChat(Respuesta: string, item: any) {
    await new Promise((resolve, reject) => {
      const body = {
        usucodig: item.USUCODIG,
        celular: item.CELULAR_PERSONA,
        rta_manychat: Respuesta,
        origen: 1
      }
      this.serviceintegracion.modLogsRegManychat('3', body).subscribe(Resultado => {
        resolve(true);
      });
    });
  }
  //#endregion MetodosCreaManyChat

  //#region AgregaEtiquetasManyChat
  ConsultaUser() {
    this.creaofer.ConsUserSectores('1').subscribe(async Resultado => {
      this.ArrayUsers = Resultado;
      this.Loader = true;
      this.NunMensajesEnviados = 0;
      await new Promise(async (resolve, reject) => {
        for (var i = 0; i < Resultado.length; i++) {
          if(Resultado[i].id_manychat != null && Resultado[i].id_manychat != undefined && Resultado[i].id_manychat.toString() != "00"){
            await this.AsignaEtiqueta(Resultado[i]);
          }
          resolve(true);
          this.NunMensajesEnviados ++;
        }
      });
    });
  }

  async AsignaEtiqueta(item: any) {
    await new Promise((resolve, reject) => {
      var IdEtiqueta = "";
      console.log(item.id_manychat)
      //#Usaquén
      if (item.IdSector == 354) {
        IdEtiqueta = "41461781";
      } else
        //#Suba
        if (item.IdSector == 355) {
          IdEtiqueta = "41461866";
        } else
          //#Engativa
          if (item.IdSector == 356) {
            IdEtiqueta = "41461853";
          } else
            //#Barrios Unidos
            if (item.IdSector == 357) {
              IdEtiqueta = "41461875";
            } else
              //#Teusaquillo
              if (item.IdSector == 358) {
                IdEtiqueta = "41461891";
              } else
                //#Fontibón
                if (item.IdSector == 359) {
                  IdEtiqueta = "41461840";
                } else
                  //#Chapinero
                  if (item.IdSector == 360) {
                    IdEtiqueta = "41461822";
                  } else
                    //#Kennedy
                    if (item.IdSector == 361) {
                      IdEtiqueta = "41461827";
                    } else
                      //#Candelaria
                      if (item.IdSector == 364) {
                        IdEtiqueta = "41461976";
                      } else
                        //#Martires
                        if (item.IdSector == 365) {
                          IdEtiqueta = "41461959";
                        } else
                          //#Puente Aranda
                          if (item.IdSector == 366) {
                            IdEtiqueta = "41461970";
                          } else
                            //#Antonio Nariño
                            if (item.IdSector == 367) {
                              IdEtiqueta = "41461965";
                            } else
                              //#Usme
                              if (item.IdSector == 368) {
                                IdEtiqueta = "41461938";
                              } else
                                //#Ciudad Bolivar
                                if (item.IdSector == 369) {
                                  IdEtiqueta = "41462024";
                                } else
                                  //#Rafael Uribe Uribe
                                  if (item.IdSector == 370) {
                                    IdEtiqueta = "41462011";
                                  } else
                                    //#Bosa
                                    if (item.IdSector == 371) {
                                      IdEtiqueta = "41461949";
                                    } else
                                      //#Tunjuelito
                                      if (item.IdSector == 372) {
                                        IdEtiqueta = "41461943";
                                      } else
                                        //#San Cristóbal
                                        if (item.IdSector == 373) {
                                          IdEtiqueta = "41461900";
                                        } else
                                          //#Santa Fé
                                          if (item.IdSector == 373) {
                                            IdEtiqueta = "41461896";
                                          } else {
                                            IdEtiqueta = "No se encuentra el id sector";
                                          }
      const body = {
        subscriber_id: item.id_manychat,
        tag_id: IdEtiqueta

      }
      var respu = "";
      try {
        this.serviceintegracion.AsignaEtiquetaUser(body).subscribe(async Resultado => {
          var split = Resultado.split("|");
          if (Number(split[0]) > 0) {
            respu = "Todo melo";
          } else {
            respu = "No fue posible";
          }
          resolve(true);
        }); 
      } catch (error) {
        resolve(true);
      }
    });
  }
  //#endregion AgregaEtiquetasManyChat
}