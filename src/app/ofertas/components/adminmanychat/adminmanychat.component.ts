import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/reporte.service';
import { InteraccionMenyChat } from 'src/app/core/InteraccionMenyChat';
import { NgbModal, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adminmanychat',
  templateUrl: './adminmanychat.component.html',
  styleUrls: ['./adminmanychat.component.css']
})
export class AdminmanychatComponent implements OnInit {

  constructor(private service: ReporteService, private serviceintegracion: InteraccionMenyChat, private modalService: NgbModal) {
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


  ngOnInit(): void {
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
      CELULAR_PERSONA: auxcelular
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
}
