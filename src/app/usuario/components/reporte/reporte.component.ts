import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteService } from 'src/app/core/reporte.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { InteraccionMenyChat } from 'src/app/core/InteraccionMenyChat';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  @ViewChild('templaUsersCtualizados', { static: false }) templateUserAct: any;
  @ViewChild('templaMensaje', { static: false }) templaMensaje: any;

  constructor(
    private ReporteService: ReporteService,
    private modalService: NgbModal,
    public cookies: CookieService,
    public InteraccionMenyChat: InteraccionMenyChat
  ) { }

  mail: string = '';
  tipoUsuario: string = '0';
  nombre: string = '';
  codigo: string = '';
  FechaDesde: string = '';
  FechaDesdeB: string;
  FechaHasta: string = '';
  FechaHastaB: string;
  ArrayTipoUsuario: any = [];
  ArrayUsuarios: any = [];

  anho: string
  mes: string
  dia: string

  ascendenteTP: boolean = true;
  ascendenteN: boolean = true;
  ascendenteM: boolean = true;
  ascendenteF: boolean = true;
  ascendenteD: boolean = true;
  ascendenteC: boolean = true;

  mailM: string = '';
  tipoUsuarioM: string = '0';
  nombreM: string = '';
  codigoM: number;
  codigoB: number;
  FechaDesdeM: String;
  tipoDocumento: string = '';
  celular: string = '';
  dpto: string = '';
  observaciones: string = '';
  numDoc: string = '';
  direccion: string = '';
  ciudad: string = '';

  transportista: boolean = false;
  cliente: boolean = false;
  conductores: boolean = false;
  arrayT: any = [];
  arrayC: any = [];
  arrayConductores: any = [];

  razonS: string = '';
  NIT: string = '';
  descripcion: string = '';
  tipoC: string = '';
  coordenadas: string = '';

  Siguiente: boolean = true;

  //William
  ArrayUserManyChat: any = [];
  ArrayUsersActualizados: any = [];
  Loader = false;

  ngOnInit() {
    this.cargarListas();
  }

  cargarListas() {
    this.ReporteService.ConsultaUsuario('1').subscribe(Resultado => {
      this.ArrayTipoUsuario = Resultado;
    })

  }

  buscar() {
    var auxUsuCod = '0';
    if (this.codigo == '') {
      auxUsuCod = "0";
    } else {
      auxUsuCod = this.codigo;
    }
    if (this.mail == '') {
      this.mail = "0";
    }
    if (this.nombre == '') {
      this.nombre = "0";
    }
    if (this.FechaDesde == '') {
      this.FechaDesde = '0';
    }
    if (this.FechaHasta == '') {
      this.FechaHasta = '0';
    }
    const bodyPost = {
      IdTipoPersona: this.tipoUsuario,
      Usucodig: auxUsuCod,
      CorreoPersona: this.mail,
      NombrePersona: this.nombre
    }
    this.ReporteService.ReporteUsuarios("1", this.FechaDesde, this.FechaHasta, bodyPost).subscribe(Resultado => {
      if (Resultado.length > 0) {
        this.ArrayUsuarios = Resultado;
      } else {
        this.ArrayUsuarios = [];
      }
    })
    if (this.mail == '0') {
      this.mail = "";
    }
    if (this.nombre == '0') {
      this.nombre = "";
    }
    if (this.FechaDesde == "0") {
      this.FechaDesde = "";
    }
    if (this.FechaHasta == "0") {
      this.FechaHasta = "";
    }
  }

  AbrirModal(Usuario: any, templateMensaje: any) {
    this.nombreM = Usuario.NombrePersona + ' ' + Usuario.ApellidoPersona;
    this.tipoUsuarioM = Usuario.DesTipoPersona;
    this.codigoM = Usuario.Usucodig;
    this.mailM = Usuario.CorreoPersona;
    this.tipoDocumento = Usuario.DesTipoDocumento;
    this.numDoc = Usuario.NumeroDoc;
    this.celular = Usuario.NumeroCelular;
    this.direccion = Usuario.Direccion;
    this.dpto = Usuario.DesDepto;
    this.ciudad = Usuario.DesCiudad
    this.observaciones = Usuario.Observacion
    this.FechaDesdeM = Usuario.FechaCreacion
    this.FechaDesdeM = this.FechaDesdeM.slice(0, 10);

    if (Usuario.IdTipoPersona == 2) {
      this.ReporteService.ConsultaTipoCliente('1', this.codigoM.toString()).subscribe(Resultado => {
        this.arrayC = Resultado;
      })
      this.conductores = false
      this.transportista = false;
      this.cliente = true;
      this.razonS = this.arrayC[0].RAZON_SOCIAL;
      this.NIT = this.arrayC[0].NIT;
      this.coordenadas = this.arrayC[0].COORDENADAS_ENTR;
      this.descripcion = this.arrayC[0].DescTipoCliente;
      this.tipoC = this.arrayC[0].CD_TIPO_CLIENTE;
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    }
    else if (Usuario.IdTipoPersona == 3) {
      this.transportista = true;
      this.ReporteService.ConsultaTipoTranspor('1', this.codigoM.toString()).subscribe(Resultado => {
        this.arrayT = Resultado;
      })
      this.ReporteService.ConsultaTipoConductor('1', this.codigoM.toString()).subscribe(Resultado => {
        this.arrayConductores = Resultado;
      })

      this.coordenadas = this.arrayT[0].Coordenadas;
      if (this.arrayConductores.length != 0) {
        this.conductores = true;
      }
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    }
    else {
      this.transportista = false;
      this.cliente = false;
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    }


  }


  organizarTP() {
    if (this.ascendenteTP) {
      this.ArrayUsuarios.sort((a: {
        DesTipoPersona: string;
      }, b: {
        DesTipoPersona: string;
      }) =>
        a.DesTipoPersona.localeCompare(b.DesTipoPersona));
      this.ascendenteTP = false;
    }
    else {
      this.ArrayUsuarios.sort((a: {
        DesTipoPersona: string;
      }, b: {
        DesTipoPersona: string;
      }) =>
        b.DesTipoPersona.localeCompare(a.DesTipoPersona));
      this.ascendenteTP = true;
    }
  }

  organizarN() {
    if (this.ascendenteN) {
      this.ArrayUsuarios.sort((a: {
        NombrePersona: string;
      }, b: {
        NombrePersona: string;
      }) =>
        a.NombrePersona.localeCompare(b.NombrePersona));
      this.ascendenteN = false;
    }
    else {
      this.ArrayUsuarios.sort((a: {
        NombrePersona: string;
      }, b: {
        NombrePersona: string;
      }) =>
        b.NombrePersona.localeCompare(a.NombrePersona));
      this.ascendenteN = true;
    }
  }

  organizarM() {
    if (this.ascendenteM) {
      this.ArrayUsuarios.sort((a: {
        CorreoPersona: string;
      }, b: {
        CorreoPersona: string;
      }) =>
        a.CorreoPersona.localeCompare(b.CorreoPersona));
      this.ascendenteM = false;
    }
    else {
      this.ArrayUsuarios.sort((a: {
        CorreoPersona: string;
      }, b: {
        CorreoPersona: string;
      }) =>
        b.CorreoPersona.localeCompare(a.CorreoPersona));
      this.ascendenteM = true;
    }
  }

  organizarF() {
    if (this.ascendenteF) {
      this.ArrayUsuarios.sort((a: {
        FechaCreacion: string;
      }, b: {
        FechaCreacion: string;
      }) =>
        a.FechaCreacion.localeCompare(b.FechaCreacion));
      this.ascendenteF = false;
    }
    else {
      this.ArrayUsuarios.sort((a: {
        FechaCreacion: string;
      }, b: {
        FechaCreacion: string;
      }) =>
        b.FechaCreacion.localeCompare(a.FechaCreacion));
      this.ascendenteF = true;
    }
  }

  organizarD() {
    if (this.ascendenteD) {
      this.ArrayUsuarios.sort((a: {
        DesDepto: string;
      }, b: {
        DesDepto: string;
      }) =>
        a.DesDepto.localeCompare(b.DesDepto));
      this.ascendenteD = false;
    }
    else {
      this.ArrayUsuarios.sort((a: {
        DesDepto: string;
      }, b: {
        DesDepto: string;
      }) =>
        b.DesDepto.localeCompare(a.DesDepto));
      this.ascendenteD = true;
    }
  }

  organizarC() {
    if (this.ascendenteF) {
      this.ArrayUsuarios.sort((a: {
        DesCiudad: string;
      }, b: {
        DesCiudad: string;
      }) =>
        a.DesCiudad.localeCompare(b.DesCiudad));
      this.ascendenteF = false;
    }
    else {
      this.ArrayUsuarios.sort((a: {
        DesCiudad: string;
      }, b: {
        DesCiudad: string;
      }) =>
        b.DesCiudad.localeCompare(a.DesCiudad));
      this.ascendenteF = true;
    }
  }

  descargar() {
    this.ReporteService.decargarExcel(this.ArrayUsuarios);
  }

  limpiarDatos() {
    this.nombre = '';
    this.mail = '';
    this.FechaHasta = ''
    this.codigo = ""
    this.tipoUsuario = '0'
    this.FechaDesde = ''
    this.ArrayUsuarios = []
  }


  //William
  //#region UpdateMenyChat
  UpdateManyChatUsers() {
    try {
      this.ArrayUserManyChat = [];
      this.ArrayUsersActualizados = [];
      this.Loader = true;

      const bodyPost = {
        IdTipoPersona: '0',
        Usucodig: '0',
        CorreoPersona: '0',
        NombrePersona: '0'
      }
      this.ReporteService.ReporteUsuarios("1", '0', '0', bodyPost).subscribe(Resultado => {
        for (var i = 0; i < Resultado.length; i++) {
          if (Resultado[i].Id_ManyChat == null || Resultado[i].Id_ManyChat == undefined || Resultado[i].Id_ManyChat == "" || Resultado[i].Id_ManyChat == "null") {
            this.ArrayUserManyChat.push(Resultado[i]);
          }
        }
        this.ConsultaUserMenyChat();
      });
    } catch {

    }
  }
  async ConsultaUserMenyChat() {
    for (var i = 0; i < this.ArrayUserManyChat.length; i++) {
      if (this.ArrayUserManyChat[i].NumeroCelular.length == 10) {
        await new Promise((resolve, reject) => {
          const body = {
            field_id: 9572495,
            field_value: this.ArrayUserManyChat[i].Usucodig
          }
          this.InteraccionMenyChat.infoUserManyChat(body).subscribe(Resultado => {
            if (Resultado.data.length == 0) {
              if (this.ArrayUserManyChat[i] != undefined) {
                this.InsertUserInMenyChat(this.ArrayUserManyChat[i]);
              } else {
                resolve(false);
              }
            } else {
              this.UpdateIdManyChatUser(Resultado.data.id, this.ArrayUserManyChat[i]);
            }
            resolve(true);
          });
        });
      } else {
        this.UsersActualizadosManyChat(this.ArrayUserManyChat[i], false);
      }
    }
    //Finaliza el recorido abre el modal con los users actualizados
    if (this.ArrayUsersActualizados.length > 0) {
      this.modalService.open(this.templateUserAct, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
    } else {
      this.modalService.open(this.templaMensaje);
    }
    this.Loader = false;
  }


  async InsertUserInMenyChat(Item: any) {
    await new Promise((resolve, reject) => {
      const body = {
        first_name: Item.NombrePersona,
        last_name: Item.ApellidoPersona,
        whatsapp_phone: "57" + Item.NumeroCelular,
        has_opt_in_sms: true,
        has_opt_in_email: true,
        consent_phrase: "string"
      }
      this.InteraccionMenyChat.modmanychatcreateuser(body).subscribe(Resultado => {
        this.GuardaLogManyChat(Resultado, Item);
        var IdMenyChat: string = "";
        if (Resultado.status == "success" && Resultado.data.id != "") {
          IdMenyChat = Resultado.data.id;
          const bodyUsuCod = {
            subscriber_id: IdMenyChat,
            field_id: 9572495,
            field_value: Item.Usucodig
          }
          this.InteraccionMenyChat.AsignarUsucodigUserManyChat(bodyUsuCod).subscribe(Resultado => {
          });
          this.UpdateIdManyChatUser(IdMenyChat, Item);
        } else {
          this.UsersActualizadosManyChat(Item, false);
        }
        resolve(true);
      });
    });
  }
  //Actualiza el id de menychat en la bd
  async UpdateIdManyChatUser(IdMenyChat: string, item: any) {
    await new Promise((resolve, reject) => {
      const bodyUsuCod = {
        subscriber_id: IdMenyChat,
        field_id: 9572495,
        field_value: item.Usucodig
      }
      this.InteraccionMenyChat.AsignarUsucodigUserManyChat(bodyUsuCod).subscribe(Resultado => {
      });

      const body = {
        correo_persona: item.CorreoPersona.toLowerCase().replace(' ', ''),
        ID_MANYCHAT: IdMenyChat
      }
      this.InteraccionMenyChat.ActualizaIdManyChat('3', body).subscribe(Resultado => {
        var respu: string = Resultado.split("|");
        if (respu[0].trim() == "1") {
          this.UsersActualizadosManyChat(item, true);
        }
        resolve(true);
      });
    });
  }
  UsersActualizadosManyChat(item: any, Estado: boolean) {
    var AuxImg: string = "";
    if (Estado == true) {
      AuxImg = "../../../../assets/ImagenesAgroApoya2Adm/aprobar.png";
    } else {
      AuxImg = "../../../../assets/ImagenesAgroApoya2Adm/Cerrar.png";
    }

    const ite = {
      NombrePersona: item.NombrePersona,
      CorreoElectronico: item.CorreoPersona,
      NumTelefono: item.NumeroCelular,
      img: AuxImg
    }
    this.ArrayUsersActualizados.push(ite);
  }

  GuardaLogManyChat(Respuesta: string, item: any) {
    console.log(Respuesta)
    const body = {
      usucodig: item.Usucodig,
      celular: item.NumeroCelular,
      rta_manychat: Respuesta,
      origen: 2
    }
    this.InteraccionMenyChat.modLogsRegManychat('3', body).subscribe(Resultado => {
    });
  }
  //#endregion UpdateMenyChat
}
