import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { LoginService } from 'src/app/core/login.service';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncryptionService } from '../login/encryption.service';

@Component({
  selector: 'app-olvidepassword',
  templateUrl: './olvidepassword.component.html',
  styleUrls: ['./olvidepassword.component.css']
})
export class OlvidepasswordComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private registroServicio: LoginService,
    private encryption: EncryptionService,
    private MetLogin: LoginComponent,
    private servicioslogin: LoginService) { }


  IsBusy: string = "";

  //Mensaje
  Mensaje: string = "";

  //Seccion uno
  Email: string = "";
  SeccionUno: boolean;


  //Seccion dos
  CodBd: string = "";
  Cod1: string = "";
  Cod2: string = "";
  Cod3: string = "";
  Cod4: string = "";
  SeccionDos: boolean;

  //Seccion tres
  SeccionTres: boolean;
  PasswordUno: string = "";
  PasswordDos: string = "";

  imagenOne: string;
  imagenTwo: string;

  EnabledPasswordTwo: boolean = true;
  MensajeModal: string;
  TituloModal: string;

  ngOnInit(): void {
    this.SeccionUno = true;
    this.IsBusy = "1";
    this.imagenOne = "../../../../assets/ImagenesAgroApoya2Adm/ver.png";
    this.imagenTwo = "../../../../assets/ImagenesAgroApoya2Adm/ver.png";

  }

  LimpiarMsj() {
    this.Mensaje = "";
  }
  GenerarCodigo(ModalGuardar: TemplateRef<any>) {
    var IsEmail = this.servicioslogin.EmailValido(this.Email);
    if (IsEmail == true) {
      if (this.Email != "") {
        const bodyPost = {
          "USUCODIG": 0,
          "CorreoPersona": this.Email
        }

        this.registroServicio.consLoginCliente("1", bodyPost).subscribe(Resultado => {
          //Id tipo p 1 es para cxamp, 2 para cliente final, 3 para trans
          if (Resultado == null || Resultado == undefined) {
            this.Mensaje = "Por favor ingresa tu correo con el cual te registraste.";
          } else if (Resultado.length == 0) {
            this.Mensaje = "Por favor ingresa tu correo con el cual te registraste.";
          } else {


            if (Resultado[0].idTipoPersona == '1') {
              this.MetLogin.cerrarPOpUpOlvidePassword();
              this.modalService.open(ModalGuardar, { centered: true });
              this.TituloModal = "AgroApoya2";
              this.MensajeModal = "??Campesino!, En el momento no tenemos habilitado esta opci??n para ti. Comun??cate al whatsapp 310 4286649 para m??s informaci??n.";
            }
            else if (Resultado[0].idTipoPersona == '3') {
              this.MetLogin.cerrarPOpUpOlvidePassword();
              this.modalService.open(ModalGuardar, { centered: true });
              this.TituloModal = "AgroApoya2";
              this.MensajeModal = "??Transportista!, ingresa por la app AgroTrans, dise??ada especialmente para ti, all?? podr??s realizar el proceso de recuperar contrase??a.";
            }
            else if (Resultado[0].idTipoPersona == '4') {
              this.MetLogin.cerrarPOpUpOlvidePassword();
              this.modalService.open(ModalGuardar, { centered: true });
              this.TituloModal = "AgroApoya2";
              this.MensajeModal = "Ingresa por el m??dulo administrativo, habilitado para ti.";
            }
            else if (Resultado[0].idTipoPersona == '2') {
              this.Mensaje = "Te estamos enviando el c??digo de verificaci??n a tu tel??fono y/o correo electr??nico.";
              this.IsBusy = "0";
              const GenCod = {
                email: this.Email,
                TipoUsu: "1"
              }
              this.registroServicio.send(GenCod).subscribe(respu => {
                if (respu == null || respu == undefined) {
                  this.Mensaje = "Por favor revisa tu conexi??n a internet.";
                  this.IsBusy = "1";
                } else if (respu[0].codigo == "Usuario no existe") {
                  this.Mensaje = "Verifica el correo ingresado (Si tienes problemas, comun??cate con soporte t??cnico).";
                  this.IsBusy = "1";
                } else {
                  this.IsBusy = "0";
                  this.CodBd = respu[0].codigo;
                  this.SeccionUno = false;
                  this.SeccionDos = true;
                  this.LimpiarMsj();
                }
              });
            }
          }
        })
      } else {
        this.Mensaje = "Por favor complete el correo electr??nico con el cual se registr??.";
      }
    } else {
      this.modalService.open(ModalGuardar, { centered: true });
      this.MensajeModal = 'Formato de correo electr??nico no es v??lido.';
      this.TituloModal = "AgroApoya2";
    }
  }


  ConfirmaCodigo() {
    if (this.Cod1 == "" || this.Cod2 == "" || this.Cod3 == "" || this.Cod4 == "") {
      this.Mensaje = "Por favor complete los campos con el c??digo enviado por sms y/o correo electr??nico.";
    } else {
      var auxcod = "" + this.Cod1 + this.Cod2 + this.Cod3 + this.Cod4;
      if (this.CodBd == auxcod) {
        this.SeccionDos = false;
        this.SeccionTres = true;
        this.Mensaje = "El n??mero de caracteres m??nimo para la contrase??a es de 8 d??gitos, cuando este sea igual o superado el segundo campo se desbloqueara.";
      } else {
        this.Mensaje = "Verifica que el c??digo enviado por sms y/o correo electr??nico sea el mismo.";
        this.Cod1 = "";
        this.Cod2 = "";
        this.Cod3 = "";
        this.Cod4 = "";
      }
    }
  }


  ConfirmaPassword() {
    if (this.PasswordDos.length > 1) {
      if (this.PasswordUno == this.PasswordDos && this.PasswordUno.length >= 8) {
        this.Mensaje = "Presiona el bot??n confirmar para realizar la actualizaci??n de la contrase??a";
      } else {
        this.Mensaje = "Las contrase??as no coinciden, verifica que sean iguales.";
      }
    } else {
      this.Mensaje = "";
    }
  }
  IsEnablesPsswordTow() {
    this.ConfirmaPassword();
    if (this.PasswordUno.length > 7) {
      this.EnabledPasswordTwo = false;
    } else {
      this.PasswordDos = "";
      this.EnabledPasswordTwo = true;
    }
  }

  ocultarPass() {
    let elemento: any = document.getElementById('EntryClaveOne');
    if (this.imagenOne == "../../../../assets/ImagenesAgroApoya2Adm/ver.png") {
      elemento.type = "text";
      this.imagenOne = "../../../../assets/ImagenesAgroApoya2Adm/novisible.png";
    } else {
      elemento.type = "password";
      this.imagenOne = "../../../../assets/ImagenesAgroApoya2Adm/ver.png";
    }
  }

  ocultarPassTwo() {
    let elemento: any = document.getElementById('EntryClaveTwo');
    if (this.imagenTwo == "../../../../assets/ImagenesAgroApoya2Adm/ver.png") {
      elemento.type = "text";
      this.imagenTwo = "../../../../assets/ImagenesAgroApoya2Adm/novisible.png";
    } else {
      elemento.type = "password";
      this.imagenTwo = "../../../../assets/ImagenesAgroApoya2Adm/ver.png";
    }
  }

  ActualizaToken(ModalGuardar: TemplateRef<any>) {
    var auxpass = this.encryption.encryptUsingTripleDES(this.PasswordDos, true);
    const update = {
      correoPersona: this.Email,
      TokePrsna: auxpass
    }
    this.servicioslogin.modtokenpersona("2", update).subscribe(respu => {
      this.Mensaje = respu;
      if (respu == "Se actualizo la contrase??a correctamente") {
        this.MetLogin.cerrarPOpUpOlvidePassword();
        this.modalService.open(ModalGuardar, { centered: true });
        this.TituloModal = "AgroApoya2";
        this.MensajeModal = "?? La actualizaci??n de tu contrase??a fue exitosa !";
      }
    });
  }


  Modal(ModalGuardar: TemplateRef<any>) {
    this.modalService.open(ModalGuardar, { centered: true });
    this.TituloModal = "AgroApoya2";
    this.MensajeModal = "La actualizaci??n de tu contrase??a fue exitosa ???";
  }

}
